import FavoritesList from "./Favorites.mjs";
import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const dataSource = getLocalStorage("ls-shows");
const element = document.querySelector(".favorite-shows-list");
const favoritesList = new FavoritesList(dataSource, element);
favoritesList.init();

const pokeDataSource = getLocalStorage("ls-poke-show") || [];
const pokeItem = document.createElement("li");
pokeItem.innerHTML = `<a href="pokemon.html">
            <figure><img src=${pokeDataSource[0].imageURL} alt=${pokeDataSource[0].imageAlt}>
            <figcaption>${pokeDataSource[0].name}</figcaption>
            Started: ${pokeDataSource[0].yearStarted}</figure>
        </a>`;
element.appendChild(pokeItem);