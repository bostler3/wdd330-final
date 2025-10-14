import ExternalServices from "./ExternalServices.mjs";
import ShowList from "./ShowList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices();
const element = document.querySelector(".container");
const showList = new ShowList(dataSource, element);

showList.init();

function createPokeCard() {
    const pokeCard = document.createElement("li");
    pokeCard.setAttribute("class", "container");
    pokeCard.innerHTML = `<a href="pokemon.html">
            <figure><img src="./images/pokemon.webp" alt="Pokemon image"></figure>
            <figcaption>Pokémon</figcaption>
        </a>`
    element.appendChild(pokeCard);
}

createPokeCard();

const allElement = document.querySelector("#all");
const actionElement = document.querySelector("#action");
const comedyElement = document.querySelector("#comedy");
const dramaElement = document.querySelector("#drama");
const fantasyElement = document.querySelector("#fantasy");
const romanceElement = document.querySelector("#romance");
const supernaturalElement = document.querySelector("#supernatural");

function clearActiveClass() {
    allElement.classList.remove("active");
    actionElement.classList.remove("active");
    comedyElement.classList.remove("active");
    dramaElement.classList.remove("active");
    fantasyElement.classList.remove("active");
    romanceElement.classList.remove("active");
    supernaturalElement.classList.remove("active");
}

allElement.addEventListener("click", (e) => {
    e.preventDefault();
    element.innerHTML = "";
    clearActiveClass();
    allElement.classList.add("active");
    showList.init();
    createPokeCard();
});

actionElement.addEventListener("click", (e) => {
    e.preventDefault();
    element.innerHTML = "";
    clearActiveClass();
    actionElement.classList.add("active");
    showList.getActionList();
});

comedyElement.addEventListener("click", (e) => {
    e.preventDefault();
    element.innerHTML = "";
    clearActiveClass();
    comedyElement.classList.add("active");
    showList.getComedyList();
    createPokeCard();
});

dramaElement.addEventListener("click", (e) => {
    e.preventDefault();
    element.innerHTML = "";
    clearActiveClass();
    dramaElement.classList.add("active");
    showList.getDramaList();
});

fantasyElement.addEventListener("click", (e) => {
    e.preventDefault();
    element.innerHTML = "";
    clearActiveClass();
    fantasyElement.classList.add("active");
    showList.getFantasyList();
    createPokeCard();
});

romanceElement.addEventListener("click", (e) => {
    e.preventDefault();
    element.innerHTML = "";
    clearActiveClass();
    romanceElement.classList.add("active");
    showList.getRomanceList();
});

supernaturalElement.addEventListener("click", (e) => {
    e.preventDefault();
    element.innerHTML = "";
    clearActiveClass();
    supernaturalElement.classList.add("active");
    showList.getSupernaturalList();
});

const gridbutton = document.querySelector('#grid');
const listbutton = document.querySelector('#list');

gridbutton?.addEventListener('click', () => {
    element.classList.add('grid');
    element.classList.remove('list');
});

listbutton?.addEventListener('click', () => {
    element.classList.add('list');
    element.classList.remove('grid');
});