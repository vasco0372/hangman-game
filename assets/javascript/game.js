//script for psychic game//
var numWins=0;
var numLosses=0;
var wordDisplay=[];
var guessesLeft=15;
var yourGuesses=[];
var userGuess="";
var userWord="";
var matchLetter=false;
//print initial variables//
var words=["sentinel", "nebuchandnessar", "neo", "zion","trinity", "smith", "morpheus", "metacortex", "cypher", "oracle"]

var randomNumber=0;
var computerChoice="";
var message="";
//sounds//
var freeYourMind = new Audio('assets/sounds/freeYourMind.mp3');
var winGame = new Audio('assets/sounds/winGame.mp3');
var loseGame = new Audio('assets/sounds/loseGame.mp3');
var correctLetter = new Audio('assets/sounds/correctLetter.mp3');
var wrongLetter= new Audio('assets/sounds/wrongLetter.mp3');

//Give the Audio element a stop function
HTMLAudioElement.prototype.stop = function()
{
    this.pause();
    this.currentTime = 0.0;
}

var displayResults=function(){
	// console.log(wordDisplay);
	document.getElementById("wins").innerHTML="Wins: "+ numWins;
	document.getElementById("losses").innerHTML="Losses: "+ numLosses;
	document.getElementById("currentWord").innerHTML="Current Word: "+ wordDisplay;
	document.getElementById("guessesRemaining").innerHTML="Guesses Remaining: "+ guessesLeft;
	document.getElementById("yourGuesses").innerHTML="Letters Already Guessed: "+ yourGuesses;
	document.getElementById("banner").innerHTML= "Message: " + message;
	return;
}

//generate a computer guessed letter//
computerGuess=function(){
	randomNumber=Math.floor(Math.random()*words.length);
	computerChoice=words[randomNumber];
	console.log("computer choice " + computerChoice);
	return;
}

//display computer choice with "_"
function displayWord(){
	var wordLength=computerChoice.length; 
	wordDisplay=[];
 	for (var i=0; i<wordLength; i++){
 		wordDisplay.push("_");
 	}
 	return;
}

//reset//function to reset values after one round play win or loss//
function reset(){
	yourGuesses=[];
	guessesLeft=15;
	computerGuess();
	displayWord();
	message="";
	// displayResults();
	return;
}

//Main program.  Here is the main program//
// function mainProgram(){
	//display initial values for game//
	message="Press a letter to play!"
	computerGuess();
	displayWord();
	displayResults();

	//get user input letter//
	document.onkeydown=function(event){

		userGuess=event.key;
		//stop all other sounds//
		winGame.stop();
		loseGame.stop();
		correctLetter.stop();
		wrongLetter.stop();
		freeYourMind.play();		
		//check if the letter is in word//
		for (char in computerChoice){
			if (computerChoice[char] == userGuess){
			//add letters guessed by user in the right location//
				wordDisplay[char]=userGuess;
				matchLetter=true;
				correctLetter.play();
				message="Good Guess!"
			}
		}
		var position = computerChoice.indexOf(userGuess);
		console.log(position)

		if(position<0){
			wrongLetter.play();
			message="Bad Guess!"
		}

		// check if the letter is pressed already; if not reduce guesses remaining and update display
		var alreadyPressed=false;
		var myArray = yourGuesses;
		var mySet = new Set(myArray);
		var alreadyPressed = mySet.has(userGuess); // true
		if (!alreadyPressed){
			yourGuesses.push(userGuess);
			guessesLeft--;
			displayResults();	
		};

		//convert the userword from array to a string and remove ","//
		var tempWord=wordDisplay.join();
		userWord=tempWord.replace(/\,/g,"");

		//when all letters are guessed display message and updated results//
		if(userWord==computerChoice){
			// alert("You Win! The correct word is "+ wordDisplay +". Guessing new word!");
		 	numWins++;
		 	message="You Win! Press a letter to play again";
		 	displayResults();
			freeYourMind.stop();
			winGame.play();
		 	reset();
		 	// mainProgram();

		}
		// 15 guesses are exceeded //
		if(guessesLeft<1){
			numLosses++;
			// alert("You lost.  The correct word is '"+ computerChoice +"'. Guessing new word.");
			message="You Lost! Press a letter to play again";
			displayResults();
			freeYourMind.stop();
			loseGame.play();
			reset();
			// mainProgram();
		}
	}
// }