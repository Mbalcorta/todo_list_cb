'use strict';
const fs = require('fs');
const path = require('path');

const writingToJsonFile = (modifiedTasksObject) => {
  const stringObject = JSON.stringify(modifiedTasksObject);
  fs.writeFile(filePath, stringObject, (err) => {
    if(err) throw err
    return stringObject;
  });
};

const readAndParseData = (jsonPath) => {
  let fileContents
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    if(err){
      throw err
    }
    data = fileContents
    return JSON.parse(fileContents);
  });
};

const writeToTerminal = (filePath, modifiedTasksObject) => {
  if(filePath === path.resolve(__dirname, '../tasks.json')){
    process.stdout.write(`Created task ${modifiedTasksObject.tasks.length}\n`);
  }
}

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
    writeToTerminal(filePath, modifiedTasksObject)
    //stringify tasks then write to jsonFile with new array added
    const stringTasksObject = writingToJsonFile(modifiedTasksObject, filePath);
    return stringTasksObject;
  } else {
    //eventually make a test to catch an error when no string entered
    return 'Error: must enter task';
  }
};
