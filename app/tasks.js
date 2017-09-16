#!/usr/bin/env node
'use strict';
const path = require('path');
const fs = require('fs');
const add = require('./commands/add.js').add;
const complete = require('./commands/complete.js').complete;
const deleted = require('./commands/delete.js').deleted;
const list = require('./commands/list.js').list;
const firstArgument = process.argv.slice(2)[0];
const taskString = process.argv.slice(3).join(' ');
const jsonPath = path.resolve(__dirname, './tasks.json');

//checks if specific file exist/ if not make file
fs.stat(jsonPath, (err) => {
    if(err){
      fs.writeFileSync(jsonPath, '{"tasks":[]}');
    }
    switch(firstArgument){
      case 'add':
        try {
          add(taskString, jsonPath);
        } catch(e){
            process.stderr.write(e.message)
        }
        break;
      case 'complete':
        try{
          complete(taskString, jsonPath);
        } catch(e){
          process.stderr.write(e.message)
        }
        break;
      case 'delete':
        deleted(taskString, jsonPath);
        break;
      case 'list':
        list(jsonPath);
        break;
      default:
        console.log('Error: not a correct command, please try again');
    }
  });

module.exports = {add, complete, deleted, list, jsonPath, path}