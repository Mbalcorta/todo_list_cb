'use strict';
const fs = require('fs');
const path = require('path');
const {readAndParseData} = require('../../taskStore.js')

const filter = (arrayOfTasks) => {
  return arrayOfTasks.filter((listObject)=>{
    return listObject.incomplete;
  });
};

const writeToTerminal = (arrayOfTasksObjects, jsonPath) => {

    if(jsonPath === path.resolve(__dirname, '../tasks.json')){
      process.stdout.write('ID Description\n');
      process.stdout.write('-- -------------\n');
      arrayOfTasksObjects.forEach((eachObject) => {
          process.stdout.write(`${eachObject.id} ${eachObject.description}\n`);
      });
      let taskVariable;
      arrayOfTasksObjects.length === 1 ? taskVariable = 'task' : taskVariable = 'tasks'
      process.stdout.write(`\nYou have ${arrayOfTasksObjects.length} ${taskVariable}\n`);
  }
  //  return stringValue;
};

const runAfterRead = (data, jsonPath) => {
  const tasksList = writeToTerminal(filter(data.tasks), jsonPath);
  return tasksList;
}

exports.list = (jsonPath) => {
    readAndParseData(jsonPath, runAfterRead);
};

