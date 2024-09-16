import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    product: [
      {
        type: mongoose.ObjectId,
        ref: "Product",
      },
    ],

    payment: {},

    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      default: "not processing",
      enum: ["not processing", "processing", "shipping", "deliverd", "cancel"],
    },
  },
  { timestamps: true }
);
export default mongoose.model("Order", orderSchema);
