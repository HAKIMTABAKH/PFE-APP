// controllers/auth.controller.js
import User from '../models/user.model.js';
import { clerk } from '../config/clerk.js';


// Sync user data from Clerk to MongoDB
export const syncUser = async (req, res, next) => {
    try {
        const { clerkUserId, email, firstName, lastName, phoneNumber } = req.body;

        console.log("Received request body:", req.body); // Log the request body

        // Check if the user already exists in the database
        let user = await User.findOne({ clerkUserId });

        if (!user) {
            // If the user doesn't exist, check if the email is already in use
            user = await User.findOne({ email });
            if (user) {
                // If the email is already in use, update the existing user
                user.clerkUserId = clerkUserId;
                user.firstName = firstName;
                user.lastName = lastName;
                user.phoneNumber = phoneNumber;
            } else {
                // If the email is not in use, create a new user
                user = new User({
                    clerkUserId,
                    email,
                    firstName,
                    lastName,
                    phoneNumber,
                });
            }
        } else {
            // If the user exists, update their details
            user.email = email;
            user.firstName = firstName;
            user.lastName = lastName;
            user.phoneNumber = phoneNumber;
        }

        await user.save(); // Save the user (either new or updated)
        console.log("User synced successfully:", user); // Log the saved user

        res.status(200).json({ success: true, user });
    } catch (err) {
        console.error("Error in syncUser:", err); // Log the error
        res.status(500).json({ success: false, message: err.message });
        next(err);
    }
};