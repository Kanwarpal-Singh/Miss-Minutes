const express = require("express")
const { role } = require("../middlewares/role.middleware");
const { UserModel } = require("../models/user.model");
const { TaskModel } = require("../models/task.model");
const {ProjectModel} = require("../models/project.model")

const taskRoute = express.Router()



taskRoute.post("/create/:projectId", role(["Admin", "Manager"]), async (req, res) => {
    try {
      const projectId = req.params.projectId;
      const { title, description, assignedTo } = req.body;
  
      const employee = await UserModel.findOne({ _id: assignedTo, role: 'Employee' });
      if (!employee) {
        return res.status(400).send('Assigned user not found or not an employee');
      }
  
      const task = new TaskModel({
        title,
        description,
        assignedTo: employee._id,
        createdBy: req.body.UserId,
        ProjectId: req.params.projectId
      });
  
      await task.save();
  
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: assignedTo },
        { $push: { assignedTasks: task._id } },
        { new: true }
      );
  
      const updatedProject = await ProjectModel.findOneAndUpdate(
        { _id: projectId },
        { $push: { tasks: task._id } },
        { new: true }
      );
  
      res.status(200).send({ "message": "Task Created", Task: task })
  
    } catch (error) {
      res.status(400).send({ "message": error.message })
    }
  })
  

taskRoute.get("/alltask", async (req, res) => {
    try {
      const project = await ProjectModel.findOne({ _id: req.body.projectId }).populate("tasks");
      res.status(200).send({"data":project.tasks});
    } catch (error) {
      res.status(500).send({ "message": error.message });
    }
  });


  taskRoute.patch("/update/:id",role(["Admin","Manager"]),async(req,res)=>{
   
    try {
        let id = req.params.id
        let payload = req.body
      const task = await TaskModel.findByIdAndUpdate({_id:id},payload,{new:true})
      res.status(200).send({"message":"tasks is Updated successfully",task})
    } catch (error) {
      res.status(400).send({ message: 'Server error', error });
    }
  })
  taskRoute.delete("/delete/:id",role(["Admin","Manager"]),async(req,res)=>{
   
    try {
        let id = req.params.id
      const task = await TaskModel.findByIdAndDelete({_id:id})
      res.status(200).send({"message":"Tasks is deleted successfully"})
    } catch (error) {
      res.status(400).send({ message: 'Server error', error });
    }
  })

module.exports={taskRoute}