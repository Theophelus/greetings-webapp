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
    assert.equal('Hello, Anele', await newGreet.setEnteredName('English', 'Anele'));
  });
  it('should return IsiXhosa and the name', async () => {
    assert.equal('Molo, Andrew', await newGreet.setEnteredName('IsiXhosa', 'Andrew'));
  });
  it('should return Afrikaans and the name', async () => {
    assert.equal('Goeie Dag, Nella', await newGreet.setEnteredName('Afrikaans', 'Nella'));
  });
  it('should be able to count two different names', async () => {
    await newGreet.setEnteredName('English', 'Anele');
    await newGreet.setEnteredName('Afrikaan', 'Zintle');
    assert.strictEqual(2, await newGreet.getGreetedNames());
  });
  it('counter should not increase if a user is greeted more than once ', async () => {
    await newGreet.setEnteredName('English', 'Anele');
    await newGreet.setEnteredName('English', 'Anele');
    await newGreet.setEnteredName('Afrikaan', 'Zintle');
    assert.deepEqual(2, await newGreet.getGreetedNames());
  });
  it('should count the number of greet in IsiXhosa if name entered', async () => {
    await newGreet.setEnteredName('IsiXhosa', 'Anele');
    assert.deepEqual(1, await newGreet.getGreetedNames());
  });
  it('should count the number of names regardless language selected', async () => {
    await newGreet.setEnteredName('English', 'Anele');
    await newGreet.setEnteredName('IsiXhosa', 'Andrew');
    await newGreet.setEnteredName('Afrikaan', 'Zintle');

    assert.deepEqual(3, await newGreet.getGreetedNames());
  });
  it('should count names in the user tables in a DB', async () => {
    await newGreet.setEnteredName('English', 'Anele');
    await newGreet.setEnteredName('IsiXhosa', 'Andrew');
    await newGreet.setEnteredName('Afrikaan', 'Zintle');
    assert.deepEqual([{
      user_name: 'Anele'
    }, {
      user_name: 'Andrew'
    }, {
      user_name: 'Zintle'
    }], await newGreet.returnGreetedNames());
  });
  it('should not add name that already exists in the user table DB', async () => {
    await newGreet.setEnteredName('English', 'Anele');
    await newGreet.setEnteredName('English', 'Anele');
    await newGreet.setEnteredName('IsiXhosa', 'Andrew');
    await newGreet.setEnteredName('Afrikaan', 'Zintle');
    assert.deepEqual([{
      user_name: 'Anele'
    }, {
      user_name: 'Andrew'
    }, {
      user_name: 'Zintle'
    }], await newGreet.returnGreetedNames());
  });
  // });
  after(() => {
    pool.end();
  })
});