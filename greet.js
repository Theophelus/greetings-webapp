module.exports = function (pool) {
  // var nameMap = {};
  // let greetedNames = [];
  var checkUsersSQL = '';
  //Everytime a namae is detacted the count
  // if (initialValue) {
  //   nameMap = initialValue;
  // }
  ///////////////////CHECK IF USER EXISTS IF NOT ADD////////////////////////////
  //when the greet button is pressed check if this user was already greeted before
  //by looking if the userName exists in namesGreeted if not increment this counter and update the screen
  var setEnteredName = async function (language, enteredName) {
    //define an object to store all the enteredName
    // if (enteredName === null || enteredName == '') {
    //   return 'Please enter a NAME in the text field..!';
    // } else if (selectedLanguage) {
    //   language = selectedLanguage;
    // } else {
    //   return 'Please select one of the languages in one of the radio buttons..!';
    // }
    // if (enteredName && enteredName !== '') {
    //   if (checkUsersSQL.rawCount == 0) {
    //     //if user then insert it to the DB using the insert query
    //     await pool.query('insert into users() values($1, $2)', [enteredName, 1]);
    //     //add an entry for the user that was greeted in the Object Map
    //     // nameMap[enteredName] = 0;
    //     // greetedNames.filter(function(element){});
    //     // greetedNames.push({
    //     //   enteredName: enteredName
    //     // });
    //   }
    if (enteredName && enteredName !== '') {
      checkUsersSQL = await pool.query('select * from users where user_name=$1', [enteredName]);
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
  let resetData = async function(){
    let deleteSQL = await pool.query('delete from users');
    return deleteSQL.rows;
  }
  return {
    getGreetedNames,
    setEnteredName,
    returnGreetedNames,
    getNameCounter,
    resetData
  };
};




