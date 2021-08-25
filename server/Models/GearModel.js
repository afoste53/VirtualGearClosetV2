import mongoose from "mongoose";

const gearSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  weight: {
    w: {
      type: Number,
    },
    unit: {
      type: String,
      enum: ["oz", "g", "kg", "lb"],
    },
  },
  color: {
    type: String,
  },
  notes: {
    type: String,
    maxLength: [250, "Please shorten the notes"],
  },
  cost: {
    c: {
      type: Number,
    },
    currency: {
      type: String,
      enum: ["dollars", "euros", "yen", "pounds", "other"],
    },
  },
  quantity: {
    type: Number,
    default: 1,
  },
  brand: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Must have an owner"],
  },
  closets: [
    {
      name: String,
      closetId: {
        type: mongoose.Schema.ObjectId,
        ref: "Closet",
      },
    },
  ],
});

const Gear = mongoose.model("Gear", gearSchema);

export default Gear;
