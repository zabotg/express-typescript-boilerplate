import express from "express";
import router from "./router";
import config from "./config";

const app = express();

app.use(express.json()); //Used to parse JSON bodies
app.use("/", express.static("public"));
app.use("/api", router);

app.listen(config.api.port, () => {
    console.log(`Example app listening at http://localhost:${config.api.port}`);
});
