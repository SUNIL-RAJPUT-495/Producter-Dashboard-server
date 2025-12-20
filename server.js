import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import connectDB from "./config/db.js";
import userRouter from "./routes/user.router.js";
import productRouter from "./routes/product.router.js";
import uploadRouter from "./routes/upload.routes.js";

dotenv.config();

const app = express();

/* CORS */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://producter-dashboard-client.vercel.app"
  ],
  credentials: true
}));

// app.options("*", cors()); // ❌ REMOVE THIS

app.use(express.json());
app.use(morgan("dev"));

/* Routes */
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/file", uploadRouter);

/* Local server */
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
