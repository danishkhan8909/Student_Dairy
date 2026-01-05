import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get user profile

router.get("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // hide password
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users (Admin only)

router.get("/", protect, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied" });
  const users = await User.find().select("-password");
  res.json(users);
});

router.put("/:id", protect, async (req, res) => {
  const update = await DailyUpdate.findById(req.params.id);

  if (!update) return res.status(404).json({ message: "Update not found" });

  // Only the owner or admin can edit

  if (update.userId.toString() !== req.user.id && req.user.role !== "admin")
    return res.status(403).json({ message: "Not authorized" });

  const updated = await DailyUpdate.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updated);
});

router.delete("/:id", protect, async (req, res) => {
  const update = await DailyUpdate.findById(req.params.id);

  if (!update) return res.status(404).json({ message: "Update not found" });

  if (update.userId.toString() !== req.user.id && req.user.role !== "admin")
    return res.status(403).json({ message: "Not authorized" });

  await update.deleteOne();
  res.json({ message: "Deleted successfully" });
});

export default router;
