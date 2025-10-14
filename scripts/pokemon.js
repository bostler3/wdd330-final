import ExternalServices from "./ExternalServices.mjs";
import ShowPokeCharacters from "./ShowPokeCharacters.mjs";
import { alertMessage, loadHeaderFooter, getLocalStorage, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();

// Source: wikipedia (https://en.wikipedia.org/wiki/Pok%C3%A9mon_(TV_series))
const favoriteStar = document.querySelector("#favoriteStar");
favoriteStar.innerHTML = "&#9733";

document.querySelector("#show-detail-title").textContent = "Pokémon";
const image = document.querySelector("#hero-image");
image.src = "images/pokemon.webp";
image.alt = "Pokemon image";
document.querySelector("#aired").textContent = "Aired: 1997 - Present";
document.querySelector("#numOfEpisodes").textContent = "Number of episodes: 1,345";
document.querySelector("#synopsis").textContent = '"Pokémon, abbreviated from the Japanese title of Pocket Monsters, is a Japanese anime television series that premiered on TV Tokyo in April 1997. The show originally followed Ash Ketchum, a young trainer of fictional creatures called Pokémon. Joined by his partner, a Pokémon named Pikachu, and a rotating cast of human characters, Ash goes on a journey to become a "Pokémon Master", traveling through the various regions of the Pokémon world and competing in various Pokémon-battling tournaments known as the Pokémon League. Starting with the 26th season, a new cast is featured, with new protagonists Liko and Roy." (source: Wikipedia)';

favoriteStar.addEventListener("click", () => {
    let shows = getLocalStorage("ls-poke-show") || [];
    // If the click is to "unfavorite", then remove from localStorage and remove style
    if (favoriteStar.classList.contains("favorite-star-currentFavorite")) {
        // Got help from a Bing search for: "delete item from local storage that is an array of objects javascript"
        localStorage.removeItem("ls-poke-show");
        favoriteStar.classList.remove("favorite-star-currentFavorite");
        alertMessage("Show removed from favorites!");
    } else {
        // If the click is to make a favorite, then add to localStorage and style
        const pokeLocalStorageObject = {
            name: "Pokémon",
            imageURL: "images/pokemon.webp",
            imageAlt: "Pokémon image",
            yearStarted: 1997
        };
        shows.push(pokeLocalStorageObject);
        setLocalStorage("ls-poke-show", shows);
        favoriteStar.classList.add("favorite-star-currentFavorite");
        alertMessage("Show added to favorites!");
    }
})

if (localStorage.getItem("ls-poke-show") !== null) {
    favoriteStar.classList.add("favorite-star-currentFavorite");
}

const dataSource = new ExternalServices();
const pokeCharactersElement = document.querySelector('.show-characters-container');
const showPokeCharacters = new ShowPokeCharacters(dataSource, pokeCharactersElement);

showPokeCharacters.init();