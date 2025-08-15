const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Codesphere";
        
        console.log("Attempting to connect to MongoDB...");
        console.log("MongoDB URI:", mongoURI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Hide credentials in logs
        
        await mongoose.connect(mongoURI);  
        console.log("DB connected successfully");  
    } catch (error) {
        console.error("Database connection error:", error);
        console.error("Please check your MONGODB_URI environment variable");
        process.exit(1);
    }
}

module.exports = connectDB;