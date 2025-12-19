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

const allowedOrigins = [
  "http://localhost:5173",
  "https://producter-dashboard-client-ymgd.vercel.app"
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // Postman etc.
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'CORS policy: This origin is not allowed';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
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
