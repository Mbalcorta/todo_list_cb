const fs = require('fs');
const path = require('path');

const jsonPath = path.resolve( __dirname,'test/test_json.json');
const readAndParseData = (jsonPath, callback) => {
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    if(err){
      return callback(err)
    }
    callback(null, JSON.parse(data))
  });
};

readAndParseData(jsonPath, function(error, data){
  if(error){
    throw error
  }
})

const writingToJsonFile = (filePath,  modifiedTasksObject, callback) => {
  const stringObject = JSON.stringify(modifiedTasksObject);
  fs.writeFile(filePath, stringObject, (err) => {
    if(err) {
      return callback(err)
    }
    callback(null)
  });
};

module.exports = {readAndParseData, writingToJsonFile}