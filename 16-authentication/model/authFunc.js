//local module

const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ["guest", "host"] },
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Home" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
