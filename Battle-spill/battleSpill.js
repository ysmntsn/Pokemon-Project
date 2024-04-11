
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


// //Trinn:4 Create-delen

// function createPokemonComponent(pokemonData) {
//     const pokemonElement = document.createElement('div');
//     pokemonElement.classList.add('pokemon');

//     const pokemonName = document.createElement('h2');
//     pokemonName.textContent = pokemonData.name;
//     pokemonElement.appendChild(pokemonName);

//     const pokemonImage = document.createElement('img');
//     pokemonImage.src = pokemonData.sprites.front_default;
//     pokemonImage.alt = pokemonData.name;
//     pokemonElement.appendChild(pokemonImage);

//     const pokemonStats = document.createElement('ul');
//     pokemonData.stats.forEach(stat => {
//         const statItem = document.createElement('li');
//         statItem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
//         pokemonStats.appendChild(statItem);
//     });
//     pokemonElement.appendChild(pokemonStats);
//  // Pokemon'un HP değerini belirle
//  const hp = pokemonData.stats.find(stat => stat.stat.name === "hp").base_stat;
//  pokemonElement.dataset.hp = hp;

   
//     // pokemonElement.dataset.hp = 100; // Varsayılan olarak 100 HP

//     // Sağlık çubuğunu oluşturalım ve Pokemon bileşenine ekleyelim
//     const healthBar = document.createElement('div');
//     healthBar.classList.add('health-bar');
//     healthBar.id = `healthBar-${pokemonData.name}`; // Her Pokemon için benzersiz bir id atayalım
//     healthBar.style.width = '100%'; // Başlangıçta sağlık çubuğunu tam olarak gösterelim
//     pokemonElement.appendChild(healthBar);
//      // Eğer Pokemon'un HP'si sıfırsa ekrandan kaldır
//      if (hp <= 0) {
//         console.log(`${pokemonData.name} Pokemon'u yenildi.`);
//         pokemonElement.remove();
//     }
//     return pokemonElement;
// }

let isRemoved = false; // İlk sıfır HP'ye sahip Pokémon'un kaldırıldığını izlemek için bir bayrak

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

    // Eğer daha önce bir Pokemon kaldırılmamışsa ve bu Pokemon'un HP'si 0 veya daha azsa, ekrandan kaldır
    if (!isRemoved && parseInt(pokemonElement.dataset.hp) <= 0) {
        pokemonElement.remove();
        isRemoved = true;
    }

    return pokemonElement;
}


//Trinn:5 updateHealthBar function for å oppdatere helsesøyler


const waitingPokemons = document.querySelectorAll('.waiting-pokemon');

function updateHealthBar(pokemon, hp) {
    const pokemonName = pokemon.querySelector('h2').textContent;
    let healthBar = document.getElementById(`healthBar-${pokemonName}`);
    
    if (!healthBar) {
        // Sağlık çubuğu bulunamazsa, yeni bir sağlık çubuğu oluştur
        const healthBarContainer = document.createElement('div');
        healthBarContainer.className = 'health-bar-container';
        healthBar = document.createElement('div');
        healthBar.id = `healthBar-${pokemonName}`;
        healthBar.className = 'health-bar';
        healthBarContainer.appendChild(healthBar);
        pokemon.appendChild(healthBarContainer);
    }

    // Sağlık çubuğunu güncelle
    healthBar.style.width = `${(hp / 100) * 100}%`;

    


// Eğer HP 0 veya daha az ise, Pokemon'u ekrandan kaldır ve kazananı kontrol et
if (hp <= 0) {
    console.log(`${pokemonName} Pokemon'u yenildi.`);
    pokemon.remove();
  
    //  // Pokemon'un HP'si 0 veya daha azsa, ekrandan kaldır
    //  if (parseInt(pokemon.dataset.hp) <= 0) {
    //     pokemon.remove();
    // }

    // Eğer bu sonucu etkileyen Pokemon saldıran ise
    if (pokemon === attacker) {
        console.log(`${attacker.querySelector('h2').textContent} Pokemon'u oyunu kaybetti!`);
        alert(`${attacker.querySelector('h2').textContent} Pokemon'u oyunu kaybetti!`);
        // Oyunu kaybeden Pokemon artık saldırı veya savunma yapamaz, ekrandan kaldırılır
        attacker = null;
    } else {
        console.log(`${defender.querySelector('h2').textContent} Pokemon'u oyunu kazandı! Tebrikler, kazandınız!`);
        alert(`${defender.querySelector('h2').textContent} Pokemon'u ikinci oyuna hazır! Tebrikler, kazandınız!`);
        // Oyunu kazanan Pokemon, ikinci oyuna hazır olduğunu belirtmek için bir bildirim göster
        // defender = null; // Bu satırı yorum satırına alıyoruz
    }
}

}



//Trinn:6 startBattle


let pokemons = [];
let attacker = null; // Saldıran Pokemon
let defender = null; // Savunan Pokemon

