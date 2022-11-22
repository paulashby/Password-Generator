var MIN_PW_LENGTH = 10;
var MAX_PW_LENGTH = 64;

// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Use composition to make object we can traverse to determine user preferences
var characterTypeChoices = {
  lowercase: lowerCasedCharacters,
  uppercase: upperCasedCharacters,
  numeric: numericCharacters,
  special: specialCharacters
};

// Function to prompt user for password options
function getPasswordOptions() {

  var options = {
    pwLength: 0,
    characterTypes: []
  };
  
  options.pwLength = prompt("Please enter a password length between " + MIN_PW_LENGTH + " and " + MAX_PW_LENGTH + " characters.");

  if (options.pwLength === null) {
    return;
  }

  if (options.pwLength < MIN_PW_LENGTH || options.pwLength > MAX_PW_LENGTH) {
    alert ("Password length must be at least " + MIN_PW_LENGTH + " and no more than " + MAX_PW_LENGTH + " characters.");
    return getPasswordOptions();
  } 

  // Keep prompting for characterTypes if none have been chosen
  while (options.characterTypes.length < 1) {
    // Iterate through choices and prompt user to determine whether each should be included 
    for (var charType in characterTypeChoices) {
      if (Object.hasOwn(characterTypeChoices, charType)) {
        // Prompt user to accept or reject character set
        var userinput = prompt("Include " + charType + " characters? Enter 'y' to accept or any other key to reject.");
        
        switch (userinput) {
          case null:
            // User cancelled the operation
            return null;

          case "y":
            options.characterTypes.push(characterTypeChoices[charType]);
            break;

          default:
            break;
        }
      }
    }
    if (options.characterTypes.length === 0) {
      alert("You must include at least one set of characters - please OK an option.");
    }
  }
  return options;
}

// Function for getting a random element from an array
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Function to generate password with user input
function generatePassword() {
  // Get user's preferences - length and character types
  var options = getPasswordOptions();
  var password = "";
  
  if (options) {    
    for (var i = 0; i < options.pwLength; i++) {
      // Select a random character set
      var charSet = getRandom(options.characterTypes);
      // Select a random character and add to password
      password = password.concat(getRandom(charSet));
    }
    return password;
  }
  // User cancelled the operation
  return null;
}

// Get reference to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  
  // Build the password
  var password = generatePassword();

  if (password) {
    // Get reference to the #password textarea
    var passwordText = document.querySelector('#password');
    
    // Update the #password textarea to display the new password
    passwordText.value = password;
  }
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);