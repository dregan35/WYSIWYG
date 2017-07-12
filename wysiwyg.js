let input = document.getElementById("input");
let container = document.getElementById("container");
let cards = document.getElementsByClassName("cards");
let bio = "";
let array = [];


function setArray() {
    array = JSON.parse(this.responseText)
    outputCards(array);

};

function outputCards(peopleArray) {
    for (var i = 0; i < peopleArray.length; i++) {
        container.innerHTML += `<div class="cards"> <person>
            <header>${peopleArray[i].name} & ${peopleArray[i].title}</header>
            <section><span class="bio">${peopleArray[i].bio}</span> & <img src="${peopleArray[i].image}"> </img></section>
            <footer>${peopleArray[i].lifespan.birth} & ${peopleArray[i].lifespan.death}</footer>
        </person></div>`;
    }
    activateClickEvent();
};

function XHRFail() {
    console.log(this.status, this.statusText);
};

var myRequest = new XMLHttpRequest();
myRequest.addEventListener("load", setArray);
myRequest.addEventListener("error", XHRFail);

myRequest.open("GET", "wysiwyg.json");

myRequest.send();

function activateClickEvent() {
    for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", function(e) {
            clearInputEvent()
            activateFocusEvent()
            deathCard()
            activateBorderEvent(e.currentTarget)
        });
    }

}

function activateFocusEvent() {
    input.focus();
}

function activateBorderEvent(clickedCard) {
    clickedCard.classList.add("selectedCard");
    activateKeyEvent(clickedCard)
}

function deathCard() {
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].classList.contains("selectedCard")) {
            cards[i].classList.remove("selectedCard")
        };
    }
}

function activateKeyEvent(clickedCard) {
    input.addEventListener("keyup", function(e) {
        if (e.keyCode === 13) {
            clearInputEvent()
        }else{

        mirrorText(clickedCard);
        }
    });
}

function mirrorText(clickedCard) {
    console.log("input", input.value);
    if (clickedCard.classList.contains("selectedCard")) {
        clickedCard.querySelector(".bio").innerHTML = input.value;
    }
}

function clearInputEvent() {
    input.value ="";
}