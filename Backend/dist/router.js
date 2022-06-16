"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Authentication = require("./controllers/authentication");
const passport = require("passport");
const uuid_1 = require("uuid");
const status_code_enum_1 = require("status-code-enum");
const prisma_1 = tslib_1.__importDefault(require("./lib/prisma"));
const requireAuth = passport.authenticate("jwt", {
    session: false,
});
const requireSignIn = passport.authenticate("local", {
    session: false,
});
function default_1(app) {
    app.get("/api/", function (req, res) {
        return res.send("Express Server with JWT Authentication");
    });
    app.get("/api/validate", requireAuth, function (req, res) {
        return res.send({
            user: req.user.email,
        });
    });
    app.post("/api/login", requireSignIn, Authentication.signin);
    app.post("/api/register", Authentication.signup);
    app.post("/api/createNotebook", async (request, response) => {
        let notebook = request.body;
        try {
            console.log(request.body);
        }
        catch (error) {
        }
        let created;
        try {
            const user = await prisma_1.default.user.findFirst({
                where: { Email: notebook.owner_email },
            });
            let payload = {
                ...notebook,
                cells: notebook.cells,
                id: (0, uuid_1.v4)(),
                created: new Date(),
            };
            created = await prisma_1.default.notebook.create({
                data: {
                    ...payload,
                    User: { connect: { id: user.id } },
                },
            });
        }
        catch (error) {
            console.log(error.message);
            return response.status(500);
        }
        return response.json(created);
    });
    app.post("/api/updateNotebook", async (request, response) => {
        let notebook = request.body;
        let updated;
        try {
            const user = await prisma_1.default.user.findFirst({
                where: { Email: notebook.owner_email },
            });
            updated = await prisma_1.default.notebook.update({
                where: {
                    id: notebook.id,
                },
                data: {
                    cells: notebook.cells,
                },
            });
        }
        catch (error) {
            console.log(error.message);
            return response.status(500);
        }
        return response.json(updated);
    });
    app.delete("/api/deleteNotebook", async (request, response) => {
        let { notebook, user_email } = JSON.parse(request.body);
        let deleted;
        if (!user_email === notebook.owner_email) {
            return response.status(401);
        }
        try {
            deleted = await prisma_1.default.notebook.delete({
                where: {
                    id: notebook.id,
                }
            });
        }
        catch (error) {
            console.log(error.message);
            return response.status(500);
        }
        return response.json(deleted ? true : false);
    });
    app.get("/api/notebooks", async (request, response) => {
        const { user_email } = request.query;
        if (!user_email) {
            return response.status(status_code_enum_1.StatusCode.ClientErrorBadRequest);
        }
        let notebooks;
        try {
            notebooks = await prisma_1.default.notebook.findMany({ where: {
                    owner_email: user_email
                } });
        }
        catch (error) {
            console.log(error.message);
            return response.status(500);
        }
        console.log(notebooks);
        return response.json(notebooks);
    });
    app.get("/api/notebook", async (request, response) => {
        const { id } = request.query;
        if (!id) {
            return response.status(status_code_enum_1.StatusCode.ClientErrorBadRequest);
        }
        let notebook;
        try {
            notebook = await prisma_1.default.notebook.findFirst({ where: {
                    id
                } });
        }
        catch (error) {
            console.log(error.message);
            return response.status(500);
        }
        console.log(notebook);
        return response.json(notebook);
    });
}
exports.default = default_1;
//# sourceMappingURL=router.js.map