// START + DIFFICULTY SELECTION
const startWrapper = document.getElementById(`startWrapper`);
const difficultySelectForm = document.getElementById(`difficultySelect`);
const difficultySelect = document.getElementById(`difficulty`);

// GAME
const gameWrapper = document.getElementById(`gameWrapper`);
const guessesText = document.getElementById(`guesses`);
const wordHolderText = document.getElementById(`wordHolder`);

// GUESSING FORM
const guessForm = document.getElementById(`guessForm`);
const guessInput = document.getElementById(`guessInput`);

// GAME RESET BUTTON
const resetGame = document.getElementById(`resetGame`);

// CANVAS
let canvas = document.getElementById(`hangmanCanvas`);

let h = new Hangman( canvas );
let word = "";
let apiWords = [];
let wrongWords = [];
let correctWords = [];
let wordCount = 0;
let errorGuess = false;

// The following Try-Catch Block will catch the errors thrown
try {
  // Instantiate a game Object using the Hangman class.

  // add a submit Event Listener for the to the difficultySelectionForm
  //    get the difficulty input
  //    call the game start() method, the callback function should do the following
  //       1. hide the startWrapper
  //       2. show the gameWrapper
  //       3. call the game getWordHolderText and set it to the wordHolderText
  //       4. call the game getGuessessText and set it to the guessesText
  difficultySelectForm.addEventListener(`submit`, function (event) {
      event.preventDefault();
      
      let word = h.getRandomWord(difficultySelect.value);
      word.then((result) => {
          initGame(result);
      });
      
      //console.log( word_json );
      //console.log('aaaaa');
  });

  // add a submit Event Listener to the guessForm
  //    get the guess input
  //    call the game guess() method
  //    set the wordHolderText to the game.getHolderText
  //    set the guessesText to the game.getGuessesText
  //    clear the guess input field
  // Given the Guess Function calls either the checkWin or the onWrongGuess methods
  // the value of the isOver and didWin would change after calling the guess() function.
  // Check if the game isOver:
  //      1. disable the guessInput
  //      2. disable the guessButton
  //      3. show the resetGame button
  // if the game is won or lost, show an alert.
  guessForm.addEventListener(`submit`, function (e) {
      e.preventDefault();
      
      var valueEntered = guessInput.value.toLowerCase();
      guessInput.value = "";
      
      
      let isThere = apiWords.includes( valueEntered );
      
      if (isThere)
      {
          guessesText.innerHTML += "<span class='correctWord'>" + valueEntered + "</span> ";
          
          correctWords.push( valueEntered );
          fillHolder( valueEntered );
      }
      else
      {
          guessesText.innerHTML += "<span class='wrongWord'>" + valueEntered + "</span> ";
          
          wrongWords.push( valueEntered );
          h.drawHangman( wrongWords.length );
      }
      
      var correctWordsCount = correctWords.length;
      var wrongWordsCount = wrongWords.length;
      
      if (parseInt(wrongWordsCount) == wordCount)
      {
          if (errorGuess === true)
          {
              for (var e = wrongWords.length; e<=9; e++)
              {
                  h.drawHangman( e );
              }
              alert("Failed");
          }
      }
      
  });

  // add a click Event Listener to the resetGame button
  //    show the startWrapper
  //    hide the gameWrapper
  resetGame.addEventListener(`click`, function (e) {});
} catch (error) {
  console.error(error);
  alert(error);
}

function initGame(w) {
    h.clearCanvas();
    wordHolder.innerHTML = '';
    
    wrongWords = [];
    correctWords = [];
    wordCount = 0;
    errorGuess = false;
    
    console.log('word is: ' + w);
    word = w;
    apiWords = word.split('');
    console.log(apiWords);
    wordCount = apiWords.length;
    
    fillHolder('');
    
    gameWrapper.classList.remove("hidden");
}

function fillHolder(chr) {
    
    var wordHolderHtml = '';
    var innerError = false;
    
    for (var i = 0; i < apiWords.length; i++) 
    {
        
        //if (i%2 == 0 || word.charAt(i) == chr)
        if (correctWords.includes( word.charAt(i) ) === true)
        {
            wordHolderHtml += ' ' + word.charAt(i) + ' ';
            //errorGuess = false;
        }
        else
        {
            wordHolderHtml += " _ ";
            errorGuess = true;
            innerError = true;
        }
        
    }
        
    //w = w.replace(/[a-z]/gi, '_ ');
    wordHolder.innerHTML = wordHolderHtml;
    
    if (!innerError)
    {
        errorGuess = false;
        alert("Success!!");
    }
}