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
const overlay = document.querySelector("#overlay")
const buttons = document.querySelectorAll("button")
const hearts = document.querySelectorAll(".tries")
// overlay.classList.add("win")
// startScreen.style.display = "block";

reset.addEventListener("click", () => {
	//fades layover out, jquery
	// $(startScreen).animate({opacity: 0});
	startScreen.style.display = "none";
	// getRandomPhraseAsArray(phrases);
 //    addPhraseToDisplay(myPhrase);
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
        clickedLetter.setAttribute("disabled", "true");
        const li = document.querySelectorAll(".letter");
        for (let i = 0 ; i < li.length ; i++){
            if (clickedLetter.textContent.toLowerCase() == li[i].textContent.toLowerCase()){
        li[i].classList.add("show");
        letterFound = true;
            } 
        }
  }

  if (letterFound) {
  		return clickedLetter.textContent.toLowerCase();
  }
  else {
  	return null;
  } 
}

function checkWin() {
  const h2 =  document.querySelector("h2");
  function contains (item){
	    return item.classList.contains("show");
	}
  	if(missed === 5){
  		 h2.textContent = "You lose, try again!";
  		 startScreen.style.display = "block";
  		 startScreen.classList.add("lose");
  	  	 reset.textContent = "New Game?";
  	  	 newGame();
  		}
  	else if (letterArray.every(contains)){
  		startScreen.style.display = "block";
  		startScreen.classList.add("win");
  		h2.textContent = "You Win!";
   	    reset.textContent = "New Game?";
  		newGame();		
  	} 	
}

function newGame(){
	 missed = 0;
  	 myPhrase = [];
  	 for (let i = 0 ; i < listItems.length ; i++) {
			ul.firstElementChild.remove();
		}
	listItems.length = 0
	for (let i = 0 ; i < buttons.length ; i++){
	    if (buttons[i].disabled ==  true) {
	        buttons[i].disabled = false;
	        buttons[i].classList.remove("chosen");
	    }    
	}
	const  ol = document.querySelector("ol")
		for (let i = 0 ; i < hearts.length ; i++){
		ol.appendChild(hearts[i]);
		}
	console.log(missed)
	getRandomPhraseAsArray(phrases);
	addPhraseToDisplay(myPhrase);
}

qwerty.addEventListener('click', (e) => {
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
  	//does not remove heart if user clicks on area around keyboard
  		 return false
  }
  checkLetter(clickedLetter);
  console.log(checkLetter(clickedLetter));
  if (checkLetter(clickedLetter)  == null){
  	missed+=1;
  	const ol = document.querySelector("ol");
  	const tries = document.querySelectorAll(".tries");
  	ul.children ;
  	ol.removeChild(tries[0]);
  	checkWin();
  }
  else {
  	checkWin();
  }
});

getRandomPhraseAsArray(phrases);
addPhraseToDisplay(myPhrase);