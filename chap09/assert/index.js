const assert = require('assert')
const { ADDRGETNETWORKPARAMS } = require('dns')
const { urlToHttpOptions } = require('url')
const Todo = require('./todo')
const todo = new Todo()
let testsCompleted = 0
//测试delete
function deleteTest() {
  todo.add('Delete Me')
  assert.equal(todo.length, 1, '1 item should exist')
  todo.deleteAll()
  assert.equal(todo.length, 0, 'No items should exist')
  testsCompleted++
}
//测试add
function addTest() {
  todo.deleteAll()
  todo.add('Added')
  assert.notEqual(todo.getLength(), 0, '1 item should exist')
  testsCompleted++
}
deleteTest(); 
addTest();