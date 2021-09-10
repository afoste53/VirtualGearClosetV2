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
    const temp = this.gear.filter((c) => c.id != g);
    this.gear = temp;
  });
};

const Closet = mongoose.model("Closet", closetSchema);

export default Closet;
