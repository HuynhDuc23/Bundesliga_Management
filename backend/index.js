import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import router from "./routers/index.js";
import connection from "./utils/Connection.js";
import path from 'path'
const __dirname = path.resolve();
const app = express();
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')));
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
app.get("/",(req,rep) => {
  const data = __dirname;
  rep.render("index",{data})
})
app.listen(5050, () => {
  console.log("Server is running");
});

// AUTHENTICATION : Dang Nhap so sanh user name va password is
// AUTHORI: Ban la ai co quyen lam gi , phan quyen
