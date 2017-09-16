const fs = require('fs');

const readAndParseData = (jsonPath, callback, taskString) => {
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    if(err){
      throw err
    }
    callback(JSON.parse(data), jsonPath, taskString)
    // return JSON.parse(data);
  });
};

const writingToJsonFile = ( modifiedTasksObject, filePath) => {
  const stringObject = JSON.stringify(modifiedTasksObject);
  fs.writeFile(filePath, stringObject, (err) => {
    if(err) throw err
    // return stringObject;
  });
};

module.exports = {readAndParseData, writingToJsonFile}