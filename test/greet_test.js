const assert = require('assert');
const Greet = require('../greet');
const pg = require("pg");
const Pool = pg.Pool;

// let newGreet = Greet();
//define a connection string to be able to connect to the database.
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/greetings';

const pool = new Pool({
  connectionString
});
let newGreet = Greet(pool);

describe('greeting widget', () => {
  // the Factory Function is called newGreet
  let newGreet = Greet(pool)
  beforeEach(async () => {
    // clean the tables before each test run
    await pool.query("delete from users;");
  });
  it('should pass the db test', async () => {});
  it('should return English and the name', async () => {
    // var newGreet = greetings();
    assert.equal('Hello, Anele', await newGreet.setEnteredName('English', 'Anele'));
  });
  it('should return IsiXhosa and the name', async () => {
    assert.equal('Molo, Andrew', await newGreet.setEnteredName('IsiXhosa', 'Andrew'));
  });
  it('should return Afrikaans and the name', async () => {
    // var newGreet = greetings();
    assert.equal('Goeie Dag, Nella', await newGreet.setEnteredName('Afrikaans', 'Nella'));
  });
  it('should be able to count two different names', async () => {
    //   var newGreet = greetings();
    //   newGreet.setEnteredName('English', 'Anele');
    //   newGreet.setEnteredName('Afrikaan', 'Zintle');
    // assert.deepEqual(2, newGreet.getEnteredNameCount());
  });
  it('counter should not increase if a user is greeted more than once ', async () => {
    // var newGreet = greetings();
    // newGreet.setEnteredName('English', 'Anele');
    // newGreet.setEnteredName('English', 'Anele');
    // newGreet.setEnteredName('Afrikaan', 'Zintle');
    // assert.deepEqual(2, newGreet.getEnteredNameCount());
  });
  it('should count the number of greet in IsiXhosa if name entered', async () => {
    // var newGreet = greetings();
    // newGreet.setEnteredName('IsiXhosa, Anele');
    // assert.deepEqual(1, newGreet.getEnteredNameCount());
  });
  it('should count the number of names regardless language selected', async () => {
    // var newGreet = greetings();
    // newGreet.setEnteredName('English', 'Anele');
    // newGreet.setEnteredName('IsiXhosa', 'Andrew');
    // newGreet.setEnteredName('Afrikaan', 'Zintle');
    // assert.deepEqual(3, newGreet.getEnteredNameCount());
  });
  it('should count names in the map', async () => {
    // var newGreet = greetings();
    // newGreet.setEnteredName('IsiXhosa', 'Anele');
    // newGreet.setEnteredName('English', 'Ace');
    // assert.deepEqual(newGreet.map(),{Anele: 0, Ace: 0
    // });
  });
  it('should not add name that already exists in the map', async () => {
    // var newGreet = greetings();
    // newGreet.setEnteredName('IsiXhosa', 'Anele');
    // newGreet.setEnteredName('English', 'Ace');
    // newGreet.setEnteredName('English', 'Ace');
    // assert.deepEqual(newGreet.map(),{Anele: 0, Ace: 0
    // });
  });
  after(() => {
    pool.end();
  })
});