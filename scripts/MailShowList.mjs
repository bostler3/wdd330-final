export default class FanMailShowList {
    constructor(dataSource, selectElement) {
        this.dataSource = dataSource;
        this.selectElement = selectElement;
    }
    async init() {
        this.list = await this.dataSource.getAnimeShowData();
        this.renderShowDropDown();
    }
    renderShowDropDown() {
        showSelectionList(this.list, this.selectElement);
    }
}

function showSelectionList(list, selectElement) {
    list.forEach(show => {
        const optionElement = document.createElement("option");
        optionElement.value = show.title_english;
        optionElement.textContent = show.title_english;
        selectElement.add(optionElement);
    })
}
