const { Schema, model } = require("mongoose");

const auditSchema = new Schema(
  {
    userSchema: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    businessName: String,
    businessPlan: String,
    meansOfIdentification: String,
    photo: String,
    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Audit", auditSchema);
