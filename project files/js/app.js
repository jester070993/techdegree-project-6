const qwerty = document.querySelector("#qwerty");
let phrase = document.querySelector("#phrase");
let missed =  0;
const reset = document.querySelector(".btn__reset");
const startScreen = document.querySelector(".start")
let myPhrase 
const phrases = [
"Knowledge comes, but wisdom lingers.",
"In the end, everything is a gag.",
"Fortune favors the brave.",
"A joke is a very serious thing.",
"Where there is love there is life."
]
const ul = document.querySelector("ul")

reset.addEventListener("click", () => {
	$(startScreen).animate({opacity: 0})
	// startScreen.style.display = "none"
});


function getRandomPhraseAsArray (arr) {
	//picks random number from 0-4 for array index
 	let num = Math.floor(5 * Math.random())
 	//splits that string of specified index into array of letters
 	myPhrase =  arr[num].split("");
 	console.log(myPhrase)
 	//returns that new array of letters in a variable called myPhrase
 	return myPhrase;
}

function addPhraseToDisplay(myPhrase){
  for (let i = 0 ; i < myPhrase.length ; i++ ){
  	//creates a new list item  elemetn
  	const li = document.createElement("li")
//for each letter/index in array, a new list item is created
  	li.textContent += myPhrase[i];
  	//appends those elements to the ul
  	 ul.appendChild(li);
  }
}

getRandomPhraseAsArray(phrases);
addPhraseToDisplay(myPhrase);


