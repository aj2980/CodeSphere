const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true, // ✅ Fixed "require" to "required"
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate emails
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true }); // ✅ Adds createdAt & updatedAt automatically

const userModel = mongoose.model('User', userSchema);
module.exports = userModel; // ✅ Ensure proper export
