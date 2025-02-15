let addBtn = document.querySelector(".add-btn");
let inputField = document.querySelector("input");

let nameElem = document.querySelector("#country-name");
let regionElem = document.querySelector("#country-region");
let capitalElem = document.querySelector("#country-capital");
let populationElem = document.querySelector("#country-population");
let flagElem = document.querySelector("#country-flag");
let notFoundElem = document.querySelector("#not-found");
let containerElem = document.querySelector(".container");

inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getData(inputField.value);
  }
});
addBtn.addEventListener("click", () => {
  let input = inputField.value;
  getData(input);
});
function getData(input) {
  fetch(`https://restcountries.com/v3.1/name/${input}`)
    .then((response) => response.json())
    .then((data) => {
      notFoundElem.style.display = "none";
      containerElem.style.display = "flex";
      const country = data[0];
      const {
        name: { common = "N/A" } = {},
        population = "N/A",
        capital = ["N/A"],
        region = "N/A",
        flags: { png = "", alt = "No flag available" },
      } = country;

      nameElem.textContent = common;
      regionElem.innerHTML = `<b>Region:</b> ${region}`;
      capitalElem.innerHTML = `<b>Capital:</b> ${capital}`;
      populationElem.innerHTML = `<b>Population:</b> ${Number(
        population
      ).toLocaleString("de-DE")}`;
      flagElem.src = png;
      flagElem.alt = alt;
    })
    .catch((error) => {
      console.error("Error:", error);
      notFoundElem.style.display = "block";
      containerElem.style.display = "none";
    });
}
