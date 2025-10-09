import { renderListWithTemplate } from "./utils.mjs";

function showAnimeCardTemplate(favorite) {
    return `<li>
        <a href="../show_detail/index.html?show=${favorite.mal_id}">
            <figure><img src="${favorite.images.webp.large_image_url}" alt="Image of ${favorite.title_english}"></figure>
            <figcaption>${favorite.title_english}</figcaption>
        </a>
    </li>`
}

export default class FavoritesList {
    constructor(dataSource, listElement) {
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource;
        this.renderList(list);
    }
    renderList(list) {
        renderListWithTemplate(showAnimeCardTemplate, this.listElement, list);
    }
}