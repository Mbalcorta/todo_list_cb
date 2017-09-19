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
  describe('When two tasks added terminal', function(){
    before((done)=>{
      fs.writeFile(jsonTestFile, '{"tasks":[]}', function(err){
        if(err) throw err
        add('Buy eggs', jsonTestFile, function(){
          add('Buy milk', jsonTestFile, function(){
            done()
          });
        });
      });

    });
    it('Third element to be accessed will be undefined', (done) => {
      fs.readFile(jsonTestFile, 'utf8', function(err, data){
        if(err) throw err
        assert.equal(JSON.parse(data).tasks[3], undefined);
        done()
      });
    });
  });
});

describe('list:',() => {

  after(function(done){
    fs.writeFile(jsonTestFile, '{"tasks":[]}', function(err){
      if(err) throw err
      done()
    });
  });

  describe('should return no list if no list in task list', function(){
    before((done)=> {
      fs.writeFile(jsonTestFile, '{"tasks":[]}', function(err){
        if(err) throw err
        done()
      });
    });
    //checking before and after of print txt file
    it('should print "You have 0 tasks" if no task', function(done){
      list(jsonTestFile, function(err, data){
        assert.equal(data, '\nYou have 0 tasks\n');
        done()
      })
    });
  });

  describe('should print out list of incomplete task to console if one item added', function(err){
    before((done)=> {
      fs.writeFile(jsonTestFile, '{"tasks":[]}', function(err){
        if(err) throw err
        add('Buy Milk', jsonTestFile, function(){
          done()
        });
      });
    });

    //checking before and after of print txt file
    it('If one task is added should return list of task id and description', function(done){
        list(jsonTestFile, function(err, data){
          assert.equal(data, '1 Buy Milk\n\nYou have 1 task\n');
          done()
        });
      });
  });

  describe('should print out list of incomplete tasks to console if many items added', function(){
    before((done)=> {
      fs.writeFile(jsonTestFile, '{"tasks":[]}', function(err){
        if(err) throw err
        add('Buy Milk', jsonTestFile, function(){
          add('Take dogs on walk', jsonTestFile, function(){
            add('Go for a bike ride', jsonTestFile, function(){
              add('Take baby to beach', jsonTestFile, function(){
                done()
              });
            });
          });
        });
      });
    });
    //checking before and after of print txt file
    it('If multiple tasks it should print to terminal list of id and description', function(done){
      list(jsonTestFile, function(err, data){
        if(err) throw err
        assert.equal(data, '1 Buy Milk\n2 Take dogs on walk\n3 Go for a bike ride\n4 Take baby to beach\n\nYou have 4 tasks\n');
        done()
        })
      });
    });

  describe('If one task is incomplete and another complete', function() {
    before(function(done){
      fs.writeFile(jsonTestFile, '{"tasks":[{"id":1,"description":"Buy eggs","incomplete":false}]}', function(err){
        if(err) throw err
        add('Buy Milk', jsonTestFile, function(){
          done()
        });
      });

    });

    //checking before and after of print txt file
    it('should only print incomplete task', function(done){
      list(jsonTestFile, function(err, data){
        if(err) throw err
        assert.equal(data, '2 Buy Milk\n\nYou have 1 task\n');
        done()
      });
    });
  })
});

describe('Tasks completed: ',function(){
  describe('When task marked as completed', function(){
    before(function(done){
      fs.writeFile(jsonTestFile, '{"tasks":[]}', function(err){
        if(err) throw err
          add('Buy Milk', jsonTestFile, function(){
            add('Go for a walk', jsonTestFile, function(){
              add('Build a fence', jsonTestFile, function(){
                done()
              });
            });
          });
        });
      });

    it("will print, Completed tasks 1: 'Buy Milk'", function(done){
      complete(1, jsonTestFile, function(err, data){
        if(err) throw err
        assert.equal(data, 'Completed task 1: \'Buy Milk\'\n');
        done()
      });
    });
  });

  describe('When no tasks available', function(){
    before(function(done){
      fs.writeFile(jsonTestFile, '{"tasks":[]}', function(err){
        if(err) throw err
        done()
      });
    });

    it("will print You have 0 tasks when no tasks available ", function(done){
      complete(1, jsonTestFile, function(err, data){
        if(err) throw err
        assert.equal(data, 'You have 0 tasks\n');
        done()
      });
    });
  });
});


describe('Tasks deleted: ', function(){
  describe('When task marked as deleted', function(){
    before(function(done){
      fs.writeFile(jsonTestFile, '{"tasks":[]}', function(err){
        if(err) throw Error
          add('Buy Milk', jsonTestFile, function(){
            add('Go for a walk', jsonTestFile, function(){
              add('Build a fence', jsonTestFile, function(){
                done()
              });
            });
          });
        });
      });

    it("will print, Deleted tasks 1: 'Buy Milk'", function(done){
      deleted(1, jsonTestFile, function(err, data){
        if(err) throw err
        assert.equal(data, 'Deleted task 1: \'Buy Milk\'\n');
        done()
      });
    });
  });

  describe('When no tasks available', function(){
    before(function(done){
      fs.writeFile(jsonTestFile, '{"tasks":[]}', function(err){
        if(err) throw err
        done()
      });
    });

    it("will print You have 0 tasks when no tasks available ", function(done){
      deleted(1, jsonTestFile, function(err, data){
        if(err) throw err
        assert.equal(data, 'You have 0 tasks\n');
        done()
      });
    });
  });
});