import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import router from "./router";

const app = express();


app.use(morgan("combined"));
app.use(cors());

app.enable("trust proxy");
app.use(bodyParser.json({ type: "*/*" }));

router(app);

app.listen(4000, () => {
  console.log(`Server started on port  + ${4000}`);
});
