/* TODO:
-Incorporate favorites functionality
-Trading card functionality
*/
import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";

const charactersElement = document.querySelector(".show-characters-container");

export default class ShowCharacters {
    constructor(showID, dataSource, displayElement) {
        this.showID = showID;
        this.dataSource = dataSource;
        this.displayElement = displayElement;
        this.character = {};
    }
    async init() {
        this.character = await this.dataSource.getCharacterDetail(this.showID);
        this.renderDisplay();
        //document.querySelector("#favorite-star2").addEventListener("click", this.addCharacterToFavorites.bind(this));
    }
    /*addCharacterToFavorites() {
        const favoriteCharacterIcon = document.querySelector("#favorite-star2");
        const card = document.querySelector(".card");
        let favCharacters = getLocalStorage("ls-characters") || [];
        card.classList.toggle("flipped");
        if (favoriteCharacterIcon.classList.contains("favorite-star-currentFavorite")) {
            favCharacters = favCharacters.filter(item => item.mal_id !== element.data.data.mal_id);
            setLocalStorage("ls-characters", favCharacters);
            favoriteCharacterIcon.classList.remove("favorite-star-currentFavorite");
            alertMessage("Character removed from favorites!");
        } else {
            favCharacters.push(element);
            setLocalStorage("ls-characters", favCharacters);
            favoriteCharacterIcon.classList.add("favorite-star-currentFavorite");
            alertMessage("Character added to favorites!");
        }
    }*/
    renderDisplay() {
        showDetailTemplate(this.character, this.displayElement);
    }
}

function showDetailTemplate(character) {
    character.forEach((element) => {
        let card = document.createElement("div");
        let cardFront = document.createElement("section");
        let cardBack = document.createElement("section");
        card.setAttribute('class', 'card');
        cardFront.setAttribute('class', 'card-front');
        cardBack.setAttribute('class', 'card-back');
        let name = document.createElement("p");
        let nameKanji = document.createElement("p");
        nameKanji.setAttribute("class", "name-kanji");
        let photo = document.createElement("img");
        let birthplace = document.createElement("p");
        let nicknames = document.createElement("p");
        let favorites = document.createElement("p");
        /*let favoriteCharacterIcon = document.createElement("div");
        favoriteCharacterIcon.setAttribute("class", "favorite-star");
        favoriteCharacterIcon.setAttribute("id", "favorite-star2");
        favoriteCharacterIcon.innerHTML = "&#9733";
        favoriteCharacterIcon.setAttribute("data-id", element.data.data.mal_id);*/
        photo.setAttribute("src", element.data.data.images.webp.image_url);
        photo.setAttribute("alt", `Image of ${element.data.data.name} anime character`);
        photo.setAttribute("loading", "lazy");
        photo.setAttribute("width", "auto");
        photo.setAttribute("height", "75");
        name.textContent = element.data.data.name;
        nameKanji.innerHTML = element.data.data.name_kanji;
        const nicknamesArray = element.data.data.nicknames;
        const result = nicknamesArray.map(obj => obj).join(", ");
        if (result == "") {
            nicknames.textContent = "Nicknames: None";
        } else {
            nicknames.textContent = `Nicknames: ${result}`;
        }

        const returnedFavorites = element.data.data.favorites;
        const properFavorites = returnedFavorites.toLocaleString("en-us");
        favorites.textContent = `# of fan favorites: ${properFavorites}`;
        cardFront.appendChild(name);
        cardFront.appendChild(nameKanji);
        //cardFront.appendChild(favoriteCharacterIcon);
        cardFront.appendChild(photo);
        card.appendChild(cardFront);
        cardBack.appendChild(birthplace);
        cardBack.appendChild(nicknames);
        cardBack.appendChild(favorites);
        card.appendChild(cardBack);
        charactersElement.appendChild(card);
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });

        /*const favCharacters = getLocalStorage("ls-characters") || [];
        if (favCharacters.some(item => item.mal_id === element.data.data.name)) {
            favoriteCharacterIcon.classList.add("favorite-star-currentFavorite");
        }*/
    });
}