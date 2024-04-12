


const defaultImageUrl = "https://static.posters.cz/image/750webp/71936.webp";

// Funksjon for å lage nye Pokemo
function createNewPokemon() {
    const pokemonName = document.getElementById('pokemonName').value;
    const pokemonType = document.getElementById('pokemonType').value;

    const pokemon = {
        name: pokemonName,
        type: pokemonType,
    };

   
    if (!isPokemonExists(pokemon)) {
      
        savePokemon(pokemon);
     
        addNewPokemonCard(pokemon);
    }
}

// Funksjon for å sjekke om Pokemon allerede eksisterer

function isPokemonExists(newPokemon) {
    const savedPokemon = JSON.parse(localStorage.getItem('savedPokemon')) || [];
    return savedPokemon.some(pokemon => pokemon.name === newPokemon.name && pokemon.type === newPokemon.type);
}

// Funksjon for å lagre Pokémon til localStorage
function savePokemon(pokemon) {
    let savedPokemon = JSON.parse(localStorage.getItem('savedPokemon')) || [];
    savedPokemon.push(pokemon);
    localStorage.setItem('savedPokemon', JSON.stringify(savedPokemon));
}

// Funksjon for å laste lagrede Pokemon fra localStorage
function loadSavedPokemon() {
    const savedPokemon = JSON.parse(localStorage.getItem('savedPokemon'));
    if (savedPokemon) {
        savedPokemon.forEach(pokemon => {
            addNewPokemonCard(pokemon);
        });
    }
}

// Funksjon for å legge til et nytt Pokémon-kort til brukergrensesnittet
function addNewPokemonCard(pokemon) {
    const newPokemonCard = document.createElement('div');
    newPokemonCard.classList.add('pokemon-card');
    newPokemonCard.classList.add(pokemon.type.toLowerCase());

    const nameParagraph = document.createElement('p');
    nameParagraph.textContent = `Name: ${pokemon.name}`;

    const typeParagraph = document.createElement('p');
    typeParagraph.textContent = `Type: ${pokemon.type}`;

    const newPokemonImage = document.createElement('img');
    newPokemonImage.src = defaultImageUrl; 
    newPokemonImage.alt = pokemon.name;

    newPokemonCard.appendChild(newPokemonImage);
    newPokemonCard.appendChild(nameParagraph);
    newPokemonCard.appendChild(typeParagraph);



    // Sett bakgrunnsfarge basert på type
    switch(pokemon.type.toLowerCase()) {
        case 'fire':
            newPokemonCard.style.backgroundColor = 'red';
            break;
        case 'water':
            newPokemonCard.style.backgroundColor = 'blue';
            break;
        case 'grass':
            newPokemonCard.style.backgroundColor = 'green';
            break;
        default:
            newPokemonCard.style.backgroundColor = 'gray';
    }

    const containerPokeSaved = document.getElementById('containerPokeSaved');
    containerPokeSaved.appendChild(newPokemonCard);
}

const form = document.getElementById('pokemonForm');

if (!form) {
    console.error("Form with id 'pokemonForm' not found!");
} else {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        createNewPokemon();
    });
}

loadSavedPokemon();
