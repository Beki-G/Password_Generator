//Password Criteria & Validation
function passwordCriteria(){
  //declaring variables
  var length = 0;
  var isSymbol = false;
  var isNumber = false;
  var isUpper = false;
  var isLower = false;
  var userChoices;

  //Length of Password
  length = parseInt(prompt("How long would you like your password to be? (Must be between 8 and 128 characters.)"));

  //Validation of length as a num & meets min/max length
  if(isNaN(length)){
    alert("Password length must be a numeric number.");
    return;
  }

  if (length<8 || length>129){
    alert("Password must be between 8-128 characters");
    return;
  }

  //User criteria of chars to use
  isLower = confirm("Click ok to include Lowercase letters, cancel to not include.");
  isUpper = confirm("Click ok to include Uppercase letters, cancel to not include.");
  isNumber = confirm("Click ok to include Numeric values, cancel to not include.");
  isSymbol = confirm("Click to include Special Character, cancel to not include.");

  //Validation of at least one char type
  if(isLower === false && isUpper === false && isSymbol === false && isNumber === false){
    alert("Must be at least one type of character");
    return;
  }

  //save choices to nested array/object
  userChoices = [{lower: isLower}, {upper: isUpper}, {symbol: isSymbol}, {number: isNumber}, {passLength: length}];

  //return array 
  return userChoices;
}


//Random Function Generators 
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNum,
  symbol: getRandomSymbol
}

function getRandomLower(){
  return String.fromCharCode(Math.floor(Math.random()* 26)+ 97);
}

function getRandomUpper(){
  return String.fromCharCode(Math.floor(Math.random()* 26)+ 65);
}

function getRandomNum(){
  return String.fromCharCode(Math.floor(Math.random()* 10)+ 48);
}

function getRandomSymbol(){
  const symbols = "!@#$%^&*(){},./"
  return symbols[Math.floor(Math.random() * symbols.length)];
}


//Generate Password Function
function generatePassword(){
  var choices;
  var typeCount=0;
  var newPass="";
 
  //collects user criteria
  choices = passwordCriteria();
  var length = choices[4].passLength;

  //write if statement to add one to type count.
  if (choices[0].lower){
    typeCount++;
  };

  if(choices[1].upper){
    typeCount++;
  };

  if(choices[2].symbol){
    typeCount++;
  };

  if(choices[3].number){
    typeCount++;
  };

  //make typeArr contain only true values based from user input
  const typeArr = [choices[0], choices[1], choices[2], choices[3]].filter(
    item => Object.values(item)[0]
  );

  //for loop that creates password
  for(var i =0; i<=length; i += typeCount){
    typeArr.forEach(type => {
      //getting the key of the object from typeArr
      const funcName =  Object.keys(type)[0];
      //goes through random funtion generator to get random char and append to growing string
      newPass += randomFunc[funcName]();
    });
  };
  
  //ensures password length is same as user input
  var finalPassword = newPass.slice(0, length);
 
  //return generated password
  return finalPassword;
}


// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
