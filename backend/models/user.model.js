import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkUserId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user", "firefighter"], // Define user roles
        default: "user",
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update the `updatedAt` field before saving
userSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const User = mongoose.model("User", userSchema);
export default User;
