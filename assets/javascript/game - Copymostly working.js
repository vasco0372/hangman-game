//script for psychic game//
var numWins=0;
var numLosses=0;
var wordDisplay="-"
var guessesLeft=9;
var yourGuesses=[];
var userGuess="";
var userWord="";
//print initial variables//
var words=["first", "second", "third", "fourth", "fifth"];

var randomNumber=0;
var computerChoice="";

var displayResults=function(){
	document.getElementById("wins").innerHTML="Wins: "+ numWins;
	document.getElementById("losses").innerHTML="Losses: "+ numLosses;
	document.getElementById("currentWord").innerHTML="Current Word: "+ wordDisplay;
	document.getElementById("guessesRemaining").innerHTML="Guesses Remaining: "+ guessesLeft;
	document.getElementById("yourGuesses").innerHTML="Letters Already Guessed: "+ yourGuesses;
}
//function to reset values
function reset(){
	yourGuesses=[];
	guessesLeft=9;
	computerGuess();
	displayBlanks();
	displayResults();
}

//generate a computer guessed letter//
computerGuess=function(){
	randomNumber=Math.floor(Math.random()*5);
	computerChoice=words[randomNumber];
	console.log("computer choice " + computerChoice);
	return(computerChoice);
}

//display computer choice with "_"
function displayBlanks(){
	var wordLength=computerChoice.length; 
	wordDisplay=[];
 	for (var i=0; i<wordLength; i++){
 		wordDisplay.push("_");
 	}
 	return (wordDisplay);
}
 	
//display initial variables//
computerGuess();
displayBlanks();
displayResults();


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
	}
	//convert the userword from array to a string and remove ","//
	var tempWord=wordDisplay.join();
	userWord=tempWord.replace(/\,/g,"");
	// console.log("updated display "+ wordDisplay);
	guessesLeft--;
	displayResults();		

	if(userWord===computerChoice){
		console.log(wordDisplay);
		displayResults();
		alert("You Win! Guessing new word!");
		numWins++;
		reset();
	}

	if(guessesLeft<1){
		numLosses++;
		displayResults();
		alert("You lost.  Restarting game");
		reset();
	}	
}
