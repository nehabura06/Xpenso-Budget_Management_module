const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to User
    category: {
      type: String,
      required: true,
    },
    budgetAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
BudgetSchema.index({ userId: 1, category: 1 }, { unique: true });

module.exports = mongoose.model("Budget", BudgetSchema);
