'use strict';
const fs = require('fs');
const path = require('path');
const {readAndParseData, writingToJsonFile} = require('../../taskStore.js')

exports.add = (taskString, filePath, callback) => {
  if(taskString){
    readAndParseData(filePath, (err, data) => {
      data.tasks.push({id: data.tasks.length+1, description: taskString, incomplete: true})
      writingToJsonFile(filePath, data, function(err){
          if(err){
            throw err
          }
        if(filePath === path.resolve(__dirname, '../tasks.json')){
          process.stdout.write(`Created task ${data.tasks.length}\n`);
        }
          callback()
        })
      })
  } else {
    //eventually make a test to catch an error when no string entered
    throw new Error('Error: must enter task\n') ;
  }
};
