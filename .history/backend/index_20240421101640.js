import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
const app = express();
app.listen(8000, () => {
  console.log("Port listening " + 8000);
});
