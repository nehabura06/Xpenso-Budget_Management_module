const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true,
        lowercase: true, // Ensures emails are stored in lowercase
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'] // Email validation
    },
    password: { type: String, required: true }
}, { timestamps: true });

// Hash password before saving the user
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Skip if password is not modified

    try {
        const salt = await bcrypt.genSalt(10); // Generate salt
        this.password = await bcrypt.hash(this.password, salt); // Hash password
        next();
    } catch (error) {
        console.error("Error hashing password:", error);
        return next(error); // Pass error to Mongoose
    }
});

// 🔑 Compare entered password with stored hashed password
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
