const express = require("express")
const { role } = require("../middlewares/role.middleware");
const { UserModel } = require("../models/user.model");
const { TaskModel } = require("../models/task.model");
const { projectModel } = require("../models/project.model")

const taskRoute = express.Router()

taskRoute.get("/", (req, res) => {
  res.send("hello")
})

taskRoute.post("/create/:projectId", role(["Admin", "Manager"]), async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const { title, description, assignedTo ,startTime,status} = req.body;

    const employee = await UserModel.findOne({ _id: assignedTo, role: 'Employee' });

    console.log(employee)
    if (!employee) {
      return res.status(400).send('Assigned user not found or not an employee');
    }

    const task = new TaskModel({
      title,
      description,
      assignedTo: employee._id,
      createdBy: req.body.UserId,
      status,
      startTime,
      projectId: req.params.projectId
    });

    await task.save();

    console.log(task)
    const updatedUser = await UserModel.findOne({ _id: assignedTo });

    if (!updatedUser.assignedProjects.includes(projectId)) {
      updatedUser.assignedProjects.push(projectId);
    }

    updatedUser.assignedTasks.push(task._id);
    await updatedUser.save();



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
    res.status(200).send({ "data": alltask.tasks });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


// task by id


taskRoute.get("/:id", async (req, res) => {
  try {
    const id = req.params.id

    const task = await TaskModel.findById({ _id: id })

    res.status(200).send({ "message": "Task Found", task });

  } catch (error) {
    res.status(500).send({ message: error.message });

  }
})
// emp   assignto 

taskRoute.patch("/update-assignee/:id", role(["Admin", "Manager"]), async (req, res) => {
  try {
    const taskId = req.params.id;
    const newAssigneeId = req.body.newAssigneeId;

    // Check if newAssigneeId is a valid employee
    const newAssignee = await UserModel.findOne({ _id: newAssigneeId, role: 'Employee' });
    if (!newAssignee) {
      return res.status(400).send('New assignee not found or not an employee');
    }

    const task1 = await TaskModel.findOne({_id:taskId})

    // Remove the task from the previous assignee's assignedTasks array
    const prevAssignee = await UserModel.findOne({ _id: task1.assignedTo });
    prevAssignee.assignedTasks.pull(task1._id);
    await prevAssignee.save();


    // Find the task and update the assignedTo field
    const task = await TaskModel.findOneAndUpdate(
      { _id: taskId },
      { assignedTo: newAssigneeId },
      { new: true }
    );

    // Add the task to the new assignee's assignedTasks array
    newAssignee.assignedTasks.push(task._id);

    if (!newAssignee.assignedProjects.includes(task.projectId)) {
      newAssignee.assignedProjects.push(task.projectId)
    }
    
    
    await newAssignee.save();

   // Remove the project id from the previous assignee's assignedProjects array
    const projectId = task.projectId;
    if (prevAssignee.assignedProjects.includes(projectId)) {
      const projectTasks = await TaskModel.find({ projectId: projectId });
      const projectTasksAssignedToPrev = projectTasks.filter(task => task.assignedTo.toString() === prevAssignee._id.toString());
      if (projectTasksAssignedToPrev.length === 0) {
        prevAssignee.assignedProjects.pull(projectId);
        await prevAssignee.save();
      }
    }

    res.status(200).send({ "message": "Assigned to updated successfully", task });

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});



taskRoute.patch("/update/:id", role(["Admin", "Manager"]), async (req, res) => {

  try {
    let id = req.params.id
    let payload = req.body
    const task = await TaskModel.findByIdAndUpdate({ _id: id }, payload, { new: true })
    res.status(200).send({ "message": "tasks is Updated successfully", task })
  } catch (error) {
    res.status(400).send({ message: 'Server error', error });
  }
})
taskRoute.delete("/delete/:id", role(["Admin", "Manager"]), async (req, res) => {
  try {
  const taskId = req.params.id;
  const task = await TaskModel.findOne({ _id: taskId });
  console.log(task.projectId)
  if (!task) {
  return res.status(404).send({ message: 'Task not found' });
  }

  // Remove the task from the previous assignee's assignedTasks array
  const project = await projectModel.findOne({ _id: task.projectId});
  if(!project)  return res.status(404).send({ message: 'Project not found' });
  project.tasks.pull(task._id);
  await project.save();

  const user = await UserModel.findOne({ _id: task.assignedTo });
  if(!user)  return res.status(404).send({ message: 'user not found' });
  user.assignedTasks.pull(task._id);
  await user.save();

  const deletetask = await TaskModel.findByIdAndDelete({_id:taskId})
  res.status(200).send({"message":"Task Deleted"})
  } catch (error) {
  res.status(400).send({"message":error.message});
  }
  });


//  total employee

taskRoute.get('/:projectId/users', async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const project = await projectModel
      .findById(projectId)
      .populate('tasks', 'assignedTo');

    if (!project) {
      return res.status(404).send('Project not found');
    }

    const assignedUserIds = new Set();
    project.tasks.forEach(task => {
      task.assignedTo && assignedUserIds.add(task.assignedTo.toString());
    });

    const assignedUsers = await UserModel.find({
      _id: { $in: Array.from(assignedUserIds) },
    });

    return res.status(200).send({"assignedUsers":assignedUsers.length});
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});


// delete all the project
taskRoute.delete('/:id',role(["Admin", "Manager"]), async (req, res) => {
  try {
    const projectId = req.params.id;

    // Delete all associated tasks
    const deletedTasks = await TaskModel.deleteMany({ projectId: projectId });

    // Remove project from users' assignedProjects array
    const updatedUsers = await UserModel.updateMany(
      { assignedProjects: projectId },
      { $pull: { assignedProjects: projectId } }
    );

    // Delete project itself
    const deletedProject = await projectModel.findByIdAndDelete(projectId);

    res.status(200).send({ "message": 'Project deleted successfully.'});
  } catch (error) {
    console.log(error);
    res.status(400).send({"message":error.message});
  }
});




module.exports = { taskRoute }


// get all the user that are in project