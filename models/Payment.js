const { Schema, model } = require("mongoose");
const paymentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["successful", "failed", "pending"],
    },
    reference: String,
  },
  { timestamps: true }
);

module.exports = model("Payment", paymentSchema);
