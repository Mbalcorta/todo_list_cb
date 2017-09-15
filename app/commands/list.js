'use strict';
const fs = require('fs');
const path = require('path');

const filter = (arrayOfTasks) => {
  return arrayOfTasks.filter((listObject)=>{
    return listObject.incomplete;
  });
};

const readAndParseData = (jsonPath) => {
  let fileContents
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    if(err){
      throw err
    }
    runAfterRead(JSON.parse(data), jsonPath)
    return JSON.parse(data);
  });
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
const runAfterRead = (data, jsonPath) => {
  const arrayOfIncompleteTasks = filter(data.tasks);
  const tasksList = writeToFile(arrayOfIncompleteTasks, jsonPath);
  return tasksList;
}
exports.list = (jsonPath) => {
    readAndParseData(jsonPath);
};

