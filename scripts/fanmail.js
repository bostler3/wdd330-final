import { alertMessage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// For testing...delete once localstorage favorites is available
const characters = [
  {
    characterName: "Test1"
  },
  {
    characterName: "Test2"
  }
]

// This will help populate the "To" field drop-down once localstorage is populated with favorite characters
const selectElement = document.querySelector("#toCharacters");
characters.forEach (character => {
  const optionElement = document.createElement("option");
  optionElement.value = character.characterName;
  optionElement.textContent = character.characterName;
  selectElement.appendChild(optionElement);

});

function updateSelectedCharacter () {
  const root = document.documentElement;
  const selectedCharacterValue = selectElement.options[selectElement.selectedIndex].value;
  document.querySelector("#selected-character").textContent = selectedCharacterValue;
}

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