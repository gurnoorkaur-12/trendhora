const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors());  // Apply CORS middleware globally

// Routes
app.use('/api/items', require("./routes/items"));
app.use('/api/payment', require("./routes/payment"));

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
