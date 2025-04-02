import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import StatusCode from "status-code-enum";

const prisma = new PrismaClient({ log: ["query"] });

const findUser = async (email: string) => {
  return await prisma.user.findFirst({
    where: { Email: { equals: email } },
  });
};

const timeout = (ms: number) =>
  new Promise((_, reject) => setTimeout(() => reject(new Error("Query timed out")), ms));

exports.signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  console.log(email);

  if (!email) {
    return res.status(422).send({ error: "Email must be provided" });
  }

  try {
    let user = await Promise.race([
      findUser(email),
      timeout(3000), // ⏳ 3-second timeout
    ]);

    if (user) {
      return res
        .status(StatusCode.SuccessNoContent)
        .send({ message: "Email is already in use..." });
    }

    user = await Promise.race([
      prisma.user.create({
        data: { Email: email },
      }),
      timeout(6000), // ⏳ 6-second timeout
    ]);

    console.log(user);
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  } finally {
    await prisma.$disconnect(); // ✅ Close connection after request
  }
};


exports.getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.query;

  if (!email) {
    return res.status(422).json({ error: "Email must be provided" });
  }

  try {
    const user = await findUser(email as string);
    if (user) {
      return res.status(200).json({ exists: true, message: "User exists" });
    } else {
      return res.status(200).json({ exists: false, message: "User does not exist" });
    }
  } catch (error) {
    next(error);
  } finally {
    await prisma.$disconnect(); // ✅ Close connection after request
  }
};

// Graceful Prisma shutdown on app exit
process.on("SIGINT", async () => {
  console.log("Closing Prisma connection...");
  await prisma.$disconnect();
  process.exit(0);
});
