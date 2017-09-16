'use strict';
const fs = require('fs');
const path = require('path');
const {readAndParseData} = require('../../taskStore.js')

const incompleteObjects = (tasksObject) => {
  return tasksObject.tasks.filter((listObject)=>{
    return listObject.incomplete;
  });
};

const writeToTerminal = (data, jsonPath) => {
    const arrayOfTasksObjects = incompleteObjects(data);
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
};

exports.list = (jsonPath) => {
    readAndParseData(jsonPath, writeToTerminal);
};

