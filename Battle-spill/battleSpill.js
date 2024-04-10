
// Trinn:1 Henter pokemon-data fra API


async function getRandomPokemonData() {
    const randomIds = generateRandomPokemonIds(3); // Rastgele 3 Pokemon ID'si oluştur
    const pokemonDataArray = [];

    for (const id of randomIds) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        pokemonDataArray.push(data);
    }

    return pokemonDataArray;
}



//Trinn:2 En funksjon for å generere tilfeldig Pokémon-ID


function generateRandomPokemonIds(count) {
    const maxId = 898; // PokeAPI'de mevcut toplam Pokemon sayısı
    const randomIds = [];

    for (let i = 0; i < count; i++) {
        const randomId = Math.floor(Math.random() * maxId) + 1;
        randomIds.push(randomId);
    }

    return randomIds;
}



//Trinn:3 Legger til Pokémon-komponenter i HTML

async function displayRandomPokemon() {
    const randomIds = generateRandomPokemonIds(3);
    const pokemonContainer = document.getElementById('pokemonContainer');
    pokemonContainer.innerHTML = ''; // Önceki Pokemonları temizle

    for (const id of randomIds) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonData = await response.json();
        const pokemonComponent = createPokemonComponent(pokemonData);
        pokemonContainer.appendChild(pokemonComponent);
    }

}


//Trinn:4 Create-delen

function createPokemonComponent(pokemonData) {
    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');

    const pokemonName = document.createElement('h2');
    pokemonName.textContent = pokemonData.name;
    pokemonElement.appendChild(pokemonName);

    const pokemonImage = document.createElement('img');
    pokemonImage.src = pokemonData.sprites.front_default;
    pokemonImage.alt = pokemonData.name;
    pokemonElement.appendChild(pokemonImage);

    const pokemonStats = document.createElement('ul');
    pokemonData.stats.forEach(stat => {
        const statItem = document.createElement('li');
        statItem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
        pokemonStats.appendChild(statItem);
    });
    pokemonElement.appendChild(pokemonStats);

   
    pokemonElement.dataset.hp = 100; // Varsayılan olarak 100 HP

    // Sağlık çubuğunu oluşturalım ve Pokemon bileşenine ekleyelim
    const healthBar = document.createElement('div');
    healthBar.classList.add('health-bar');
    healthBar.id = `healthBar-${pokemonData.name}`; // Her Pokemon için benzersiz bir id atayalım
    healthBar.style.width = '100%'; // Başlangıçta sağlık çubuğunu tam olarak gösterelim
    pokemonElement.appendChild(healthBar);

    return pokemonElement;
}
