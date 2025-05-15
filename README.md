Here's the corrected and properly formatted README.md file:

```markdown
# CODE-SPHERE

![CodeSphere Banner](https://github.com/user-attachments/assets/93fcb39e-f4f7-470a-9ea9-e4159812e4d5)

## 🚀 Project Overview

CodeSphere is an advanced online IDE that enables users to write, compile, and execute code in multiple programming languages. It provides a seamless coding experience with features like AI-powered optimization, real-time output, and email notifications.

## 🔥 Key Features

### Core Functionality
- **Multi-Language Support**: Compile and run code in C, C++, Python, Java, JavaScript, and more
- **Real-Time Execution**: Get instant output of code execution
- **AI Code Optimization**: Built-in AI assistant for code suggestions and improvements
- **Real-Time Emailing**: Receive execution results and notifications via email

### Enhanced Development
- **Syntax Highlighting**: Improved readability with language-specific coloring
- **Error Detection**: Real-time error highlighting and suggestions
- **Project Management**: Save and organize multiple coding projects
- **Responsive UI**: Works across all device sizes

### Collaboration
- **Code Sharing**: Share projects with team members
- **Execution Notifications**: Email alerts for code executions
- **AI Pair Programming**: Interactive coding assistant

## 🛠️ Tech Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS
- Monaco Editor
- Socket.io

### Backend
- Node.js with Express.js
- JWT Authentication
- Nodemailer

### AI & Compilation
- Custom AI model
- Judge0 API
- Firebase

### Database
- MongoDB
- Redis

## 📌 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/aj2980/CodeSphere.git
cd CodeSphere
```

### 2️⃣ Install Dependencies
```bash
npm install  # Backend
cd frontend && npm install  # Frontend
```

### 3️⃣ Configure Environment
Create `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection
COMPILER_API_KEY=your_judge0_key
EMAIL_USER=your_email@domain.com
EMAIL_PASS=your_email_password
AI_API_KEY=your_ai_service_key
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Start Servers
```bash
npm run dev # Backend
cd frontend && npm start # Frontend
```

## 📖 Usage Guide
1. Sign up/Login to access features
2. Select programming language
3. Write code in the editor
4. Run code to view output
5. Use AI assistant for optimizations
6. Save projects and receive email notifications

## 🖼️ Screenshots

| Editor Interface | About |
|------------------|----------------|
| ![Editor](https://github.com/user-attachments/assets/66d807de-9c6f-4c32-8c76-dd2836b55714) | ![Output](https://github.com/user-attachments/assets/0578c77b-ae65-4160-8f0c-eff9bba58323) |

| Email Notification | Home |
|--------------------|-------------|
| ![Email](https://github.com/user-attachments/assets/367bea55-9f7c-4bb0-a656-a9238acbee35) | ![AI](https://github.com/user-attachments/assets/93fcb39e-f4f7-470a-9ea9-e4159812e4d5) |

## 🔗 API Endpoints

| Method | Endpoint               | Description                  |
|--------|------------------------|------------------------------|
| POST   | /api/compile           | Compile and execute code     |
| POST   | /api/auth/register     | Register new user            |
| POST   | /api/auth/login        | User login                   |
| GET    | /api/projects          | Fetch saved projects         |
| POST   | /api/ai/optimize       | Get AI code suggestions      |
| POST   | /api/email/send        | Send execution notifications |

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

Developed with ❤️ by Abhishek Jha
```

Key improvements:
1. Properly organized all sections with consistent formatting
2. Fixed image display in a clean 2x2 grid layout
3. Corrected all markdown syntax issues
4. Added missing environment variables
5. Improved API endpoint table formatting
6. Enhanced overall readability and structure
7. Added proper headings and spacing
8. Maintained all original content while making it more professional
