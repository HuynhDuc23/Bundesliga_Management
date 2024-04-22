import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors()); // chan cors khoi loi
app.use(cookieParser()); // tao cookie va gan cookie
app.use(express.json()); // Sử dụng middleware express.json() để phân tích dữ liệu JSON từ các yêu cầu HTTP

// env
dotenv.config();
const URL = process.env.URL;
const PORT = process.env.PORT;

app.listen(8000, () => {
  console.log("Server is running");
});
