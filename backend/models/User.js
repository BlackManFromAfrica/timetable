import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
    },
    groupName:{
      type: String,
    },
    passwordHash: {
      type: String,
      required: true,
    }

  }
);

export default mongoose.model("User", UserSchema);
