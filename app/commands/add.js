'use strict';
const fs = require('fs');
const path = require('path');

const writingToJsonFile = (modifiedTasksObject, filePath) => {
  const stringObject = JSON.stringify(modifiedTasksObject);
  fs.writeFileSync(filePath, stringObject);
  if(filePath === path.resolve(__dirname, '../tasks.json')){
    process.stdout.write(`Created task ${modifiedTasksObject.tasks.length}\n`);
  }
  return stringObject;
};

const readAndParseData = (jsonPath) => {
  const fileContents = fs.readFileSync(jsonPath, 'utf8');
  return JSON.parse(fileContents);
};

const turnIntoObject = (taskString, taskNumber) => {
  const taskObject = {id: taskNumber, description: taskString, incomplete: true};
  return taskObject;
};

const pushNewObjectToTasksArray = (newTaskObject, allTasksObject) => {
  allTasksObject.tasks.push(newTaskObject);
  return allTasksObject;
};

exports.add = (taskString, filePath) => {
  if(taskString){
    const tasksObject = readAndParseData(filePath);
    const taskNumber =  tasksObject.tasks.length+1;
    //turn string into object;
    const newTaskObject = turnIntoObject(taskString, taskNumber);
    //hold object and then push new array into tasks array
    const modifiedTasksObject = pushNewObjectToTasksArray(newTaskObject, tasksObject);
    //stringify tasks then write to jsonFile with new array added
    const stringTasksObject = writingToJsonFile(modifiedTasksObject, filePath);
    return stringTasksObject;
  } else {
    //eventually make a test to catch an error when no string entered
    return 'Error: must enter task';
  }
};
