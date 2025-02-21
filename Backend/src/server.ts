import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import router from "./router";
import path from "path";
import serverless from "serverless-http";

const app = express();


app.use(cors({ origin: '*' }));
app.use(morgan("combined"));

app.enable("trust proxy");
app.use(bodyParser.json({ type: "*/*" }));

// app.use(express.static(path.join(__dirname, 'build')));
router(app);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server started on port  + ${process.env.PORT || 4000}`);
  
});
export const handler = serverless(app);
