require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDb = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/Upload");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// DB connect
connectDb();

// ---------------- API Routes ----------------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/image", uploadRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);


app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
