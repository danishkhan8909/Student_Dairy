import mongoose from "mongoose";

const dailyUpdateSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  title: String,
  content: String,
  date: {type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("DailyUpdate", dailyUpdateSchema);