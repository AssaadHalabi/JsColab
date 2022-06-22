"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const jwt_simple_1 = require("jwt-simple");
const status_code_enum_1 = tslib_1.__importDefault(require("status-code-enum"));
const prisma = new client_1.PrismaClient();
const findUser = async (email) => {
    const user = await prisma.user.findFirst({
        where: { Email: { equals: email } },
    });
    return user;
};
function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return (0, jwt_simple_1.encode)({ sub: user.id, iat: timestamp }, process.env.secret || "");
}
exports.signin = function (req, res) {
    res.send({ token: tokenForUser(req.user) });
};
exports.signup = async (req, res, next) => {
    const { email } = req.body;
    console.log(email);
    if (!email) {
        return res
            .status(422)
            .send({ error: "Email must be provided" });
    }
    try {
        let user = await findUser(email);
        if (user) {
            return res.status(status_code_enum_1.default.SuccessNoContent).send({ message: "Email is already in use..." });
        }
        user = await prisma.user.create({
            data: {
                Email: email,
            },
        });
        console.log(user);
        res.status(200);
    }
    catch (error) {
        return next(error);
    }
};
//# sourceMappingURL=authentication.js.map