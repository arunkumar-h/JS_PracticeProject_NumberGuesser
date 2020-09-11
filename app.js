/*
GAME FUNCTION:
- Player must guess a number between min and max
- Player gets a certain number of guesser
- Notify player regarding remaining guesses
- Notify player about the correct answer if he loses
- Let player choose to play again
*/

//Game values var declaration
let min = 1, 
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');

//Assign min and max value into span
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

//Listen for guess
guessBtn.addEventListener('click', function(){
    let guessValue = parseInt(guessInput.value);

    
    //Validate  
    if(isNaN(guessValue) || guessValue < min || guessValue > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    if(!isNaN(guessValue)){
        //Check if the guess is equal to winning number
        if(guessValue === winningNum){
            //GAME OVER - Won
            gameOver(true, `${winningNum} is correct, YOU WIN!`, 'green');
        }else{
            //Wrong number
            guessesLeft -= 1;
            
            if(guessesLeft === 0){
                //GAME OVER - Lost
                gameOver(false, `Game Over, you lost. The correct number was ${winningNum}.`)
            }else{
                
                //Clear the Input
                guessInput.value = '';
                //Border red
                guessInput.style.borderColor = 'red';
                //GAME Contine - answer wrong 
                setMessage(`${guessValue} is not correct, ${guessesLeft} guesses left.`, 'red');
            }
        }
    }
});

//Util method
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';
    //Disable input
    guessInput.disabled = true;
    //Border green
    guessInput.style.borderColor = color;
    //Set message
    setMessage(msg, color);

    //Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

//Get Winning number
function getRandomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Set Message - Util
function setMessage(msg, color){
    message.textContent = msg;
    message.style.color = color;
}
