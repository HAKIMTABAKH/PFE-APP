import User from "../models/user.model.js"; // ✅ FIXED

// Get current user profile
export const getCurrentUser = async (req, res, next) => {
    try {
        const { clerkUserId } = req.user;
        const user = await User.findOne({ clerkUserId });

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, user });
    } catch (err) {
        next(err);
    }
};

// Update user profile
export const updateUserProfile = async (req, res, next) => {
    try {
        const { clerkUserId } = req.user;
        const { firstName, lastName, phoneNumber } = req.body;

        const user = await User.findOneAndUpdate(
            { clerkUserId },
            { firstName, lastName, phoneNumber },
            { new: true }
        );

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, user });
    } catch (err) {
        next(err);
    }
};
