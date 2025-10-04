import ExternalServices from "./ExternalServices.mjs";
import ShowList from "./ShowList.mjs";

const dataSource = new ExternalServices();
const element = document.querySelector(".container");
const showList = new ShowList(dataSource, element);

showList.init();