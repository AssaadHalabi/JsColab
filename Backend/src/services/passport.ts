// import passport = require("passport");
// const JwtStrategy = require("passport-jwt").Strategy;
// import { ExtractJwt } from "passport-jwt";
// import LocalStrategy = require("passport-local");
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";

// const prisma = new PrismaClient();
// // setting local strategy:
// const localOptions = { usernameField: "email" };
// const localLogin = new LocalStrategy(
//   localOptions,
//   async (email, password, done) => {
//     try {
//       const user = await prisma.user.findFirst({
//         where: { Email: { equals: email } },
//       });
//       if (!user) {
//         return done(null, false);
//       }

//       const isMatch = await bcrypt.compare(password, user.Password);

//       if (!isMatch) {
//         return done(null, false);
//       }

//       return done(null, user);
//     } catch (error) {
//       return done(error);
//     }
//   }
// );

// // setting the jwt strategy
// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromHeader("authorization"),
//   secretOrKey: process.env.secret,
// };

// const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
//   prisma.user
//     .findFirst({ where: { id: { equals: payload.sub } } })
//     .then((user) => {
//       if (user) {
//         done(null, user);
//       } else {
//         done(null, false);
//       }
//     })
//     .catch((err) => done(err, false));
// });

// // tell passport to use defined strategies:
// passport.use(jwtLogin);
// passport.use(localLogin);
