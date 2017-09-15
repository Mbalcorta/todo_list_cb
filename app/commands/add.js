'use strict';
const fs = require('fs');
const path = require('path');

const writingToJsonFile = ( modifiedTasksObject, filePath) => {
  const stringObject = JSON.stringify(modifiedTasksObject);
  fs.writeFile(filePath, stringObject, (err) => {
    if(err) throw err
    return stringObject;
  });
};

const readAndParseData = (jsonPath, taskString) => {
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    if(err){
      throw err
    }
    runAfterRead(JSON.parse(data), jsonPath, taskString)
    return JSON.parse(data);
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

const runAfterRead = (tasksObject, filePath, taskString) => {
  let taskNumber =  tasksObject.tasks.length+1;
  //turn string into object;
  let newTaskObject = turnIntoObject(taskString, taskNumber);
  //hold object and then push new array into tasks array
  let modifiedTasksObject = pushNewObjectToTasksArray(newTaskObject, tasksObject);
  writeToTerminal(filePath, modifiedTasksObject)
  //stringify tasks then write to jsonFile with new array added
  writingToJsonFile(modifiedTasksObject, filePath);
}

exports.add = (taskString, filePath) => {
  if(taskString){
     readAndParseData(filePath, taskString);
  } else {
    //eventually make a test to catch an error when no string entered
    return 'Error: must enter task';
  }
};


