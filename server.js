import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.router.js"
import productRouter from "./routes/product.router.js";
import uploadRouter from "./routes/upload.routes.js";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,   // http://localhost:5173
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

const PORT = process.env.PORT || 5000;


// User Routes

app.use('/api/user', userRouter);
app.use('/api/product',productRouter);
app.use('/api/file',uploadRouter)

const startServer = async () => {
  try {
    await connectDB(); // ✅ function call

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(" Server start error:", error.message);
  }
};

startServer();
