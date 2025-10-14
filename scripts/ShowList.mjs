import { renderListWithTemplate } from "./utils.mjs";

function showAnimeCardTemplate(show) {
    return `<li class="container">
        <a href="show-detail.html?show=${show.mal_id}">
            <figure><img src="${show.images.webp.large_image_url}" alt="Image of ${show.title_english}"></figure>
            <figcaption>${show.title_english}</figcaption>
        </a>
    </li>`
}

export default class ShowList {
    constructor(dataSource, listElement) {
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getAnimeShowData();
        this.renderList(list);
    }
    async getActionList() {
        const source = await this.dataSource.getAnimeShowData();
        const genreName = "Action";
        // Got help on this logic from a Bing search for: "how to use javascript to filter an array of objects based on one property in each object and that property is also an array of objects that includes the attribute to filter"
        const list = source.filter(show => show.genres.some(genre => genre.name === genreName));
        this.renderList(list);
    }
    async getComedyList() {
        const source = await this.dataSource.getAnimeShowData();
        const genreName = "Comedy";
        const list = source.filter(show => show.genres.some(genre => genre.name === genreName));
        this.renderList(list);
    }
    async getDramaList() {
        const source = await this.dataSource.getAnimeShowData();
        const genreName = "Drama";
        const list = source.filter(show => show.genres.some(genre => genre.name === genreName));
        this.renderList(list);
    }
    async getFantasyList() {
        const source = await this.dataSource.getAnimeShowData();
        const genreName = "Fantasy";
        const list = source.filter(show => show.genres.some(genre => genre.name === genreName));
        this.renderList(list);
    }
    async getRomanceList() {
        const source = await this.dataSource.getAnimeShowData();
        const genreName = "Romance";
        const list = source.filter(show => show.genres.some(genre => genre.name === genreName));
        this.renderList(list);
    }
    async getSupernaturalList() {
        const source = await this.dataSource.getAnimeShowData();
        const genreName = "Supernatural";
        const list = source.filter(show => show.genres.some(genre => genre.name === genreName));
        this.renderList(list);
    }
    renderList(list) {
        renderListWithTemplate(showAnimeCardTemplate, this.listElement, list);
    }
}