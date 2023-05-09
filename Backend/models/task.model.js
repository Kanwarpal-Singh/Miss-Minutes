const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      startTime: {
        type: Date,
        default: Date.now
      },
      endTime: {
        type: Date
      },
      status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
        default: 'Not Started'
      },
      projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
});

const TaskModel = mongoose.model('Task', taskSchema);

module.exports={TaskModel}


