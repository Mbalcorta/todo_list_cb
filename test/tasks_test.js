const assert = require('chai').assert;
const fs = require('fs');
const {add, complete, deleted, list, path} = require('../app/tasks.js');
const jsonTestFile =
path.resolve( __dirname,'./test_json.json');
// const jsonFile = path.resolve( __dirname,'./test_json.json');

describe('Add:',function(){
  describe('When one task is added', function(){

    before(function(done){
        fs.writeFile(jsonTestFile, '{"tasks":[]}', function(err){
          if(err) throw err
          add('Buy Milk', jsonTestFile, function(){
          done()
          });
        });
     });

    it('should contain json element', function(done) {
      fs.readFile(jsonTestFile, 'utf8', function(err, data){
           if(err) throw err
             assert.equal(data ,'{"tasks":[{"id":1,"description":"Buy Milk","incomplete":true}]}');
            done()
          });
      });
  });

  describe('When four tasks are added', function(){
    before(function(done){
      fs.writeFile(jsonTestFile, '{"tasks":[]}', function(err){
        if(err) throw err
        add('Buy Eggs', jsonTestFile, function(){
          add('Buy Milk', jsonTestFile, function(){
            add('Walk dogs', jsonTestFile, function(){
              add('Read to baby', jsonTestFile, function(){
                done()
              });
            });
          });
        });
      });
    });
    it('should contain four tasks objects', function(done){
      fs.readFile(jsonTestFile, 'utf8', function(err, data) {
         assert.equal(JSON.parse(data).tasks.length, 4);
        done()
      });
    });
  });

  describe('When one task is added when passed as argument', function(){
    before(function(done){
      fs.writeFile(jsonTestFile, '{"tasks":[]}', function(err){
        if(err) throw err
        add('Buy eggs', jsonTestFile, function(){
          done()
        });
      });
    });

    it('it will create an object with a tasks array"', function(done){
        fs.readFile(jsonTestFile, 'utf8', function(err, data){
          if(err) throw err
          assert.equal(data, '{"tasks":[{"id":1,"description":"Buy eggs","incomplete":true}]}');
          done()
        })
    });
  });
  // describe('When two tasks added terminal', ()=> {
  //    let jsonObject;
  //   before(()=>{
  //     fs.writeFileSync(jsonTestFile, '{"tasks":[]}')
  //     add('Buy eggs', jsonTestFile);
  //     add('Buy milk', jsonTestFile);
  //     const fileContent = fs.readFileSync(jsonTestFile, 'utf8');
  //     jsonObject = JSON.parse(fileContent);
  //   });
  //   it('Third element to be accessed will be undefined', () => {
  //      assert.equal(jsonObject.tasks[3], undefined);
  //   });
  // })
});

// describe('list:',() => {
//
//   after(()=>{
//     fs.writeFileSync(jsonTestFile, '{"tasks":[]}');
//   });
//
//   describe('should return no list if no list in task list', () => {
//     before(()=> {
//       fs.writeFileSync(jsonTestFile, '{"tasks":[]}');
//     });
//     //checking before and after of print txt file
//     it('should print "You have 0 tasks" if no task', () => {
//          assert.equal(list(jsonTestFile), '\nYou have 0 tasks\n');
//     });
//   });
//
//
//   describe('should print out list of incomplete task to console if one item added', () => {
//     before(()=> {
//       fs.writeFileSync(jsonTestFile, '{"tasks":[]}');
//        add('Buy Milk', jsonTestFile);
//     });
//
//     //checking before and after of print txt file
//     it('If one task is added should return list of task id and description', () => {
//          assert.equal(list(jsonTestFile), '1 Buy Milk\n\nYou have 1 task\n');
//       });
//   });
//
//   describe('should print out list of incomplete tasks to console if many items added', () => {
//     before(()=> {
//       fs.writeFileSync(jsonTestFile, '{"tasks":[]}');
//        add('Buy Milk', jsonTestFile);
//        add('Take dogs on walk', jsonTestFile);
//        add('Go for a bike ride', jsonTestFile);
//        add('Take baby to beach', jsonTestFile);
//     });
//
//     //checking before and after of print txt file
//     it('If multiple tasks it should print to terminal list of id and description', () => {
//          assert.equal(list(jsonTestFile), '1 Buy Milk\n2 Take dogs on walk\n3 Go for a bike ride\n4 Take baby to beach\n\nYou have 4 tasks\n');
//       });
//   });
//
//   describe('If one task is incomplete and another complete', () => {
//
//     before(()=> {
//       fs.writeFileSync(jsonTestFile, '{"tasks":[{"id":1,"description":"Buy eggs","incomplete":false}]}');
//        add('Buy Milk', jsonTestFile);
//     });
//
//     //checking before and after of print txt file
//     it('should only print incomplete task', () => {
//         assert.equal(list(jsonTestFile), '2 Buy Milk\n\nYou have 1 task\n');
//     });
//   })
// });
//
// describe('Tasks completed: ',() => {
//   describe('When task marked as completed', () => {
//     before(()=>{
//       fs.writeFileSync(jsonTestFile, '{"tasks":[]}');
//       add('Buy Milk', jsonTestFile);
//       add('Go for a walk', jsonTestFile);
//       add('Build a fence', jsonTestFile);
//     });
//
//     it("will print, Completed tasks 1: 'Buy Milk'", () => {
//       assert.equal(complete(1, jsonTestFile), 'Completed tasks 1: \'Buy Milk\'\n');
//     });
//   })
//
//   describe('When no tasks available', () => {
//     before(()=>{
//       fs.writeFileSync(jsonTestFile, '{"tasks":[]}');
//     });
//
//     it("will print You have 0 tasks when no tasks available ", () => {
//       assert.equal(complete(1, jsonTestFile), 'You have 0 tasks\n');
//     });
//   })
// });
//
//
// describe('Tasks deleted: ',() => {
//   describe('When task marked as deleted', () => {
//     before(()=>{
//       fs.writeFileSync(jsonTestFile, '{"tasks":[]}');
//       add('Buy Milk', jsonTestFile);
//       add('Go for a walk', jsonTestFile);
//       add('Build a fence', jsonTestFile);
//     });
//
//     it("will print, Deleted tasks 1: 'Buy Milk'", () => {
//       assert.equal(deleted(1, jsonTestFile), 'Deleted tasks 1: \'Buy Milk\'\n');
//     });
//   })
//
//   describe('When no tasks available', () => {
//     before(()=>{
//       fs.writeFileSync(jsonTestFile, '{"tasks":[]}');
//     });
//
//     it("will print You have 0 tasks when no tasks available ", () => {
//       assert.equal(deleted(1, jsonTestFile), 'You have 0 tasks\n');
//     });
//   })
// });