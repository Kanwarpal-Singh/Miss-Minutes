const express = require("express");
const { projectModel } = require("../models/project.model");
const { UserModel } = require("../models/user.model");

const projectRoute = express.Router()

projectRoute.get("/",async(req,res)=>{
    try {
        const projects = await projectModel.find();
        console.log(projects)
    } catch (err) {
        res.send(err)
    }
})

projectRoute.post("/create/:id", async (req, res) => {
    const  userId  = req.params.id;
    const {name,description,status,tasks,timeTracking} = req.body;

    const user = await UserModel.findOne({_id:userId})

    if(user.role==="manager" || user.role === "admin"){
        const projectexist = await projectModel.findOne({name})
        console.log(projectexist)
        if(projectexist){
            console.log(`Project ${name} is already there, you can go through it!`)
            res.send(`Project ${name} is already there, you can go through it!`)
        }else{
            const project = new projectModel({name,description,status,tasks,createdBy:userId,timeTracking});
            console.log(project)
            await project.save();
            console.log(name)
            console.log(`project is successfully assigned to Mr. ${user.name}`)
            res.send(project);
        }
    }else{
        console.log("You are not authorized")
        res.send("You are not authorized")
    }
});



projectRoute.get("/details/:id",async(req,res)=>{
  const projectId = req.params.id;
  try {
      const project = await projectModel.findOne({_id:projectId});
      console.log(project)
      res.send(project)
  } catch (err) {
      res.send(err)
  }
})

projectRoute.get("/searchProject/:name",async(req,res)=>{
  const projectName = req.params.name;
  try {
      const project = await projectModel.findOne({name:projectName});
      console.log(project)
      res.send(project)
  } catch (err) {
      res.send(err)
  }
})

projectRoute.get("/AllProjectsByManager/:id",async(req,res)=>{
  const managerId = req.params.id;
  try {
      const projects = await projectModel.find({createdBy:managerId});
      console.log(projects)
      res.send(projects)
  } catch (err) {
      res.send(err)
  }
})


//  admin
// 3 managers
// 5 emps
// 3 projects
// 1st project > kuldeep > create project > task creation and authorities > employee > work 
// 2nd project > 


// create ==> done
// get all project  ==> done
// get single project/:project_id ==> done
// get all projects of a manager project:/manager_id  ==> done
// search ( project ) get project by project/:project_name ==> done
// Delete project by manager(who created),admin
// Update project by manager(who created),admin


projectRoute.patch("/update/:projectid/:adminid", async(req,res)=>{
    const adminid = req.params.adminid;
    const empid = req.params.empid;
    const projectname = req.params.projectname;
    const user1 = await UserModel.findOne({_id: adminid});
    const user2 = await UserModel.findOne({_id: empid});
    const projectexists = await projectModel.findOne({name: projectname});
    const projectindex = projectexists.assignedTo
    projectindex.push(user2._id)
    // console.log(projectindex)
    if (projectexists) {
        if(projectexists.assignedTo.includes(empid)){
            console.log({msg:"employee already working on this project"})
            return res.send({msg:"employee already working on this project"})
        }
        if ((user1.role === "manager" || user1.role === "admin") && (user2.role !== "admin" && user2.role !== "manager")) {
            const project = await projectModel.findByIdAndUpdate(projectexists._id,{assignedTo : projectindex}, {new: true}).exec();
            console.log(project)
            console.log(`Project is successfully assigned to Mr. ${user2.name}`);
            res.send(`Project is successfully assigned to Mr. ${user2.name}`);
        } else {
            console.log("You are not authorized");
            res.status(403).send("You are not authorized");
        }
    } else {
        console.log("Project doesn't exist! Please create one.");
        res.status(404).send("Project doesn't exist! Please create one.");
    }
});


module.exports = {projectRoute}