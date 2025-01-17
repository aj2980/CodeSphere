const usermodel=require('../models/usermodel')
var bcrypt = require('bcryptjs');
const projmodel=require('../models/projectmodel')
var jwt=require('jsonwebtoken');
const projectmodel = require('../models/projectmodel');

const secret="secret"


function getStartupCode(language) {
  if (language.toLowerCase() === "python") {
    return 'print("Hello World")';
  } else if (language.toLowerCase() === "java") {
    return 'public class Main { public static void main(String[] args) { System.out.println("Hello World"); } }';
  } else if (language.toLowerCase() === "javascript") {
    return 'console.log("Hello World");';
  } else if (language.toLowerCase() === "cpp") {
    return '#include <iostream>\n\nint main() {\n    std::cout << "Hello World" << std::endl;\n    return 0;\n}';
  } else if (language.toLowerCase() === "c") {
    return '#include <stdio.h>\n\nint main() {\n    printf("Hello World\\n");\n    return 0;\n}';
  } else if (language.toLowerCase() === "go") {
    return 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello World")\n}';
  } else if (language.toLowerCase() === "bash") {
    return 'echo "Hello World"';
  } else {
    return 'Language not supported';
  }
}
exports.signup = async (req, res) => {
    try {
  
      let { email, pwd, fullName } = req.body;
  
      let emailCon = await usermodel.findOne({ email: email });
      if (emailCon) {
        return res.status(400).json({
          success: false,
          msg: "Email already exist"
        })
      }
  
      bcrypt.genSalt(12, function (err, salt) {
        bcrypt.hash(pwd, salt, async function (err, hash) {
  
          let user = await userModel.create({
            email: email,
            password: hash,
            fullName: fullName
          });
  
          return res.status(200).json({
            success: true,
            msg: "User created successfully",
          });
  
        });
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: error.message
      });
    }
  };

  exports.login=async (req,res)=>{
    try {
        let {email,pwd}=req.body
        let user=await usermodel.findOne({email:email})
        if(!user){
            return res.status(400).json({
                success:false,
                msg:"user not found"
            })
        }
        bcrypt.compare(pwd, user.password, function(err, res) {
            // res === true
            if(res){
                let token=jwt.sign({userId:user._id},secret)
                return res.status(200).json({
                    success:true,
                    msg:"user logged in "
                })

            }
            else{
                return res.status(401).json({
                    success:false,
                    msg:"invalid password"
                })
            }
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            msg:error.message
        })
        
    }
  }

  exports.createproj=async (req,res)=>{
    try {
        let [name,projlang,token,version]=req.body
        let decoded=jwt.verify(token,secret)
        let user=await usermodel.findOne({_id:decoded.userId})

        if(!user){
          return res.status(404).json({
            success: false,
            msg: "User not found"
          });
        }

        let project=await projmodel.create({
          name:name,
          projLanguage:projlang,
          createdBy:user._id,
          code:getStartupCode(projlang),
          version:version
        })

        return res.status(200).json({
          success: true,
          msg: "Project created successfully",
          projectId: project._id
        });
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            msg:error.message
        })
        
    }

  }

  exports.saveproj=async (req,res)=>{

    try {
      let {token,projectid,code}=req.body
      console.log("DATA: ",token, projectId, code)
    let decoded=jwt.verify(token,secret)
    let user = await usermodel.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found"
      });
    }
      
      let project=await projectmodel.findOneAndUpdate({_id:projectid},{
        code:code
      })
      return res.status(200).json({
        success: true,
        msg: "Project saved successfully"
      });
    } catch (error) {
      console.log(error)
     return res.status(500).json({
      success: false,
      msg: error.message
    })

      
    }
    



  }

  exports.getProjects = async (req, res) => {
    try {
  
      let { token } = req.body;
      let decoded = jwt.verify(token, secret);
      let user = await usermodel.findOne({ _id: decoded.userId });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          msg: "User not found"
        });
      }
  
      let projects = await projectmodel.find({ createdBy: user._id });
  
      return res.status(200).json({
        success: true,
        msg: "Projects fetched successfully",
        projects: projects
      });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: error.message
      })
    }
  };

  exports.getProject = async (req, res) => {
    try {
  
      let { token, projectId } = req.body;
      let decoded = jwt.verify(token, secret);
      let user = await usermodel.findOne({ _id: decoded.userId });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          msg: "User not found"
        });
      }
  
      let project = await projectmodel.findOne({ _id: projectId });
  
      if (project) {
        return res.status(200).json({
          success: true,
          msg: "Project fetched successfully",
          project: project
        });
      }
      else {
        return res.status(404).json({
          success: false,
          msg: "Project not found"
        });
      }
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: error.message
      })
    }
  };

  exports.deleteProject = async (req, res) => {
    try {
  
      let { token, projectId } = req.body;
      let decoded = jwt.verify(token, secret);
      let user = await userModel.findOne({ _id: decoded.userId });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          msg: "User not found"
        });
      }
  
      let project = await projectModel.findOneAndDelete({ _id: projectId });
  
      return res.status(200).json({
        success: true,
        msg: "Project deleted successfully"
      })
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: error.message
      })
    }
  };
  