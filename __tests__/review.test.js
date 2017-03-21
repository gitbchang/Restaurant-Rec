// __tests__/user-test.js
jest.mock('/api/review/1');

// import * as user from '../user';
var userTest = require('../__mocks__/testData');
// const sum = require('../__mocks__/sum');


// The promise that is being tested should be returned.
it('works with promises', () => {
  return userTest.getUserName(5)
    .then(name => expect(name).toEqual('Paul'));
});