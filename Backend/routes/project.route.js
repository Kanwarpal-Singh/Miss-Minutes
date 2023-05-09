const express = require("express");
const { projectModel } = require("../models/project.model");
const { role } = require("../middlewares/role.middleware");

const projectRoute = express.Router()

projectRoute.get("/",async(req,res)=>{
    try {
        const projects = await projectModel.find();
        console.log(projects)
        res.send(projects)
    } catch (err) {
        res.send(err.message)
    }
})


projectRoute.post("/create", role(["manager","admin"]),async (req, res) => {
    try {
        const {name,description,status} = req.body;
        const projectexist = await projectModel.findOne({name})
        console.log(projectexist)
        if(projectexist){
            console.log(`Project ${name} is already there, you can go through it!`)
            res.send(`Project ${name} is already there, you can go through it!`)
        }else{
            const project = new projectModel({name,description,status,createdBy: req.body.UserId});
            console.log(project)
            await project.save();

            const updatedUser = await UserModel.findOneAndUpdate(
                { _id: req.body.UserId},
                { $push: { assignedProjects: project._id } },
                { new: true }
            );
            console.log(name)
            res.status(200).send({"msg":"project created",project})
        }
    } catch (error) {
        res.status(400).send({"message":error.message})
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


projectRoute.delete("/delete/:projectid",role("admin"), async(req,res)=>{
    const projectid = req.params.projectid;
    const projectexists = await projectModel.findOne({_id: projectid});
    
    if (projectexists) {
        const project = await projectModel.findByIdAndDelete(projectexists._id).exec();
        console.log(project)
        console.log({"msg":`Project ${project.name} is successfully Deleted to`});
        res.status(200).send({"msg":`Project ${project.name} is successfully Deleted to`});
    } else {
        console.log("Project doesn't exist!");
        res.status(404).send({"msg":"Project doesn't exist!"});
    }
});


module.exports = {projectRoute}