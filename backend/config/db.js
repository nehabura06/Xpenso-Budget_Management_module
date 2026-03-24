const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

  } catch (err) {
    console.error(`❌ MongoDB Connection Failed: ${err.message}`);
    process.exit(1); // Exit process on failure
  }
};

// Handle database events outside the function
mongoose.connection.on("error", (err) => {
  console.error(`❌ MongoDB Error: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB Disconnected! Reconnecting...");
  connectDB(); // Auto-reconnect
});

module.exports = connectDB;

