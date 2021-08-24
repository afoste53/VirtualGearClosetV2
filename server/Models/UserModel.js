import mongoose from "mongoose";
import bcrpyt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add last name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minLength: 6,
    },
  },
  {
    timeStamps: true,
  }
);

// method to check password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrpyt.compare(enteredPassword, this.password);
};

// method to salt and hash password if it has been changed prior to saving in db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrpyt.genSalt(10);
  this.password = await bcrpyt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
