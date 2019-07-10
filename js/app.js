const qwerty = document.querySelector("#qwerty");
let phrase = document.querySelector("#phrase");
let missed =  0;
const reset = document.querySelector(".btn__reset");
const startScreen = document.querySelector(".start");
let myPhrase ;
const phrases = [
"Knowledge comes but wisdom lingers",
"In the end everything is a gag",
"Fortune favors the brave",
"A joke is a very serious thing",
"Where there is love there is life"
];
const ul = document.querySelector("ul");
let listItems = [];
let guessedListItems = [];
let letterArray = [];
const overlay = document.querySelector("#overlay");
const buttons = document.querySelectorAll("button");
const hearts = document.querySelectorAll(".tries");
const h2 =  document.querySelector("h2");

//removes initial display screen
reset.addEventListener("click", () => {
	startScreen.style.display = "none";
});

function getRandomPhraseAsArray (arr) {
	//picks random number from 0-4 for array index
 	let num = Math.floor(5 * Math.random());
 	//splits that string of specified index into array of letters
 	myPhrase =  arr[num].split("");
 	console.log(myPhrase);
 	//returns that new array of letters in a variable called myPhrase
 	return myPhrase;
}

function addPhraseToDisplay(myPhrase){
  for (let i = 0 ; i < myPhrase.length ; i++ ){
  	//creates a new list item  elemetn
  	const li = document.createElement("li");
//for each letter/index in array, a new list item is created
  	li.textContent += myPhrase[i];
  	//appends those elements to the ul
  	   ul.appendChild(li);
  	   listItems.push(li);
  	  // if the letter at index "i" is an empty string, " " 
  	  // give it the specified class
  	 if (myPhrase[i] == " "){
  	  	 li.classList.add("space");
  	   	 //if element is a ., no class
  	 	//change this to regex to filter out .
  	 } else if (myPhrase[i] == "." || myPhrase[i] == ","){
  	 		li.classList.add("show");
  	 		li.classList.add("letter");
  	 }
  	 //if letter, add class name letter
  	 else {
  	 	li.classList.add("letter");
  	 }
  }
  //return the list items of the letters
  return myPhrase;
}

function checkLetter(clickedLetter) {

  let letterFound = false;
    if (clickedLetter.tagName == "BUTTON"){
        clickedLetter.className = "chosen";
        //disable button if clicked
        clickedLetter.setAttribute("disabled", "true");
        const li = document.querySelectorAll(".letter");
        for (let i = 0 ; i < li.length ; i++){
        	//if letter clicked to a letter within the array of letters from the phrase in loop
            if (clickedLetter.textContent.toLowerCase() == li[i].textContent.toLowerCase()){
            	//add show class to letter to display letter
       			 li[i].classList.add("show");
       			 //chnge letter count to true
       			 //use  to break out of function and return correct value
       			 letterFound = true;

            } 
        }
  }

  if (letterFound) {
  	//return that letter which was clicked
  		return clickedLetter.textContent.toLowerCase();
  }
  else {
  	//return null 
  		return null;
  } 
}

function checkWin() {
	//function to check against every array value in array that we split into 2
  function contains (item){
	    return item.classList.contains("show");
	}
//checkes 2 conditions, loss and win 
//5 misses stops game
  	if(missed === 5){

  		 h2.textContent = "You lose, try again!";
  		 startScreen.style.display = "block";
  		 startScreen.classList.add("lose");
  	  	 reset.textContent = "New Game?";
  	  	 //newgame function to reset new game and put new phrase on screen
  	  	 //**BUG** any new letter is pressed on they keyboard, win phrase is displayed
  	  	// and no new letters show 
  	  	 newGame();
  		}
  		//checks to see if numbers of array items with class of "letter"  equals/also contains
  		// number of items with the class "show", as specified in return statement of "contains"
  		//function - returns TRUE or FALSE
  	else if (letterArray.every(contains)){
  		startScreen.style.display = "block";
  		startScreen.classList.add("win");
  		h2.textContent = "You Win!";
   	    reset.textContent = "New Game?";
   	    //**BUG** game as above
  		newGame();		
  	} 	
}

function newGame(){
	//resets misses,  emptys myPhrase array where random phrase is initially pushed into
	 missed = 0;
  	 myPhrase = [];
  	 //removes the actaul LI elements on the page which the myPhrase array is actaully displayed on 
  	 //the scren 
  	 //myPhrase is the array, but listItems are the elements that actaully displays that array on DOM
  	 for (let i = 0 ; i < listItems.length ; i++) {
			ul.firstElementChild.remove();
		}
		//setting length to 0 deleted all of those elements on the DOM
	listItems.length = 0 ;
	for (let i = 0 ; i < buttons.length ; i++){
		//for all buttons, if hold attr of disabled, remove that disabled attr and "chosen" class
	    if (buttons[i].disabled ==  true) {
	        buttons[i].disabled = false;
	        buttons[i].classList.remove("chosen");
	    }    
	}
	//append the heart images back the OL on the dOM for the correct amount (5)
	const  ol = document.querySelector("ol");
		for (let i = 0 ; i < hearts.length ; i++){
		ol.appendChild(hearts[i]);
		}
	console.log(missed);
	//pick new  random phrase 
	getRandomPhraseAsArray(phrases);
	//add that array to the DOM
	//should starts program over after everything is reset, BUG lies somewhere here
	addPhraseToDisplay(myPhrase);
}

qwerty.addEventListener('click', (e) => {
	//on only first click, breaks the array of letters in 2 separate arrays in order to get
	//arrays with "letter" in one array to all be compared with the new class of "show"
	//which they recieve once they are clicked 
  		for (let i = 0 ; i < listItems.length ; i++){
  		 if (listItems[i].classList.contains("space")){
  		 	//guessedListItems now only contain spaces
  		 	 guessedListItems.push(listItems[i]);
 		}
 		else if (listItems[i].classList.contains("letter")){
 			//lettersArray  now only contains letters
 			 letterArray.push(listItems[i]);
 		} 	
  	}
}, {once: true});

qwerty.addEventListener("click", (e) => {
  const clickedLetter = e.target;
  if (clickedLetter.tagName == "DIV"){
  	//stops click from resgistering if anywhere outside a letter is clicked (keyboard div)
  		 return false;
  }
  checkLetter(clickedLetter);
  console.log(checkLetter(clickedLetter));
  if (checkLetter(clickedLetter)  == null){
  	//if the letter clicked returns null,
  	//miss increases by 1
  	missed+=1;
  	const ol = document.querySelector("ol");
  	const tries = document.querySelectorAll(".tries");
  	// ul.children;
  	//remove a heart from the DOM
  	ol.removeChild(tries[0]);
  	//check  if user wins 
  	checkWin();
  }
  else {
  	//check if user wins
  	checkWin();
  }
});

getRandomPhraseAsArray(phrases);
addPhraseToDisplay(myPhrase);