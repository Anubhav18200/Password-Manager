const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  passwords: [
    {
      password: {
        type: String,
        required: true,
      },
      platform: {
        type: String,
        required: true,
      },
      platEmail: {
        type: String,
        required: true,
      },
      iv: {
        type: String,
      },
    },
  ],
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
