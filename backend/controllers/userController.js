const usermodel = require('../models/usermodel');
var bcrypt = require('bcryptjs');
const projectmodel = require('../models/projectmodel');
var jwt = require('jsonwebtoken');

const secret = "secret";

function getStartupCode(language) {
  const lang = language.toLowerCase();
  const codeTemplates = {
    python: 'print("Hello World")',
    java: 'public class Main { public static void main(String[] args) { System.out.println("Hello World"); } }',
    javascript: 'console.log("Hello World");',
    cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello World" << std::endl;\n    return 0;\n}',
    c: '#include <stdio.h>\n\nint main() {\n    printf("Hello World\\n");\n    return 0;\n}',
    go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello World")\n}',
    bash: 'echo "Hello World"',
  };
  return codeTemplates[lang] || 'Language not supported';
}

// ✅ User Signup
exports.signup = async (req, res) => {
  try {
    let { email, pwd, fullname } = req.body;

    console.log("Received Data:", req.body); // ✅ Debugging Step

    if (!email || !pwd || !fullname) { // ✅ Ensure all fields are present
      return res.status(400).json({ success: false, msg: "All fields are required" });
    }

    let emailCon = await usermodel.findOne({ email });
    if (emailCon) {
      return res.status(400).json({ success: false, msg: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(pwd, salt);

    let user = await usermodel.create({
      email: email,
      password: hashedPassword,
      fullname: fullname
    });

    return res.status(200).json({ success: true, msg: "User created successfully" });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

// ✅ User Login
exports.login = async (req, res) => {
  try {
    let { email, pwd } = req.body;
    let user = await usermodel.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, msg: "User not found" });
    }

    bcrypt.compare(pwd, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign({ userId: user._id }, secret);
        res.cookie("token", token, {
          httpOnly: true, // Prevents JavaScript access
          secure: process.env.NODE_ENV === "production", // Works only on HTTPS in production
          sameSite: "Strict", // Prevents CSRF attacks
          maxAge: 24 * 60 * 60 * 1000 // 1 day expiration
      });
        return res.status(200).json({ success: true, msg: "User logged in", token });
      } else {
        return res.status(401).json({ success: false, msg: "Invalid password" });
      }
    });

  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

// ✅ Create Project
exports.createproj = async (req, res) => {
  try {
    let { name, projlang, token, version } = req.body;
    let decoded = jwt.verify(token, secret);
    let user = await usermodel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    let project = await projectmodel.create({
      name,
      projLanguage: projlang,
      createdBy: user._id,
      code: getStartupCode(projlang),
      version,
    });

    return res.status(200).json({ success: true, msg: "Project created successfully", projectId: project._id });

  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

// ✅ Save Project
exports.saveproj = async (req, res) => {
  try {
    let { token, projectid, code } = req.body;
    console.log("DATA: ", token);
    console.log( "projectid:",projectid);
    console.log(code);
    let decoded = jwt.verify(token, secret);
    let user = await usermodel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    let project = await projectmodel.findOneAndUpdate({ _id: projectid }, { code });

    return res.status(200).json({ success: true, msg: "Project saved successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: error.message });
  }
};

// ✅ Get All Projects
exports.getProjects = async (req, res) => {
  try {
    let { token } = req.body;
    let decoded = jwt.verify(token, secret);
    let user = await usermodel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    let projects = await projectmodel.find({ createdBy: user._id });

    return res.status(200).json({ success: true, msg: "Projects fetched successfully", projects });

  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

// ✅ Get Specific Project
exports.getProject = async (req, res) => {
  try {
    let { token, projectId } = req.body;
    let decoded = jwt.verify(token, secret);
    let user = await usermodel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    let project = await projectmodel.findOne({ _id: projectId });

    if (project) {
      return res.status(200).json({ success: true, msg: "Project fetched successfully", project });
    } else {
      return res.status(404).json({ success: false, msg: "Project not found" });
    }

  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

// ✅ Delete Project
exports.deleteProject = async (req, res) => {
  try {
    let { token, projectId } = req.body;
    let decoded = jwt.verify(token, secret);
    let user = await usermodel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    await projectmodel.findOneAndDelete({ _id: projectId });

    return res.status(200).json({ success: true, msg: "Project deleted successfully" });

  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

// UPDATE proj

exports.editProject = async (req, res) => {
  try {

    let {token, projectId, name} = req.body;
    let decoded = jwt.verify(token, secret);
    let user = await usermodel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found"
      });
    };

    let project = await projectmodel.findOne({ _id: projectId });
    if(project){
      project.name = name;
      await project.save();
      return res.status(200).json({
        success: true,
        msg: "Project edited successfully"
      })
    }
    else{
      return res.status(404).json({
        success: false,
        msg: "Project not found"
      })
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message
    })
  }
};