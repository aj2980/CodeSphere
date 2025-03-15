# CODE-SPHERE

🚀 Project Overview

The Multiple Code Compiler Platform is an online integrated development environment (IDE) that allows users to write, compile, and execute code in multiple programming languages. It is designed to provide a seamless coding experience with features like syntax highlighting, error detection, and real-time output display.

🔥 Features

Multi-Language Support: Compile and run code in multiple languages like C, C++, Python, Java, JavaScript, and more.

Real-Time Execution: Get instant output of code execution.

Syntax Highlighting: Improved readability with syntax highlighting.

User Authentication: Secure login/logout functionality.

Project Management: Save and manage multiple projects.

Error Handling: Display errors and warnings in the editor.

Responsive UI: Works across various devices and screen sizes.

🛠️ Tech Stack

Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js

Compiler API: Judge0 or custom-built execution environment

Database: MongoDB / Firebase (for user authentication and project storage)

📌 Installation & Setup

Follow these steps to set up the project locally:

1️⃣ Clone the Repository

git clone [https://github.com/yourusername/multiple-code-compiler.git](https://github.com/aj2980/CodeSphere.git)
cd multiple-code-compiler

2️⃣ Install Dependencies

npm install  # Install backend dependencies
cd frontend && npm install  # Install frontend dependencies

3️⃣ Set Up Environment Variables

Create a .env file in the root directory and add the required configurations:

PORT=5000
MONGO_URI=your_mongodb_connection_string
COMPILER_API_KEY=your_compiler_api_key

4️⃣ Start the Development Server

Run the backend and frontend servers:

npm run dev # For backend
cd frontend && npm start # For frontend

📖 Usage Guide

Sign up/Login to access the compiler.

Select a programming language from the dropdown.

Write your code in the editor.

Click on 'Run' to execute and view output.

Save projects for future reference.

🔗 API Endpoints

Method

Endpoint

Description

POST

/api/compile

Compile and execute code

POST

/api/auth/register

Register a new user

POST

/api/auth/login

Login user

GET

/api/projects

Fetch saved projects

🤝 Contributing

We welcome contributions! Feel free to submit issues or create pull requests.



Developed with ❤️ by Abhishek


