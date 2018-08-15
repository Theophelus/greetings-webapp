module.exports = function(initialValue){
  var nameMap = {};
  var enteredName = '';
  //Everytime a namae is detacted the count
  if(initialValue){
    nameMap = initialValue;
  }
  ///////////////////CHECK IF USER EXISTS IF NOT ADD////////////////////////////
  //when the greet button is pressed check if this user was already greeted before
  //by looking if the userName exists in namesGreeted if not increment this counter and update the screen
  var setEnteredName = function( selectedLanguage, name){
    let language;
    if (name === null || name == '') {
      return 'Please enter a NAME in the text field..!';
    }else if(selectedLanguage){
       language = selectedLanguage;
    }else{
        return 'Please select one of the languages in one of the radio buttons..!';
    }
    
    
    if(name !==''){
      enteredName = name;
      if(nameMap[enteredName]=== undefined){
        //add an entry for the user that was greeted in the Object Map
        nameMap[enteredName] = 0;
    }
    ////////////////////CHECK TYPE OF LANGUAGE SELECTED AN GREET USER/////////////////
      if(language === 'English'){
        return 'Hello,' + ' ' + name;
      }

      if(language === 'IsiXhosa'){
        return 'Molo,' + ' ' + name;
      }

      if (language === 'Afrikaans') {
        return 'Goeie Dag,' + ' ' + name;
      }
      else{
        return '';
      }
    }
};
  ////////////////////////END TO CHECK IF THE USER EXIST////////////////////////////
  var getEnteredNameCount = function(){
    return Object.keys(nameMap).length;
  };
  var map = function(){
    return nameMap;
  };

  var resetData = function (){
    return nameMap == {};
  };
  return {
    setEnteredName,
    getEnteredNameCount,
    resetData,
    map,
    results: function(){
      return {
        enteredName
        // count
      };
    }
  };
};
