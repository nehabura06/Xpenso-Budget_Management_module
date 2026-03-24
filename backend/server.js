require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// ✅ Connect to MongoDB and Start Server
const startServer = async () => {
  try {
    await connectDB(); // Ensure MongoDB connects before starting server
    // await Budget.syncIndexes(); // ✅ Sync indexes here

    const PORT = process.env.PORT || 5000;

    // ✅ Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/budget", budgetRoutes);

    // ✅ Start Server
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
