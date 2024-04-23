import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import router from "./routers/index.js";
import teamRoute from "./routers/team.router"
import connection from "./utils/Connection.js";
const app = express();

app.use(cors()); // chan cors khoi loi
app.use(cookieParser()); // tao cookie va gan cookie
app.use(express.json()); // Sử dụng middleware express.json() để phân tích dữ liệu JSON từ các yêu cầu HTTP
// env
// dotenv.config();
// const URL = process.env.URL;
// const PORT = process.env.PORT;

// connect db
connection("mongodb://localhost:27017/node_football",{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// routes : dinh tuyen router
app.use("/api/v1", router);
app.use("/",teamRoute);
app.get("/",(req,rep) => {
  rep.send("Hello world")
})
app.listen(5050, () => {
  console.log("Server is running");
});

// AUTHENTICATION : Dang Nhap so sanh user name va password is
// AUTHORI: Ban la ai co quyen lam gi , phan quyen
