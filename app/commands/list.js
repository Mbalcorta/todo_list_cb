'use strict';
const fs = require('fs');
const path = require('path');
const {readAndParseData} = require('../../taskStore.js')

exports.list = (jsonPath, callback) => {
  if(jsonPath){
    readAndParseData(jsonPath, (err, data) => {
      const arrayOfTasksObjects = data.tasks.filter((data) => {
        return data.incomplete;
      });
      let terminalString ='';
      let taskVariable;
      arrayOfTasksObjects.length === 1 ? taskVariable = 'task' : taskVariable = 'tasks'
      arrayOfTasksObjects.forEach((eachObject) => {
        terminalString += `${eachObject.id} ${eachObject.description}\n`
      });

      if(jsonPath === path.resolve(__dirname, '../tasks.json')){
        process.stdout.write('ID Description\n');
        process.stdout.write('-- -------------\n');
        arrayOfTasksObjects.forEach((eachObject) => {
          process.stdout.write(`${eachObject.id} ${eachObject.description}\n`);
        });
        process.stdout.write(`\nYou have ${arrayOfTasksObjects.length} ${taskVariable}\n`);
      }
      terminalString += `\nYou have ${arrayOfTasksObjects.length} ${taskVariable}\n`
      callback(err, terminalString);
    });
  } else {
    throw new Error('Cannot find file\n')
  }
};

