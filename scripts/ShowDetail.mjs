// TODO:  Incorporate favorites functionality

export default class ShowDetail {
    constructor(showID, dataSource) {
        this.showID = showID;
        this.dataSource = dataSource;
        this.show = {};
    }
    async init() {
        this.show = await this.dataSource.getAnimeShowDetail(this.showID);
        this.renderDisplay();
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
    document.querySelector("#show-detail-title").textContent = show.title_english;
    document.querySelector("#favoriteStar").innerHTML = "&#9733";
    const image = document.querySelector("#hero-image");
    image.src = show.images.webp.large_image_url;
    image.alt = show.title_english;
    document.querySelector("#aired").textContent = `Aired: ${formattedFromDate} - ${formattedToDate}`;
    document.querySelector("#numOfEpisodes").textContent = `Number of episodes: ${show.episodes}`;
    document.querySelector("#synopsis").textContent = show.synopsis;
}
