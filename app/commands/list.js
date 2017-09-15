'use strict';
const fs = require('fs');
const path = require('path');

const filter = (arrayOfTasks) => {
  return arrayOfTasks.filter((listObject)=>{
    return listObject.incomplete;
  });
};

const readAndParseData = (jsonPath) => {
  const fileContents = fs.readFileSync(jsonPath, 'utf8');
  return JSON.parse(fileContents);
};

const writeToFile = (arrayOfTasksObjects, jsonPath) => {
  let stringValue ='';
  let taskVariable;
  arrayOfTasksObjects.forEach((eachObject)=>{
    stringValue += `${eachObject.id} ${eachObject.description}\n`;
  });
  arrayOfTasksObjects.length === 1 ? taskVariable = 'task' : taskVariable = 'tasks'

  stringValue += `\nYou have ${arrayOfTasksObjects.length} ${taskVariable}\n`;
    if(jsonPath === path.resolve(__dirname, '../tasks.json')){
      process.stdout.write(stringValue);
  }
   return stringValue;
};

exports.list = (jsonPath) => {
    const jsonTasks = readAndParseData(jsonPath);
    const arrayOfIncompleteTasks = filter(jsonTasks.tasks);
    const tasksList = writeToFile(arrayOfIncompleteTasks, jsonPath);
    return tasksList;
};