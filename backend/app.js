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
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Updated analyzeCode Endpoint using Google Gemini
app.post('/analyzeCode', async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ success: false, msg: "Query is required." });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: query,
    });

    // Extract raw suggestion
    const suggestion =
      response.text ||
      (response.candidates && response.candidates[0]?.content?.parts?.[0]?.text) ||
      "No suggestion found.";

    // ✅ Format the suggestion to render as HTML in frontend
    const formatted = suggestion
      .replace(/\n/g, "<br>")
      .replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>');

    // ✅ Send the formatted suggestion
    res.status(200).json({ success: true, suggestion: formatted });

  } catch (error) {
    console.error("Error analyzing code:", error);
    res.status(500).json({ success: false, msg: "Internal server error." });
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

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
