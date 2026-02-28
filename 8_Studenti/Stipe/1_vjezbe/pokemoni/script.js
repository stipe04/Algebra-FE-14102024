const pokemonSelect = document.getElementById("pokemonSelect");
const showButton = document.getElementById("showButton");
const pokemonInfo = document.getElementById("pokemonInfo");
const pokemonName = document.getElementById("pokemonName");
const pokemonImage = document.getElementById("pokemonImage");
const pokemonHeight = document.getElementById("pokemonHeight");
const pokemonWeight = document.getElementById("pokemonWeight");
const pokemonTypes = document.getElementById("pokemonTypes");

// Dohvati prvih 20 Pokemona iz API-ja
fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
    .then(response => response.json())
    .then(data => {
        data.results.forEach((pokemon, index) => {
            const option = document.createElement("option");
            option.value = pokemon.name;
            option.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            pokemonSelect.appendChild(option);
        });
    })
    .catch(error => console.error("Greška pri dohvaćanju podataka:", error));

showButton.addEventListener("click", () => {
    const selectedPokemon = pokemonSelect.value;

    if (selectedPokemon) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
            .then(response => response.json())
            .then(data => {
                pokemonName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
                pokemonImage.src = data.sprites.front_default;
                pokemonHeight.textContent = data.height / 10 + " m";
                pokemonWeight.textContent = data.weight / 10 + " kg";
                pokemonTypes.textContent = data.types.map(type => type.type.name).join(", ");
                pokemonInfo.classList.remove("hidden");
            })
            .catch(error => console.error("Greška pri dohvaćanju podataka:", error));
    }
});
