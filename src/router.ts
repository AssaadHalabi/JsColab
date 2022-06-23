const Authentication = require("./controllers/authentication");
import { Request, Response } from "express";
import passport = require("passport");
import path = require("path");
// require("./services/passport");
import { StatusCode } from "status-code-enum";
import { v4 } from "uuid";
import prisma from "./lib/prisma";
import { Notebook } from "./notebook";

export default function (app): void {
  // Hello endpoint
  app.get("/api/", function (req, res) {
    return res.send("Express Server with JWT Authentication");
  });

  // Register user
  app.post("/api/register", Authentication.signup);
  app.post(
    "/api/createNotebook",
    async (request: Request, response: Response) => {
      let notebook: Notebook = request.body;
      try {
        console.log(request.body);
      } catch (error) {}
      let created;
      try {
        const user = await prisma.user.findFirst({
          where: { Email: notebook.owner_email },
        });
        console.log(`user`);
        console.log(user);

        let payload = {
          ...notebook,
          cells: notebook.cells,
          id: v4(),
          created: new Date(),
        };
        created = await prisma.notebook.create({
          data: {
            ...payload,
            User: { connect: { id: user.id } },
          },
        });
      } catch (error) {
        console.log(error.message);
        return response.status(500);
      }
      return response.json(created);
    }
  );
  app.post(
    "/api/updateNotebook",
    async (request: Request, response: Response) => {
      let { notebook, user_email }: { notebook: Notebook; user_email: string } =
        request.body;
      let updated;
      if (user_email !== notebook.owner_email) {
        return response.status(StatusCode.ClientErrorUnauthorized);
      }
      try {
        const user = await prisma.user.findFirst({
          where: { Email: notebook.owner_email },
        });

        updated = await prisma.notebook.update({
          where: {
            id: notebook.id,
          },
          data: {
            cells: notebook.cells,
          },
        });
      } catch (error) {
        console.log(error.message);
        return response.status(500);
      }
      return response.json(updated);
    }
  );
  app.delete(
    "/api/deleteNotebook",
    async (request: Request, response: Response) => {
      let { notebook, user_email } = request.body;
      let deleted;
      if (!user_email === notebook.owner_email) {
        return response.status(401);
      }
      try {
        deleted = await prisma.notebook.delete({
          where: {
            id: notebook.id,
          },
        });
      } catch (error) {
        console.log(error.message);
        return response.status(500);
      }
      return response.json(deleted ? true : false);
    }
  );
  app.get("/api/notebooks", async (request: Request, response: Response) => {
    const { user_email } = request.query;

    if (!user_email) {
      return response.status(StatusCode.ClientErrorBadRequest);
    }
    let notebooks;
    try {
      notebooks = await prisma.notebook.findMany({
        where: {
          owner_email: user_email as string,
        },
      });
    } catch (error) {
      console.log(error.message);
      return response.status(500);
    }
    console.log(notebooks);

    return response.json(notebooks);
  });
  app.get("/api/notebook", async (request: Request, response: Response) => {
    const { id } = request.query;

    if (!id) {
      return response.status(StatusCode.ClientErrorBadRequest);
    }
    let notebook;
    try {
      notebook = await prisma.notebook.findFirst({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error.message);
      return response.status(500);
    }
    console.log(notebook);

    return response.json(notebook);
  });
  app.get(
    "/api/getFeaturedNotebooks",
    async (request: Request, response: Response) => {
      const owner_email = "asaadalhalabi@gmail.com";
      let notebooks;
      try {
        notebooks = await prisma.notebook.findMany({
          where: {
            owner_email,
          },
        });
      } catch (error) {
        console.log(error.message);
        return response.status(500);
      }

      return response.json(notebooks);
    }
  );

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build/index.html"));
  });
}
