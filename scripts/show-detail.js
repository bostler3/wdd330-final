import ExternalServices from "./ExternalServices.mjs";
import ShowDetail from "./ShowDetail.mjs";
import ShowCharacters from "./ShowCharacters.mjs";
import { getParam } from "./utils.mjs";

const show = getParam("show");
const dataSource = new ExternalServices();
const showDetail = new ShowDetail(show, dataSource);

showDetail.init();

const charactersElement = document.querySelector('.show-characters-container');
const characters = new ShowCharacters(show, dataSource, charactersElement);

characters.init();





