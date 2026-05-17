const express = require("express");
const cors = require("cors");

require("dotenv").config();

const todoRoutes = require("./routes/todoRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/todos", todoRoutes);

// Use port 5000 for backend
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
