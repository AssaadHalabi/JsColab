import { PrismaClient } from "@prisma/client";

import { NextFunction, Request, Response } from "express";
import StatusCode from "status-code-enum";

const prisma = new PrismaClient({ log: ["query"] });

const findUser = async (email) => {
  const user = await prisma.user.findFirst({
    where: { Email: { equals: email } },
  });
  return user;
};


exports.signup = async (req:Request, res:Response, next) => {
  const {email} = req.body;
  console.log(email);
  
  if (!email) {
    return res
      .status(422)
      .send({ error: "Email must be provided" });
  }

  try {
    let user = await findUser(email);
    if (user) {
      return res.status(StatusCode.SuccessNoContent).send({ message: "Email is already in use..." });
    }

    user = await prisma.user.create({
      data: {
        Email: email,
      },
    });
    console.log(user);
    
    res.status(200);
  } catch (error) {
    return next(error);
  }
};

exports.getUser = async (request: Request, response: Response, next: NextFunction) =>{
  const { email } = request.query;

if (!email) {
  return response.status(422).json({ error: "Email must be provided" });
}

try {
  const user = await findUser(email);
  if (user) {
    // User found, return exists true
    return response.status(200).json({ exists: true, message: "User exists" });
  } else {
    // No user found, return exists false
    return response.status(200).json({ exists: false, message: "User does not exist" });
  }
} catch (error) {
  return next(error);
}
}
