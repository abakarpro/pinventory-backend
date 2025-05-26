const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute.js");
const productRoute = require("./routes/productRoute.js");
const contactRoute = require("./routes/contactRoute.js");
const errorHandler = require("./middleware/errorMiddleware.js");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectToDatabase = require("./db/db.js");

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ou configuration plus spécifique
app.use(cors({
  origin: ["http://localhost:3000", "https://pinventory-beige.vercel.app"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,  // Allow credentials (cookies, authorization headers, etc.)
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve static files from the "uploads" and "Images" directories
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/Images", express.static(path.join(__dirname, "Images")));

//Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);
const PORT = process.env.PORT || 10000;

//Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Middleware
app.use(errorHandler);

//Connect to DB and start
connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
