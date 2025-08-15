const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Codesphere";
        
        await mongoose.connect(mongoURI, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });  
        console.log("DB connected successfully");  
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
}

module.exports = connectDB;