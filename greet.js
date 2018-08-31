module.exports = function (pool) {
  //Everytime a namae is detacted the count
  // if (pool) {
  //   checkUsersSQL = pool;
  // }
  ///////////////////CHECK IF USER EXISTS IF NOT ADD////////////////////////////
  //when the greet button is pressed check if this user was already greeted before
  //by looking if the userName exists in namesGreeted if not increment this counter and update the screen
  var setEnteredName = async function (language, enteredName) {
    if (language !== undefined && enteredName || enteredName !== '') {
      var checkUsersSQL = await pool.query('select * from users where user_name=$1', [enteredName]);;
      if (checkUsersSQL.rowCount === 0) {
        //if user then insert it to the DB using the insert query
        await pool.query('insert into users(user_name, user_count) values ($1, $2)', [enteredName, 0]);
      }
      await pool.query('update users set user_count = user_count + 1  where user_name = $1', [enteredName]);

      ////////////////////CHECK TYPE OF LANGUAGE SELECTED AN GREET USER/////////////////
      if (language === 'English') {
        return 'Hello,' + ' ' + enteredName;
      }
      if (language === 'IsiXhosa') {
        return 'Molo,' + ' ' + enteredName;
      }

      if (language === 'Afrikaans') {

        return 'Goeie Dag,' + ' ' + enteredName;
      } else {
        return '';
      }
    }
  };
  ////////////////////////END TO CHECK IF THE USER EXIST////////////////////////////
  var getGreetedNames = async function () {
    //define a varible to store a query to count users in the table
    let countUsersSQL = await pool.query('select * from users');
    return countUsersSQL.rowCount;
  };
  let returnGreetedNames = async function () {
    let greetedNamesSQL = await pool.query('select user_name from users');
    return greetedNamesSQL.rows;
  };
  let getNameCounter = async function (users) {
    let namesCountedSQL = await pool.query('select user_name, user_count from users where user_name = $1', [users]);
    return namesCountedSQL.rows[0];
  };
  let resetData = async function () {
    let deleteSQL = await pool.query('delete from users');
    return deleteSQL.rows[0];
  }
  return {
    getGreetedNames,
    setEnteredName,
    returnGreetedNames,
    getNameCounter,
    resetData
  };
};