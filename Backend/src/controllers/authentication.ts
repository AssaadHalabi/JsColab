import { PrismaClient } from "@prisma/client";
import { encode } from "jwt-simple";

import { Request, Response } from "express";
import StatusCode from "status-code-enum";

const prisma = new PrismaClient();

const findUser = async (email) => {
  const user = await prisma.user.findFirst({
    where: { Email: { equals: email } },
  });
  return user;
};

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return encode({ sub: user.id, iat: timestamp }, process.env.secret || "");
}

exports.signin = function (req, res) {
  res.send({ token: tokenForUser(req.user) });
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
