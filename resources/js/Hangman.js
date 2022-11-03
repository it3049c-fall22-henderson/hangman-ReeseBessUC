class Hangman {
    
  constructor(_canvas) {
    if (!_canvas) {
      throw new Error(`invalid canvas provided`);
    }

    this.canvas = _canvas;
    this.ctx = this.canvas.getContext(`2d`);
  }

  /**
   * This function takes a difficulty string as a patameter
   * would use the Fetch API to get a random word from the Hangman
   * To get an easy word: https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=easy
   * To get an medium word: https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=medium
   * To get an hard word: https://hangman-micro-service-bpblrjerwh.now.sh?difficulty=hard
   * The results is a json object that looks like this:
   *    { word: "book" }
   * */
  getRandomWord(difficulty) {
      //let rWord = fetch(`http://hangman-micro-service.herokuapp.com/?difficulty=${difficulty}`);
      //WordDisplay( rWord.json() );
      
    
    return fetch(
      `http://hangman-micro-service.herokuapp.com/?difficulty=${difficulty}`
    )
      .then((r) => r.json())
      .then((r) => r.word);
  }
  
  

  /**
   *
   * @param {string} difficulty a difficulty string to be passed to the getRandomWord Function
   * @param {function} next callback function to be called after a word is reveived from the API.
   */
  start(difficulty, next) {
    // get word and set it to the class's this.word
    // clear canvas
    // draw base
    // reset this.guesses to empty array
    // reset this.isOver to false
    // reset this.didWin to false
  }

  /**
   *
   * @param {string} letter the guessed letter.
   */
  guess(letter) {
    // Check if nothing was provided and throw an error if so
    // Check for invalid cases (numbers, symbols, ...) throw an error if it is
    // Check if more than one letter was provided. throw an error if it is.
    // if it's a letter, convert it to lower case for consistency.
    // check if this.guesses includes the letter. Throw an error if it has been guessed already.
    // add the new letter to the guesses array.
    // check if the word includes the guessed letter:
    //    if it's is call checkWin()
    //    if it's not call onWrongGuess()
  }

  checkWin() {
    // using the word and the guesses array, figure out how many remaining unknowns.
    // if zero, set both didWin, and isOver to true
  }

  /**
   * Based on the number of wrong guesses, this function would determine and call the appropriate drawing function
   * drawHead, drawBody, drawRightArm, drawLeftArm, drawRightLeg, or drawLeftLeg.
   * if the number wrong guesses is 6, then also set isOver to true and didWin to false.
   */
  onWrongGuess() {}

  /**
   * This function will return a string of the word placeholder
   * It will have underscores in the correct number and places of the unguessed letters.
   * i.e.: if the word is BOOK, and the letter O has been guessed, this would return _ O O _
   */
  getWordHolderText() {
    return;
  }

  /**
   * This function returns a string of all the previous guesses, seperated by a comma
   * This would return something that looks like
   * (Guesses: A, B, C)
   * Hint: use the Array.prototype.join method.
   */
  getGuessesText() {
    return ``;
  }

  /**
   * Clears the canvas
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws the hangman base
   */
  drawBase() {
    this.ctx.strokeStyle = '#444';
    this.ctx.lineWidth = 10; 
    this.ctx.beginPath();
    this.ctx.moveTo(175, 225);
    this.ctx.lineTo(5, 225);
    this.ctx.moveTo(40, 225);
    this.ctx.lineTo(25, 5);
    this.ctx.lineTo(100, 5);
    this.ctx.lineTo(100, 25);
    this.ctx.stroke();
  }

  drawHead() {
    this.ctx.lineWidth = 5;
    this.ctx.beginPath();
    this.ctx.arc(100, 50, 25, 0, Math.PI*2, true);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  drawBody() {
    this.ctx.beginPath();
    this.ctx.moveTo(100, 75);
    this.ctx.lineTo(100, 140);
    this.ctx.stroke();
  }

  drawLeftArm() {
    this.ctx.beginPath();
    this.ctx.moveTo(100, 85);
    this.ctx.lineTo(140, 100);
    this.ctx.stroke();
  }

  drawRightArm() {
    this.ctx.beginPath();
    this.ctx.moveTo(100, 85);
    this.ctx.lineTo(60, 100);
    this.ctx.stroke();
  }

  drawLeftLeg() {
    this.ctx.beginPath();
    this.ctx.moveTo(100, 140);
    this.ctx.lineTo(125, 190);
    this.ctx.stroke();
  }

  drawRightLeg() {
    this.ctx.beginPath();
    this.ctx.moveTo(100, 140);
    this.ctx.lineTo(80, 190);
    this.ctx.stroke();
  }
  
  drawLeftFoot() {
    this.ctx.beginPath();
    this.ctx.moveTo(122, 190);
    this.ctx.lineTo(135, 185);
    this.ctx.stroke();
  }
  
  drawRightFoot() {
    this.ctx.beginPath();
    this.ctx.moveTo(82, 190);
    this.ctx.lineTo(70, 185);
    this.ctx.stroke();
  }
  
  drawHangman(part) {
      
      switch (part) {
      case 1:
        this.drawBase();
        break;

      case 2:
        this.drawHead();
        break;
      
      case 3:
        this.drawBody();
        break;

      case 4:
        this.drawRightArm();
        break;

      case 5:
        this.drawLeftArm();
        break;

      case 6:
        this.drawRightLeg();
        break;

      case 7:
         this.drawRightFoot();
      break;

      case 8:
        this.drawLeftLeg();
      break;

      case 9:
         this.drawLeftFoot();
      break;
   } 
  }
}
