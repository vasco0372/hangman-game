//script for psychic game//
var numWins=0;
var numLosses=0;
var currentWord="-"
var guessesLeft=9;
var yourGuesses=[];
var userGuess="";
var userWord="";
//print initial variables//

var displayResults=function(){
	document.getElementById("wins").innerHTML="Wins: "+ numWins;
	document.getElementById("losses").innerHTML="Losses: "+ numLosses;
	document.getElementById("currentWord").innerHTML="Current Word: "+ wordDisplay;
	document.getElementById("guessesRemaining").innerHTML="Guesses Remaining: "+ guessesLeft;
	document.getElementById("yourGuesses").innerHTML="Letters Already Guessed: "+ yourGuesses;
}

var words=["first", "second", "third", "fourth", "fifth"];

var randomNumber=0;
var computerChoice="";
	//generate a computer guessed letter//
computerGuess=function(){
	randomNumber=Math.floor(Math.random()*5);
	computerChoice=words[randomNumber];
	console.log("computer choice " + computerChoice);
	return(computerChoice);
 	}
computerGuess();
 	   // console.log(computerChoice);
 	//display computer choice with "_"
var wordLength=computerChoice.length;
 		// var wordDisplay=Array(wordLength+1).join("_ ");
 function displayBlanks(){
 	wordDisplay=[];
 		for (var i=0; i<wordLength; i++){
 			wordDisplay.push("_");
 		}
//update display//
 	displayResults();
 	}

 //display blank word//	
 displayBlanks();


	//get user input letter//
document.onkeydown=function(event){
	userGuess=event.key;
	yourGuesses.push(userGuess);
			
	//check if the letter is in word//
	for (char in computerChoice){

		if (computerChoice[char] == userGuess){
	//add letters guessed by user in the right location//
			wordDisplay[char]=userGuess;
		}
	//update display
	}
	//convert the userword from array to a string and remove ","//
	var tempWord=wordDisplay.join();
	userWord=tempWord.replace(/\,/g,"");
	console.log("updated display "+ wordDisplay);
	
	// update gueses left//
	guessesLeft--;
	displayResults();
			
	function reset(){
		yourGuesses=[];
		guessesLeft=9;
		displayResults();
		computerGuess();
		displayBlanks();
	}
	
	if(userWord===computerChoice){
		console.log("You Win! Guessing new word!");
		numWins++;
		//reset game//
		reset();
		}


		// else{
		// 	// alert("Guess again");
		// 	if(guessesLeft<1){
		// 		alert("You lost.  Restarting game");
		// 		numLosses++;
		// 		guessesLeft=9;
		// 		yourGuesses=[];
		// 		printResults();
		// 		computerGuess();
		// 	}
		// }
	}