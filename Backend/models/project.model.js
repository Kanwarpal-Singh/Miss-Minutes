const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['in progress', 'completed'],
    default: 'in progress'
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    type: String,
    // ref: 'Task'
  }],
  createdBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  timeTracking: {
    startDate: Date,
    endDate: Date,
    totalHours: Number
  }
},{
  versionKey:false
});

const projectModel = mongoose.model("projects",projectSchema)

module.exports = {projectModel}