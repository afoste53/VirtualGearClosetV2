import mongoose from "mongoose";

const closetSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name for the closet"],
  },
  gear: [],
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const Closet = mongoose.model("Closet", closetSchema);

export default Closet;