function startBattle() {
    const pokemonContainer = document.getElementById('pokemonContainer');
     pokemons = Array.from(pokemonContainer.querySelectorAll('.pokemon'));

  // Kullanıcıya Pokemon seçmesi için event listener'ı başlat
     document.getElementById('startGameButton').addEventListener('click', function() {
        alert("Oyun başladı! Lütfen bir Pokemon seçin.");
        pokemons.forEach(pokemon => {
            pokemon.addEventListener('click', function() {
                if (attacker === null) {
                    attacker = this;
                    alert(`Saldıran Pokemon: ${attacker.querySelector('h2').textContent}`);
                    // Savunan Pokemon'u rastgele seç
                    selectRandomDefender();
                }
            });
        });
    });
    // Pokemon seçimi için başka bir olay dinleyicisi ekleyin
pokemons.forEach(pokemon => {
    pokemon.addEventListener('click', function() {
        if (attacker === null) {
            attacker = this;
            alert(`Saldıran Pokemon: ${attacker.querySelector('h2').textContent}`);
            // Savunan Pokemon'u rastgele seç
            selectRandomDefender();
        }
    });
});

   
     }


    // Rastgele bir savunan Pokemon'u seçme fonksiyonu
    function selectRandomDefender() {
        const remainingPokemons = pokemons.filter(pokemon => pokemon !== attacker);
        defender = remainingPokemons[Math.floor(Math.random() * remainingPokemons.length)];
        alert(`Savunan Pokemon: ${defender.querySelector('h2').textContent}`);
        // Saldırıyı başlat
        attack();
   
    
    }
    

    // 
   
    
  
    
    
    

  


async function attack() {
    const attackPower = Math.floor(Math.random() * 50) + 1; // Saldırı gücü (1 ile 50 arasında rastgele)

    // Saldıran ve savunan Pokemon'ların HP değerlerini güncelle
    let attackerHP = parseInt(attacker.dataset.hp); // Saldıran Pokemon'un mevcut HP değeri
    let defenderHP = 0; // Savunan Pokemon'un HP'sini başlangıçta 0 olarak ayarlayın veya başka bir varsayılan değer belirleyin

    if (defender) {
        defenderHP = parseInt(defender.dataset.hp);
    }

    if (attackerHP <= 0) {
        alert(`${attacker.querySelector('h2').textContent} artık saldırı yapamaz! ${attacker.querySelector('h2').textContent}, oyunu kaybetti!`);
        return;
    } 

    const newAttackerHP = Math.max(0, attackerHP - attackPower); // Saldıran Pokemon'un yeni HP değeri
    const newDefenderHP = Math.max(0, defenderHP - attackPower); // Savunan Pokemon'un yeni HP değeri

    // HP değerlerini güncelle
    attacker.dataset.hp = newAttackerHP;
    if (defender) {
        defender.dataset.hp = newDefenderHP;
    }

    // Sağlık çubuklarını güncelle
    updateHealthBar(attacker, newAttackerHP);
    if (defender) {
        updateHealthBar(defender, newDefenderHP);
    }

    // Saldırının sonlanmasını sağlayan bir sonraki adımı başlat
    // Bu kod mevcut haliyle devam edebilir

    // Saldırı yapıldıktan sonra oyunun durumunu kontrol et
    checkGameStatus();
}

function checkGameStatus() {
    if (gameEnded) return;

    const remainingPokemons = document.querySelectorAll('.pokemon');
    const remainingPokemonsArray = Array.from(remainingPokemons);
    let activePlayers = remainingPokemonsArray.filter(pokemon => !pokemon.classList.contains('waiting-pokemon'));

    if (activePlayers.length === 1) {
        const winner = activePlayers[0];
        winner.dataset.hp = 100; // Kazanan Pokemon'un HP'sini yeniden doldurmaya gerek yok
        alert(`Tebrikler! ${winner.querySelector('h2').textContent}, 1. oyunu kazandınız. 2. oyuna devam edebilirsiniz.`);
        startSecondStage();
        gameEnded = true; // Oyunun bittiğini belirt
        return;
    }

    activePlayers.forEach(pokemon => {
        const hp = parseInt(pokemon.dataset.hp);
        if (pokemon && hp <= 0) {
            pokemon.remove(); // Eğer Pokemon'un HP'si 0 veya daha azsa, ekrandan kaldır
        }
    });
}

function selectDefender() {
    // Savunan Pokemon'u rastgele seçme işlemleri...
}



function startSecondStage() {
    gameEnded = false; // İkinci aşama başladığında gameEnded'i sıfırla
    // İkinci aşamanın başka işlemleri...
    alert("İkinci aşama başladı! 2. oyuna hazır mısınız?");
}



window.onload = function() {
    displayRandomPokemon();
}


   
    document.getElementById('startGameButton').addEventListener('click', function() {
        alert("Oyun başladı! Saldırı için bir Pokemon seçin.");
        startBattle();
    });


