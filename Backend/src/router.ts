const Authentication = require("./controllers/authentication");
import { Request, Response } from "express";
import path = require("path");
import { StatusCode } from "status-code-enum";
import { v4 } from "uuid";
import prisma from "./lib/prisma";
import { Notebook } from "./notebook";

export default function (app): void {
  // Hello endpoint
  app.get("/api/", (req, res) => res.send("Express Server with JWT Authentication"));

  // Register user
  app.post("/api/register", Authentication.signup);
  app.get("/api/users", Authentication.getUser);

  app.post("/api/createNotebook", async (request: Request, response: Response) => {
    let notebook: Notebook = request.body;
    let created;

    try {
      const user = await prisma.user.findFirst({
        where: { Email: notebook.owner_email },
      });

      let payload = {
        ...notebook,
        cells: notebook.cells,
        id: v4(),
        created: new Date(),
      };

      created = await prisma.notebook.create({
        data: {
          ...payload,
          User: { connect: { id: user?.id } },
        },
      });

      return response.json(created);
    } catch (error) {
      console.error(error.message);
      return response.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  });

  app.post("/api/updateNotebook", async (request: Request, response: Response) => {
    let { notebook, user_email }: { notebook: Notebook; user_email: string } = request.body;
    
    if (user_email !== notebook.owner_email) {
      return response.status(StatusCode.ClientErrorUnauthorized).json({ error: "Unauthorized" });
    }

    try {
      await prisma.user.findFirst({
        where: { Email: notebook.owner_email },
      });

      const updated = await prisma.notebook.update({
        where: { id: notebook.id },
        data: { cells: notebook.cells },
      });

      return response.json(updated);
    } catch (error) {
      console.error(error.message);
      return response.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  });

  app.delete("/api/deleteNotebook", async (request: Request, response: Response) => {
    let { notebook, user_email } = request.body;

    if (user_email !== notebook.owner_email) {
      return response.status(401).json({ error: "Unauthorized" });
    }

    try {
      await prisma.notebook.delete({
        where: { id: notebook.id },
      });

      return response.json(true);
    } catch (error) {
      console.error(error.message);
      return response.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  });

  app.get("/api/notebooks", async (request: Request, response: Response) => {
    const { user_email } = request.query;

    if (!user_email) {
      return response.status(StatusCode.ClientErrorBadRequest).json({ error: "Missing user_email" });
    }

    try {
      const notebooks = await prisma.notebook.findMany({
        where: { owner_email: user_email as string },
      });

      return response.json(notebooks);
    } catch (error) {
      console.error(error.message);
      return response.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  });

  app.get("/api/notebook", async (request: Request, response: Response) => {
    const { id } = request.query;

    if (!id) {
      return response.status(StatusCode.ClientErrorBadRequest).json({ error: "Missing notebook ID" });
    }

    try {
      const notebook = await prisma.notebook.findFirst({
        where: { id: id as string },
      });

      return response.json(notebook);
    } catch (error) {
      console.error(error.message);
      return response.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  });

  app.get("/api/getFeaturedNotebooks", async (request: Request, response: Response) => {
    const owner_email = "asaadalhalabi@gmail.com";

    try {
      const notebooks = await prisma.notebook.findMany({
        where: { owner_email },
      });

      return response.json(notebooks);
    } catch (error) {
      console.error(error.message);
      return response.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build/index.html"));
  });

  // Graceful Prisma shutdown on app exit
  process.on("SIGINT", async () => {
    console.log("Closing Prisma connection...");
    await prisma.$disconnect();
    process.exit(0);
  });
}
