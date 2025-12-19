import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.router.js";
import productRouter from "./routes/product.router.js";
import uploadRouter from "./routes/upload.routes.js";
import morgan from "morgan";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://producter-dashboard-client.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (!allowedOrigins.includes(origin)) {
      return callback(new Error("CORS not allowed"), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.options("*", cors());

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/file", uploadRouter);

/* ✅ VERCEL FIX */
connectDB();
export default app;
