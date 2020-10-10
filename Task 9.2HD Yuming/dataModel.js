let mongoose = require("mongoose");
let UserSchema = new mongoose.Schema({
    taskType: String,
    title: String,
    description: String,
    expiryDate: String,
    optionA: String,
    optionB: String,
    optionC: String,
    question: String,
    masterWorker: String,
    reward: String,
    numberOfWorker: String,
    imageHash: String,
    imageName: String,
    imageLabels: Array
});

module.exports = mongoose.model('NewTaskList', UserSchema);


