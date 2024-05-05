import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import router from "./routers/index.js";
import connection from "./utils/Connection.js";
const app = express();
import path from 'path';
app.use(cors()); // chan cors khoi loi
app.use(cookieParser()); // tao cookie va gan cookie
app.use(express.json()); // Sử dụng middleware express.json() để phân tích dữ liệu JSON từ các yêu cầu HTTP

const __dirname = path.resolve();
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
// env
dotenv.config();
const URL = process.env.URL;
const PORT = process.env.PORT;

// connect db
connection(URL);

// routes : dinh tuyen router
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log("Server is running");
});
app.get("/",(req,rep) => {
  const data = __dirname;
  rep.render("index",{data})
})
// AUTHENTICATION : Dang Nhap so sanh user name va password is
// AUTHORI: Ban la ai co quyen lam gi , phan quyen
