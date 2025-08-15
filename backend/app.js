require('dotenv').config(); // Load environment variables
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const connectDB = require('./config/db');

// REMOVE Azure imports
// const ModelClient = require("@azure-rest/ai-inference").default;
// const { AzureKeyCredential } = require("@azure/core-auth");
// const { isUnexpected } = require("@azure-rest/ai-inference");

// ADD Google Gemini import
const { GoogleGenAI } = require("@google/genai");

const app = express();

// Google Gemini AI setup
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

connectDB();

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, 'https://codesphere-w8pb.onrender.com', 'https://codesphere.onrender.com'] 
    : "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// API routes (specific routes first)
app.use('/api', indexRouter);
app.use('/api/users', usersRouter);

// Updated analyzeCode Endpoint using Google Gemini (moved to /api route)
app.post('/api/analyzeCode', async (req, res) => {
  try {
    const { query } = req.body;
     console.log("Received query:", query); 

    if (!query) {
      return res.status(400).json({ success: false, msg: "Query is required." });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: query,
    });
    console.log("AI raw response:", response); // See the full AI response

    // Extract raw suggestion
    const suggestion =
      response.text ||
      (response.candidates && response.candidates[0]?.content?.parts?.[0]?.text) ||
      "No suggestion found.";

    console.log("AI suggestion:", suggestion); // See the extracted suggestion

    const formatted = `\`\`\`\n${suggestion.trim()}\n\`\`\``;

    // ✅ Send the formatted suggestion (with code block)
    res.status(200).json({ success: true, suggestion: formatted });

  } catch (error) {
    console.error("Error analyzing code:", error);
    res.status(500).json({ success: false, msg: "Internal server error." });
  }
});

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Debug route to check build status
app.get('/debug', (req, res) => {
  const indexPath = path.join(__dirname, "../frontend/dist/index.html");
  const distPath = path.join(__dirname, "../frontend/dist");
  
  res.json({
    message: "Debug information",
    indexPath: indexPath,
    distPath: distPath,
    indexPathExists: require('fs').existsSync(indexPath),
    distPathExists: require('fs').existsSync(distPath),
    currentDir: __dirname,
    filesInDist: require('fs').existsSync(distPath) ? require('fs').readdirSync(distPath) : "Directory not found"
  });
});

// Catch-all route to serve React app (must be last)
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, "../frontend/dist/index.html");
  
  // Check if the file exists before trying to serve it
  if (require('fs').existsSync(indexPath)) {
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error("Error serving React app:", err);
        res.status(500).send("Error loading application");
      }
    });
  } else {
    console.error("Frontend build not found at:", indexPath);
    res.status(500).json({
      error: "Frontend build not found",
      message: "The React application has not been built. Please check the build process.",
      path: indexPath,
      suggestion: "Check the /debug endpoint for more information"
    });
  }
});


// Catch 404
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// Remove the duplicate listen call since bin/www handles it
// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });
