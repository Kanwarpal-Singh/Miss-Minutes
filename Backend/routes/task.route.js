const express = require("express")
const { role } = require("../middlewares/role.middleware");
const { UserModel } = require("../models/user.model");
const { TaskModel } = require("../models/task.model");
const {projectModel} = require("../models/project.model")

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

    const updatedProject = await projectModel.findOneAndUpdate(
      { _id: projectId },
      { $push: { tasks: task._id } },
      { new: true }
    );

    res.status(200).send({ "message": "Task Created", Task: task })

  } catch (error) {
    res.status(400).send({ "message": error.message })
  }
})

// all the task of the user 
taskRoute.get("/alltask", async (req, res) => {
  try {
    console.log(req.body.UserId)
    const user = await UserModel.findOne({ _id: req.body.UserId }).populate("assignedTasks");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ data: user.assignedTasks });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
 
// all the task of one project 


taskRoute.get("/project/:projectId", async (req, res) => {
  try {
    const alltask = await projectModel.findOne({ _id: req.params.projectId }).populate('tasks');
    res.status(200).send({ data: alltask.tasks });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


// task by id


taskRoute.get("/:id",async(req,res)=>{
  try {
    const id = req.params.id

    const task = await TaskModel.findById({_id:id})

    res.status(200).send({"message":"Task Found",task});

  } catch (error) {
    res.status(500).send({ message: error.message });

  }
})

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