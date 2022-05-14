const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql");
//import { encrypt } from "./EncryptionHandler.js";
const { encrypt } = require("./EncryptionHandler");
const { decrypt } = require("./EncryptionHandler");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

dotenv.config();
connectDB();

app.use(express.json());

const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

//const PORT = 8000;

app.use(cors());
app.use(express.json());

//express api(get request to '/' route)
app.get("/", (req, res) => {
  // callback takes request and response
  res.send("API is running"); // sending response
});

app.use("/api/user", userRoutes);
//app.use("/api/password", passwordRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server running");
});
