import { renderListWithTemplate } from "./utils.mjs";

function showAnimeCardTemplate(show) {
    return `<li class="container">
        <a href="../show_detail/?show=${show.mal_id}">
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
    renderList(list) {
        renderListWithTemplate(showAnimeCardTemplate, this.listElement, list);
    }
}