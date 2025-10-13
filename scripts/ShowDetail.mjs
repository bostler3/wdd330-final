import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";

export default class ShowDetail {
    constructor(showID, dataSource) {
        this.showID = showID;
        this.dataSource = dataSource;
        this.show = {};
    }
    async init() {
        this.show = await this.dataSource.getAnimeShowDetail(this.showID);
        this.renderDisplay();
        document.querySelector("#favoriteStar").addEventListener("click", this.addShowToFavorites.bind(this));
    }
    addShowToFavorites() {
        const favoriteStar = document.querySelector("#favoriteStar");
        let shows = getLocalStorage("ls-shows") || [];
        // If the click is to "unfavorite", then remove from localStorage and remove style
        if (favoriteStar.classList.contains("favorite-star-currentFavorite")) {
            // Got help from a Bing search for: "delete item from local storage that is an array of objects javascript"
            shows = shows.filter(item => item.mal_id !== Number(this.showID));
            setLocalStorage("ls-shows", shows);
            favoriteStar.classList.remove("favorite-star-currentFavorite");
            alertMessage("Show removed from favorites!");
        } else {
            // If the click is to make a favorite, then add to localStorage and style
            shows.push(this.show);
            setLocalStorage("ls-shows", shows);
            favoriteStar.classList.add("favorite-star-currentFavorite");
            alertMessage("Show added to favorites!");
        }
    }
    renderDisplay() {
        showDetailTemplate(this.show);
    }
}

function showDetailTemplate(show) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const fromDateString = show.aired.from;
    const fromDate = new Date(fromDateString);
    const formattedFromDate = fromDate.toLocaleDateString("en-us", options);
    const toDateString = show.aired.to;
    const toDate = new Date(toDateString);
    const formattedToDate = toDate.toLocaleDateString("en-us", options);
    document.querySelector("#favoriteStar").innerHTML = "&#9733";
    document.querySelector("#show-detail-title").textContent = show.title_english;
    const image = document.querySelector("#hero-image");
    image.src = show.images.webp.large_image_url;
    image.alt = show.title_english;
    document.querySelector("#aired").textContent = `Aired: ${formattedFromDate} - ${formattedToDate}`;
    document.querySelector("#numOfEpisodes").textContent = `Number of episodes: ${show.episodes}`;
    document.querySelector("#synopsis").textContent = show.synopsis;
    // If show already in localStorage, then add styling class to star
    const favShows = getLocalStorage("ls-shows") || [];
    // Got help on this from a Bing search for: "determine if item is in a localStorage key if the localStorage value is an array of objects"
    if (favShows.some(item => item.mal_id === show.mal_id)) {
        document.querySelector("#favoriteStar").classList.add("favorite-star-currentFavorite");
    }
}
