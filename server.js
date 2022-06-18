import mongoose from "mongoose";
import express from "express";
import clientRouter from "./routes/clientRoutes.js";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/sgs")
  .then(() => {
    console.log("connected to db success");
  })
  .catch((err) => {
    console.log(err.message);
  });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./build")));

app.use("/api/client", clientRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("../front/build"));
// }

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
