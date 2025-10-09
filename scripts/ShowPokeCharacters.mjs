/* TODO:
-Incorporate favorites functionality
*/
import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";

export default class ShowPokeCharacters {
    constructor(dataSource, displayElement) {
        this.dataSource = dataSource;
        this.displayElement = displayElement;
        this.character = {};
    }
    async init() {
        this.character = await this.dataSource.getPokemonCharacterDetail();
        this.renderDisplay();
    }
    addCharacterToFavorites() {
        const characters = getLocalStorage("ls-characters") || [];
        characters.push(this.character);
        setLocalStorage("ls-characters", characters);
        alertMessage("Character added to favorites!");
    }
    renderDisplay() {
        showDetailTemplate(this.character, this.displayElement);
    }
}

function showDetailTemplate(character, displayElement) {
    character.forEach((element) => {
        let card = document.createElement("div");
        let cardFront = document.createElement("section");
        let cardBack = document.createElement("section");
        card.setAttribute('class', 'card');
        cardFront.setAttribute('class', 'card-front');
        cardBack.setAttribute('class', 'card-back');
        let name = document.createElement("h3");
        let photo = document.createElement("img");
        let types = document.createElement("p");
        let weight = document.createElement("p");
        let height = document.createElement("p");
        let abilities = document.createElement("p");
        let statsTitle = document.createElement("p");
        let stats = document.createElement("ul");
        let favoriteCharacterIcon = document.createElement("div");
        favoriteCharacterIcon.setAttribute("class", "favorite-star");
        favoriteCharacterIcon.setAttribute("id", "favorite-character-star");
        favoriteCharacterIcon.innerHTML = "&#9733";
        photo.setAttribute("src", element.data.sprites.front_default);
        photo.setAttribute("alt", `Image of ${element.data.name} Pokémon character`);
        photo.setAttribute("loading", "lazy");
        photo.setAttribute("width", "auto");
        photo.setAttribute("height", "75");
        let returnedName = element.data.name;
        // Got help from a Bing search for "capitalize first letter of a string javascript"
        name.textContent = returnedName.charAt(0).toUpperCase() + returnedName.slice(1);
        // Got help from a Bing search for "best way to combine the values from an unknown number of indexes into a string from a javascript array of objects"
        const typesArray = element.data.types;
        const result = typesArray.map(obj => obj.type.name).join(", ");
        types.textContent = `Types: ${result}`;
        const weightInKgs = element.data.weight;
        const weightInPounds = Math.round((weightInKgs / 10) * 2.20462262);
        weight.textContent = `Weight: ${weightInPounds} pounds`;
        const heightInCms = element.data.height;
        const heightInInches = Math.round((heightInCms * 10) * 0.39370079);
        height.textContent = `Height: ${heightInInches} inches`;
        const abilitiesArray = element.data.abilities;
        const abilitiesResult = abilitiesArray.map(obj => obj.ability.name).join(", ");
        abilities.textContent = `Abilities: ${abilitiesResult}`;
        statsTitle.textContent = "Stats:";
        const statsArray = element.data.stats;
        statsArray.forEach((stat) => {
            const listItem = document.createElement("li");
            if (stat.stat.name === "hp") {
                listItem.textContent = `Hit points: ${stat.base_stat}`;
            } else {
                const returnedStatName = stat.stat.name;
                const properLabel = returnedStatName.charAt(0).toUpperCase() + returnedStatName.slice(1)
                listItem.textContent = `${properLabel}: ${stat.base_stat}`;
            }
            stats.appendChild(listItem);
        });

        cardFront.appendChild(name);
        cardFront.appendChild(favoriteCharacterIcon);
        cardFront.appendChild(photo);
        cardFront.appendChild(types);
        card.appendChild(cardFront);
        cardBack.appendChild(weight);
        cardBack.appendChild(height);
        cardBack.appendChild(abilities);
        cardBack.appendChild(statsTitle);
        cardBack.appendChild(stats);
        card.appendChild(cardBack);
        displayElement.appendChild(card);
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });
    });
}