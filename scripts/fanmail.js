import { alertMessage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import FanMailShowList from "./MailShowList.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices();
const element = document.querySelector("#shows");
const showList = new FanMailShowList(dataSource, element);

showList.init();

function createPokeOption() {
  const pokeOption = document.createElement("option");
  pokeOption.textContent = "Pokémon";
  pokeOption.value = "Pokémon";
  element.add(pokeOption);
}

createPokeOption();

const selectElement = document.querySelector("#toCharacters");

element.addEventListener("change", async function() {
  const selectedShowValue = element.value;
  let characters = [];
  // Got help from a Bing search for "delete all options in select element javascript except placeholder option"
  for (let i = selectElement.options.length - 1; i > 0; i--) {
    selectElement.remove(i);
  }
  if (selectedShowValue === "Pokémon") {
    const pokemonNames = dataSource.getPokemonCharacters();
    pokemonNames.forEach(name => {
      const properName = name.charAt(0).toUpperCase() + name.slice(1);
      characters.push(properName);
    });
  } else {
    const topShows = await dataSource.getAnimeShowData();
    // Got help from a Bing search for "lookup an attribute value using another attribute value in an array of objects javascript"
    const selectedShowName = topShows.find(item => item.title_english === selectedShowValue);
    const selectedShowID = selectedShowName.mal_id;
    const charactersFromTopShows = await dataSource.getCharacterObjectsByShow(selectedShowID);
    charactersFromTopShows.forEach(item => {
      const returnedName = item.character.name;
      // Got help from a Bing search for "change string from last, first to first last if last name is empty javascript"
      const [last, first] = returnedName.split(",").map(part => part.trim());
      characters.push((first ? `${first}` : "") + (last ? ` ${last}` : ""));
    });
  }
  characters.forEach(character => {
    const optionElement = document.createElement("option");
    optionElement.value = character;
    optionElement.textContent = character;
    selectElement.appendChild(optionElement);
  });
});

selectElement.addEventListener("change", function () {
  const selectedCharacterValue = selectElement.value;
  document.querySelector("#selected-character").textContent = selectedCharacterValue;
});

const submitButtonElement = document.querySelector("#submit-button");
const responseForm = document.querySelector('.response-form');
const targetScroll = document.querySelector('#target-scroll');
submitButtonElement.addEventListener("click", (e) => {
  e.preventDefault();
  const form = document.forms["fanmail-form"];
  const formCheck = form.checkValidity();
  form.reportValidity();
  const itemToRemove = document.querySelectorAll(".error-alert");
  if (itemToRemove) {
    itemToRemove.forEach((item) => {
      item.remove();
    });
  }

  checkLetter();
  checkCountry();
  checkFullName();
  checkToName();
  checkShow();
  if (formCheck) {
    if (responseForm.style.display === 'none' || responseForm.style.display === '') {
      const fromName = document.querySelector("#full-name").value.trim();
      document.querySelector("#from-name").textContent = fromName;
      const selectedCharacterValue = selectElement.options[selectElement.selectedIndex].value;
      document.querySelector("#selected-character2").textContent = selectedCharacterValue;
      responseForm.classList.add("show");
      targetScroll.scrollIntoView({ behavior: "smooth" });
    } else {
        responseForm.style.display = 'none';
    }
  }
});

function checkShow() {
  const show = document.querySelector("#shows").value.trim();
  if (show === "") {
    alertMessage("Show field cannot be blank");
  }
}

function checkToName() {
  const toName = document.querySelector("#toCharacters").value.trim();
  if (toName === "") {
    alertMessage("To field cannot be blank");
  }
}

function checkFullName() {
  const fullName = document.querySelector("#full-name").value.trim();
  if (fullName === "") {
    alertMessage("From field cannot be blank");
  }
}

function checkCountry() {
  const country = document.querySelector("#country").value.trim();
  if (country === "") {
    alertMessage("Country field cannot be blank");
  }
}

function checkLetter() {
  const letter = document.querySelector("#letter").value.trim();
  if (letter === "") {
    alertMessage("Letter field cannot be blank");
  }
}