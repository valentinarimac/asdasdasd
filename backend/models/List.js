const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      requred: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name field"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("List", listSchema);
