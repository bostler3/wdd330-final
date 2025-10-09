import FavoritesList from "./Favorites.mjs";
import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const dataSource = getLocalStorage("ls-shows");
const element = document.querySelector(".favorite-shows-list");
const favoritesList = new FavoritesList(dataSource, element);
favoritesList.init();