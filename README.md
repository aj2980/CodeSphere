

**CODE-SPHERE**

![WhatsApp Image 2025-05-24 at 00 29 29_e3b9b4ae](https://github.com/user-attachments/assets/e9c84ce7-7448-4414-a98c-bc33260c6b63)


**🚀 Project Overview**

CodeSphere is an advanced online IDE that enables users to write, compile, and execute code in multiple programming languages. It provides a seamless coding experience with features like AI-powered optimization, real-time output, and email notifications.

**🔥 Key Features**

**Core Functionality**
- **Multi-Language Support**: Compile and run code in C, C++, Python, Java, JavaScript, and more  
- **Real-Time Execution**: Get instant output of code execution  
- **AI Code Optimization**: Built-in AI assistant for code suggestions and improvements  
- **Real-Time Emailing**: Receive execution results and notifications via email  

**Enhanced Development**
- **Syntax Highlighting**: Improved readability with language-specific coloring  
- **Error Detection**: Real-time error highlighting and suggestions  
- **Project Management**: Save and organize multiple coding projects  
- **Responsive UI**: Works across all device sizes  

**Collaboration**
- **Code Sharing**: Share projects with team members  
- **Execution Notifications**: Email alerts for code executions  
- **AI Pair Programming**: Interactive coding assistant  

**🛠️ Tech Stack**

**Frontend**
- React.js  
- Tailwind CSS  
- Monaco Editor  


**Backend**
- Node.js with Express.js  
- JWT Authentication  
- EmailJS

**AI & Compilation**
- Gemini API  


**Database**
- MongoDB  


**📌 Installation & Setup**

**1️⃣ Clone the Repository**
```bash
git clone https://github.com/aj2980/CodeSphere.git
cd CodeSphere
````

**2️⃣ Install Dependencies**

```bash
npm install  # Backend
cd frontend && npm install  # Frontend
```

**3️⃣ Configure Environment**
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

**4️⃣ Start Servers**

```bash
npm run dev # Backend
cd frontend && npm start # Frontend
```

**📖 Usage Guide**

1. Sign up/Login to access features
2. Select programming language
3. Write code in the editor
4. Run code to view output
5. Use AI assistant for optimizations
6. Save projects and receive email notifications

**🖼️ Screenshots**

| Editor Interface                                                                           | About                                                                                      |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| ![Editor](https://github.com/user-attachments/assets/66d807de-9c6f-4c32-8c76-dd2836b55714) | ![Output](https://github.com/user-attachments/assets/0578c77b-ae65-4160-8f0c-eff9bba58323) |

| Email Notification                                                                        | Home                                                                                   |
| ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| ![Email](https://github.com/user-attachments/assets/367bea55-9f7c-4bb0-a656-a9238acbee35) | ![AI](https://github.com/user-attachments/assets/93fcb39e-f4f7-470a-9ea9-e4159812e4d5) |

**🔗 API Endpoints**

| Method | Endpoint           | Description                  |
| ------ | ------------------ | ---------------------------- |
| POST   | /api/compile       | Compile and execute code     |
| POST   | /api/auth/register | Register new user            |
| POST   | /api/auth/login    | User login                   |
| GET    | /api/projects      | Fetch saved projects         |
| POST   | /api/ai/optimize   | Get AI code suggestions      |
| POST   | /api/email/send    | Send execution notifications |

**🤝 Contributing**

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

```

Let me know if you’d like it styled in a particular way (e.g., custom emoji headers, full uppercase, indents, or center-aligned title).
```
