const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db.config");
const authRouter = require("./router/auth.routes");
const authorRouter = require("./router/author.routes");
const bookRouter = require("./router/book.routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use("/uploads", express.static("uploads"));

connectDB();

app.use("/api", authRouter);
app.use("/api", authorRouter);
app.use("/api", bookRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`🚀 Server ishga tushdi: http://localhost:${PORT}`);
});
