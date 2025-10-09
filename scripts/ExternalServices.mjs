const baseAnimeURL = "https://api.jikan.moe/v4/";
const basePokeURL = "https://pokeapi.co/api/v2/pokemon/";

function convertToJson(res) {
    const jsonResponse = res.json();
    if (res.ok) {
        return jsonResponse;
    } else {
        throw { name: "servicesError", message: jsonResponse };
    }
}

export default class ExternalServices {
    constructor() {
        
    }
    async getAnimeShowData() {
        const response = await fetch(`${baseAnimeURL}top/anime?type=tv&filter=bypopularity&sfw=true`);
        const data = await convertToJson(response);
        return data.data;
    }
    async getAnimeShowDetail(show) {
        const response = await fetch(`${baseAnimeURL}anime/${show}/full`);
        const data = await convertToJson(response);
        return data.data;
    }
    async getCharactersByShow(show) {
        const response = await fetch(`${baseAnimeURL}anime/${show}/characters`);
        const data = await convertToJson(response);
        const apiData = data.data;
        
        // Got help from a Bing search for how to filter an array based on a condition
        const mainCharacters = apiData.filter(character => character.role === "Main");
        const supportingCharacters = apiData.filter(character => character.role === "Supporting");
        
        // Got help from a Bing search for how to sort and reduce an array
        const sortedSupportingCharacters = supportingCharacters.sort((a, b) => b.character.favorites - a.character.favorites);
        const topSupportingCharacters = sortedSupportingCharacters.slice(0, 5);
        
        let selectedCharactersIDs = [];
        mainCharacters.forEach((character) => {
            selectedCharactersIDs.push(character.character.mal_id);
        })
        topSupportingCharacters.forEach((character) => {
            selectedCharactersIDs.push(character.character.mal_id);
        })
        //console.log('Selected character IDs:', selectedCharactersIDs);
        return selectedCharactersIDs;
    }
    getPokemonCharacters() {
        // Top characters source: https://fictionhorizon.com/the-most-popular-pokemon-ranked/
        let selectedCharactersNames = ["charizard", "pikachu", "bulbasaur", "eevee", "dragapult", "gengar", "lucario", "greninja", "gardevoir", "rayquaza", "gyarados", "togekiss", "arcanine", "sylveon", "tyranitar", "vaporeon", "snorlax", "blastoise", "flygon"];
        // console.log('Selected character names:', selectedCharactersNames);
        return selectedCharactersNames;
    }

    async getCharacterDetail(show) {
        const responses = [];
        const characters = await this.getCharactersByShow(show);
        // Got help from a Bing search for how to put objects into an array (responses) based on interating through an array (characters).
        // I tried forEach, but it didn't work. Bing helped me find 'for...of'.
        for (const character of characters) {
            try {
                const response = await fetch(`${baseAnimeURL}characters/${character}/full`);
                const data = await response.json();
                responses.push({ character, data });
            } catch (error) {
                console.error(error.message);
            }
        }
        //console.log('Characters', responses);
        return responses;
    }
    async getPokemonCharacterDetail() {
        const responses = [];
        const characters = this.getPokemonCharacters();
        // Got help from a Bing search for how to put objects into an array (responses) based on interating through an array (characters).
        // I tried forEach, but it didn't work. Bing helped me find 'for...of'.
        for (const character of characters) {
            try {
                const response = await fetch(`${basePokeURL}${character}`);
                const data = await response.json();
                responses.push({ character, data });
            } catch (error) {
                console.error(error.message);
            }
        }
        // console.log('Poke Characters', responses);
        return responses;
    }
}
