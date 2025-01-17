var express = require('express');
var router = express.Router();
const {signup,login,createproj,saveproj, getProjects, getProject, deleteProject}=require('../controllers/userController')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/signup",signup)
router.post("/login",login)
router.post("/createproj",createproj)
router.post("/saveproj",saveproj)
router.post("/getProjects", getProjects); 
router.post("/getProject", getProject); 
router.post("/deleteProject", deleteProject); 

module.exports = router;
