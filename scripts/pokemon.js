import ExternalServices from "./ExternalServices.mjs";
import ShowPokeCharacters from "./ShowPokeCharacters.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// Source: wikipedia (https://en.wikipedia.org/wiki/Pok%C3%A9mon_(TV_series))
document.querySelector("#favoriteStar").innerHTML = "&#9733";
document.querySelector("#show-detail-title").textContent = "Pokémon";
const image = document.querySelector("#hero-image");
image.src = "../images/pokemon.webp";
image.alt = "Pokemon image";
document.querySelector("#aired").textContent = "Aired: 1997 - Present";
document.querySelector("#numOfEpisodes").textContent = "Number of episodes: 1,345";
document.querySelector("#synopsis").textContent = '"Pokémon, abbreviated from the Japanese title of Pocket Monsters, is a Japanese anime television series that premiered on TV Tokyo in April 1997. The show originally followed Ash Ketchum, a young trainer of fictional creatures called Pokémon. Joined by his partner, a Pokémon named Pikachu, and a rotating cast of human characters, Ash goes on a journey to become a "Pokémon Master", traveling through the various regions of the Pokémon world and competing in various Pokémon-battling tournaments known as the Pokémon League. Starting with the 26th season, a new cast is featured, with new protagonists Liko and Roy." (source: Wikipedia)';

const dataSource = new ExternalServices();
const pokeCharactersElement = document.querySelector('.show-characters-container');
const showPokeCharacters = new ShowPokeCharacters(dataSource, pokeCharactersElement);

showPokeCharacters.init();