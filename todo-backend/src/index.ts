import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import routes from "../src/routes/ToDoRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error(err));

  app.get("/", (req, res) => {
    res.send("<h1>Hello, Server Started</h1>");
  });

app.use("/api", routes);

app.listen(PORT, () => console.log("server started at "+`http://localhost:${PORT}`));
