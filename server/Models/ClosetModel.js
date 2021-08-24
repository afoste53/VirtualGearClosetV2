import mongoose from "mongoose";

const closetSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Must have an owner"],
  },
  gear: [
    {
      item: {
        type: mongoose.Schema.ObjectId,
        ref: "Gear",
      },
      name: String,
    },
  ],
});

const Closet = mongoose.model("Closet", closetSchema);

export default Closet;
