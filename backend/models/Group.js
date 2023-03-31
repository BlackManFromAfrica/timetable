import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  academic: [
    {
      descipline: {
        type: String,
      },
      hours: {
        type: Number,
      },
      hoursAll: {
        type: Number,
      },
    },
  ],
});

export default mongoose.model("Group", GroupSchema);
