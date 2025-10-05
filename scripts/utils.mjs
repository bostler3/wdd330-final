export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const parameter = urlParams.get(param);
    return parameter;
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
    const htmlStrings = list.map(template);
    if (clear) {
        parentElement.innerHTML = "";
    }
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML = template;
    if (callback) {
        callback(data);
    }
}

export async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}

export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("/wdd330-final/partials/header.html");
    const footerTemplate = await loadTemplate("/wdd330-final/partials/footer.html");

    const headerElement = document.querySelector("#header");
    const footerElement = document.querySelector("#footer");

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);

    // Adds "active" class to nav links; got some help from Bing searches (adding a class to an element and parsing a string)
    const currentPageOrig = window.location.pathname;
    const currentPage = currentPageOrig.substring(currentPageOrig.lastIndexOf("/") + 1);
    const menuItems = document.querySelectorAll("nav ul li a");
    menuItems.forEach(item => {
        const href = item.getAttribute("href");
        const fileName = href.substring(href.lastIndexOf("/") + 1);
        if (fileName === currentPage) {
            item.classList.add("active");
        }
    })
}