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

closetSchema.methods.addGearToCloset = function (gearToAdd) {
  gearToAdd.forEach((g) => {
    this.gear.push(g);
  });
};

closetSchema.methods.removeGearFromCloset = function (gearToRemove) {
  gearToRemove.forEach((g) => {
    this.gear.filter((c) => c != g);
  });
};

const Closet = mongoose.model("Closet", closetSchema);

export default Closet;
