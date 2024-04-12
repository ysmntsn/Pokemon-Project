const defaultImageUrl ="https://static.posters.cz/image/750webp/71936.webp";


function createNewPokemon() {

    const pokemonName = document.getElementById('pokemonName').value;
    const pokemonType = document.getElementById('pokemonType').value;

r
    const pokemon = {
        name: pokemonName,
        type: pokemonType,
    };
    
   
    const newPokemonCard = document.createElement('div');
    newPokemonCard.classList.add('pokemon-card');
    newPokemonCard.classList.add(pokemon.type.toLowerCase());
    
    
    
    
  
    const containerPokeSaved = document.getElementById('containerPokeSaved');
    containerPokeSaved.innerHTML = ''; 
    containerPokeSaved.appendChild(newPokemonCard);

    addNewPokemonImage(pokemon);
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

function addNewPokemonImage(pokemon) {
  
    const newPokemonImage = document.createElement('img');
    newPokemonImage.src = defaultImageUrl; 
    newPokemonImage.alt = pokemon.name; 
    
    
    const imageList = document.getElementById('imageList');
    const fiftyFirstImage = imageList.children[50];
    imageList.insertBefore(newPokemonImage, fiftyFirstImage.nextSibling);
}

