export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

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
    const headerTemplate = await loadTemplate("partials/header.html");
    const footerTemplate = await loadTemplate("partials/footer.html");

    const headerElement = document.querySelector("#header");
    const footerElement = document.querySelector("#footer");

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);

    const currentdatetime = document.querySelector("#currentdatetime");
    currentdatetime.textContent = document.lastModified;

    // Adds "active" class to nav links; got some help from Bing searches (adding a class to an element and parsing a string)
    const currentPageOrig = window.location.pathname;
    const currentPage = currentPageOrig.substring(currentPageOrig.lastIndexOf("/") + 1);
    const navMenuItems = document.querySelectorAll("nav ul li a");
    const footerMenuItems = document.querySelectorAll("footer ul li a");
    navMenuItems.forEach(item => {
        const href = item.getAttribute("href");
        const fileName = href.substring(href.lastIndexOf("/") + 1);
        if (fileName === currentPage) {
            item.classList.add("active");
        }
    })
    footerMenuItems.forEach(item => {
        const href = item.getAttribute("href");
        const fileName = href.substring(href.lastIndexOf("/") + 1);
        if (fileName === currentPage) {
            item.classList.add("active");
        }
    })
}

export function alertMessage(message, scroll = true) {
    const alertElement = document.createElement("div");
    alertElement.classList.add("error-alert");
    alertElement.style.display = "block";
    alertElement.innerHTML = `${message}<span class="closeSymbol">&times</span>`;
    alertElement.addEventListener("click", function (e) {
        if (e.target.tagName) {
            main.removeChild(this);
        }
    })
    const main = document.querySelector("main");
    main.prepend(alertElement);
    if (scroll) {
        window.scrollTo(0, 0);
    }
    // Got help from a Bing search for: "show a div on the page for five seconds javascript"
    setTimeout(() => {
        alertElement.style.display = "none";
    }, 5000);
}