// TODO:  Incorporate favorites functionality
import { renderListWithTemplate } from "./utils.mjs";

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
    }
    renderDisplay() {
        showDetailTemplate(this.character, this.displayElement);
    }
}

function showDetailTemplate(character, displayElement) {
    character.forEach((element) => {
        //console.log("testing");
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
        //let favoriteCharacterIcon = document.createElement("div");
        //favoriteCharacterIcon.setAttribute("class", "favorite-star");
        //favoriteCharacterIcon.innerHTML = "&#9733";
        photo.setAttribute("src", element.data.data.images.webp.image_url);
        photo.setAttribute("alt", `Image of ${element.data.data.name} anime character`);
        photo.setAttribute("loading", "lazy");
        photo.setAttribute("width", "auto");
        photo.setAttribute("height", "75");
        name.textContent = element.data.data.name;
        nameKanji.innerHTML = element.data.data.name_kanji;
        cardFront.appendChild(name);
        cardFront.appendChild(nameKanji);
        //cardFront.appendChild(favoriteCharacterIcon);
        cardFront.appendChild(photo);
        card.appendChild(cardFront);
        card.appendChild(cardBack);
        displayElement.appendChild(card);
    });
}

/*function characterCardTemplate(character) {
    return `<li class="container">${character.data.data.name}</li>`
}

export default class CharacterList {
    constructor(showID, dataSource, listElement) {
        this.showID = showID;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getCharacterDetail(this.showID);
        this.renderList(list);
    }
    renderList(list) {
        renderListWithTemplate(characterCardTemplate, this.listElement, list);
    }
}*/