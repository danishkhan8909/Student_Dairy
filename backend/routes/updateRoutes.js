import express from "express";
import DailyUpdate from "../models/DailyUpdate.js";
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router();

// Create update
router.post("/", protect, async(req, res) => {
    const update = await DailyUpdate.create( {userId: req.user.id, ...req.body });
    res.status(201).json(update);
})

// Get All updates (Admin)
router.get("/", protect, async(req, res) => {
    if (req.user.role !== "admin")
        return res.status(403).json({ message: "Access denied" });

    const updates = await DailyUpdate.find().populate("userId", "name email");
    res.json(updates);
});

// Get my updates 
router.get("/my", protect, async(req, res) => {

    const updates = await DailyUpdate.find().populate("userId", "name email");
    res.json(updates);
});

// Update entry
router.put("/:id", protect, async(req, res) => {

    const update = await DailyUpdate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(update);
});


// Delete entry
router.delete("/:id", protect, async(req, res) => {
    await DailyUpdate.findByIdAndDelete(req.params.id);
    res.json({message: "Deleted successfully"});
});

export default router;
