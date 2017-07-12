// declared our variables 
let input = document.getElementById("input");
let container = document.getElementById("container");
let cards = document.getElementsByClassName("cards");
let bio = "";
let array = [];

// defined the function 
function setArray() {
    //set array to the parsed json so not to return the text json
    array = JSON.parse(this.responseText)
        //called outputCards with array passed into it
    outputCards(array);

};
//defined the function outputCard 
function outputCards(peopleArray) {
    //for loop to iterate over peopleArray
    for (var i = 0; i < peopleArray.length; i++) {
        //sets container to display the json through concatenation from the string template literal
        container.innerHTML += `<div class="cards"> <person>
            <header>${peopleArray[i].name} & ${peopleArray[i].title}</header>
            <section><span class="bio">${peopleArray[i].bio}</span> & <img src="${peopleArray[i].image}"> </img></section>
            <footer>${peopleArray[i].lifespan.birth} & ${peopleArray[i].lifespan.death}</footer>
        </person></div>`;
    } // called activateClickEvent
    activateClickEvent();
};
// defined the function XHRFail to load 
function XHRFail() {
    //displays error in console if XHR fails
    console.log(this.status, this.statusText);
};
//creates variable myReqeust XHR object
var myRequest = new XMLHttpRequest();
//add event listener as soon as the page is loaded run setArray
myRequest.addEventListener("load", setArray);
//added event listener so if there is an error run XHRFAil
myRequest.addEventListener("error", XHRFail);
//initialize a request for "wysiwyg.json"
myRequest.open("GET", "wysiwyg.json");
//send the request for "wysiwyg.json"
myRequest.send();
// defined the function 
function activateClickEvent() {
    //for loop to iterate over cards
    for (var i = 0; i < cards.length; i++) {
        // attached event listener to each card to listen for "click"
        cards[i].addEventListener("click", function(e) {
            //called clearInputEvent
            clearInputEvent()
                //called activateFocusEvent
            activateFocusEvent()
                //called deathCard
            deathCard()
                //called activateBorderEvent with e.currentTarget passed into it
            activateBorderEvent(e.currentTarget)
        });
    }

}
// defined the function 
function activateFocusEvent() {
    //set the method focus onto the input variable which is our input box
    input.focus();
}
// defined the function activateBorderEvent and expects clickedCard (from line 57 "e.currentTarget")
function activateBorderEvent(clickedCard) {
    //adds selectedCard class to clickedCard
    clickedCard.classList.add("selectedCard");
    //called activatedKeyEvent with clickedCard passed into it
    activateKeyEvent(clickedCard)
}
// defined the function deathCard 
function deathCard() {
    //for loop to iterate over cards
    for (var i = 0; i < cards.length; i++) {
        // added conditional if each card contains the class "selectedCard"
        if (cards[i].classList.contains("selectedCard")) {
            //if true remove "selectedCard" from each card
            cards[i].classList.remove("selectedCard")
        };
    }
}
// defined the function  and expects clickedCard (from line 72 "clickedCard")
function activateKeyEvent(clickedCard) {
    //attached listener to input to listen for "keyup"
    input.addEventListener("keyup", function(e) {
        //conditional if event key-code equals enter
        if (e.keyCode === 13) {
            //if true execute clearInputEvent
            clearInputEvent()
        } else {
            //if false execute mirrorText with clickedCard passed into it
            mirrorText(clickedCard);
        }
    });
}
//defined the function mirrorText and expects clickedCard (from line 95 "clickedCard")
function mirrorText(clickedCard) {
    console.log("input", input.value);
    //added conditional if clickedCard has the class "selectedCard"
    if (clickedCard.classList.contains("selectedCard")) {
        //if true select the innerHTML of the element (in this case span) and make whats between the tags equivalent to what is typed in to the input
        clickedCard.querySelector(".bio").innerHTML = input.value;
    }
}
// defined the function clearInpurt Event   
function clearInputEvent() {
    //input equals an empty string
    input.value = "";
}
