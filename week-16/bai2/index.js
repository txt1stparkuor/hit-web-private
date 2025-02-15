let addBtn = document.querySelector(".add-btn");
let inputField = document.querySelector("input");

let nameElem = document.querySelector("#pokemon-name");
let notFoundElem = document.querySelector("#not-found");
let containerElem = document.querySelector(".container");
let imgElem = document.querySelector("#pokemon-img");
let idElem = document.querySelector("#pokemon-id");
let heightElem = document.querySelector("#pokemon-height");
let weightElem = document.querySelector("#pokemon-weight");
let typeElem = document.querySelector("#pokemon-type");

inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getData(inputField.value);
  }
});
addBtn.addEventListener("click", () => {
  let input = inputField.value;
  getData(input);
});
async function getData(input) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    notFoundElem.style.display = "none";
    containerElem.style.display = "flex";
    let { id, height, weight, name, types, sprites } = data;

    let pokemonType = data.types[0].type.name;
    pokemonType = pokemonType[0].toUpperCase() + pokemonType.slice(1);
    const pokemonImage = sprites.front_default;
    name = name[0].toUpperCase() + name.slice(1);
    nameElem.textContent = name;
    idElem.innerHTML = `<b>ID:</b> ${id}`;
    heightElem.innerHTML = `<b>Height:</b> ${height / 10} m`;
    weightElem.innerHTML = `<b>Weight:</b> ${weight / 10} kg`;
    typeElem.innerHTML = `<b>Type:</b> ${pokemonType}`;
    imgElem.src = pokemonImage;
    imgElem.alt = name;
  } catch (error) {
    console.error("Error:", error);
    notFoundElem.style.display = "block";
    containerElem.style.display = "none";
  }
}
