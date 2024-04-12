

// Trinn:1 Henter pokemon-data fra API


async function getRandomPokemonData() {
    const randomIds = generateRandomPokemonIds(3); 
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
    const maxId = 898; 
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
    pokemonContainer.innerHTML = ''; 

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

   
    pokemonElement.dataset.hp = 100; 

   
    const healthBar = document.createElement('div');
    healthBar.classList.add('health-bar');
    healthBar.id = `healthBar-${pokemonData.name}`; 
    healthBar.style.width = '100%'; 
    pokemonElement.appendChild(healthBar);

    return pokemonElement;
}









//Trinn:5 updateeHealthBar function for å oppdatere helsesøyler


const waitingPokemons = document.querySelectorAll('.waiting-pokemon');

function updateHealthBar(pokemon, hp) {
    const pokemonName = pokemon.querySelector('h2').textContent;
    let healthBar = document.getElementById(`healthBar-${pokemonName}`);
    
    if (!healthBar) {
       
        const healthBarContainer = document.createElement('div');
        healthBarContainer.className = 'health-bar-container';
        healthBar = document.createElement('div');
        healthBar.id = `healthBar-${pokemonName}`;
        healthBar.className = 'health-bar';
        healthBarContainer.appendChild(healthBar);
        pokemon.appendChild(healthBarContainer);
    }

  
    healthBar.style.width = `${(hp / 100) * 100}%`;

    



if (hp <= 0) {
    console.log(`${pokemonName} Pokemon'u yenildi.`);
  
     if (parseInt(pokemon.dataset.hp) <= 0) {
        pokemon.remove();
    }

  
    if (pokemon === attacker) {
        console.log(`${attacker.querySelector('h2').textContent} Pokemon'u oyunu kaybetti!`);
        alert(`${attacker.querySelector('h2').textContent} Pokemon'u oyunu kaybetti!`);
     
        attacker = null;
    } else {
        console.log(`${defender.querySelector('h2').textContent} Pokemon'u oyunu kazandı! Tebrikler, kazandınız!`);
        alert(`${defender.querySelector('h2').textContent} Pokemon'u ikinci oyuna hazır! Tebrikler, kazandınız!`);
        
    }
}

}





//Trinn:6 startBattle


let pokemons = [];
let attacker = null; 
let defender = null; 

function startBattle() {
    const pokemonContainer = document.getElementById('pokemonContainer');
     pokemons = Array.from(pokemonContainer.querySelectorAll('.pokemon'));

 
     document.getElementById('startGameButton').addEventListener('click', function() {
        alert("Oyun başladı! Lütfen bir Pokemon seçin.");
        pokemons.forEach(pokemon => {
            pokemon.addEventListener('click', function() {
                if (attacker === null) {
                    attacker = this;
                    alert(`Saldıran Pokemon: ${attacker.querySelector('h2').textContent}`);
                   
                    selectRandomDefender();
                }
            });
        });
    });
  
pokemons.forEach(pokemon => {
    pokemon.addEventListener('click', function() {
        if (attacker === null) {
            attacker = this;
            alert(`Saldıran Pokemon: ${attacker.querySelector('h2').textContent}`);
           
            selectRandomDefender();
        }
    });
});

   
     }


  
    function selectRandomDefender() {
        const remainingPokemons = pokemons.filter(pokemon => pokemon !== attacker);
        defender = remainingPokemons[Math.floor(Math.random() * remainingPokemons.length)];
        alert(`Savunan Pokemon: ${defender.querySelector('h2').textContent}`);
      
        attack();
   
    
    }
    


//Trinn:7 attack-funksjonen

    async function attack() {
    const attackPower = Math.floor(Math.random() * 50) + 1; 

    
    let attackerHP = parseInt(attacker.dataset.hp); 
    let defenderHP = parseInt(defender.dataset.hp); 

    if (attackerHP <= 0) {
        alert(`${attacker.querySelector('h2').textContent} artık saldırı yapamaz! ${attacker.querySelector('h2').textContent}, oyunu kaybetti!`);
        return;
    } 

    const newAttackerHP = Math.max(0, attackerHP - attackPower); 
    const newDefenderHP = Math.max(0, defenderHP - attackPower); 

 
    attacker.dataset.hp = newAttackerHP;
    defender.dataset.hp = newDefenderHP;

 
    updateHealthBar(attacker, newAttackerHP);
    updateHealthBar(defender, newDefenderHP);


    if(attacker && defender){
       
        alert(`${attacker.querySelector('h2').textContent}, ${attackPower} hasar verdi! ${attacker.querySelector('h2').textContent} saldırıyor! Savunan Pokemon: ${defender.querySelector('h2').textContent}, kalan HP: ${newDefenderHP}`);
        alert(`${defender.querySelector('h2').textContent} tarafından ${attacker.querySelector('h2').textContent} saldırısına karşılık verildi! Yeni HP: ${newAttackerHP}`);

    }
  
   

    if (attackerHP <= 0) {
        alert(`${attacker.querySelector('h2').textContent} artık saldırı yapamaz! ${attacker.querySelector('h2').textContent}, oyunu kaybetti!`);
        attacker.remove(); 
        pokemons.splice(pokemons.indexOf(attacker), 1); 
        return;
    } else if (defenderHP <= 0) {
        alert(`${defender.querySelector('h2').textContent} artık savunma yapamaz! ${defender.querySelector('h2').textContent}, oyunu kaybetti!`);
        defender.remove(); 
        pokemons.splice(pokemons.indexOf(defender), 1); 
        return;
    }

    
    [attacker, defender] = [defender, attacker];
    
    setTimeout(attack, 1000);

   
    checkGameStatus();
}

function selectDefender() {
    
}




//Trinn:8 checkGameStatus-funkjonen

let gameEnded=false;

function checkGameStatus() {
    if (gameEnded) return; 


    const remainingPokemons = document.querySelectorAll('.pokemon');
    const remainingPokemonsArray = Array.from(remainingPokemons);
    
    let activePlayers = remainingPokemonsArray.filter(pokemon => !pokemon.classList.contains('waiting-pokemon'));

    
    let attackerHP = parseInt(attacker.dataset.hp);
    let defenderHP = parseInt(defender.dataset.hp);

    
    if (attackerHP <= 0 && defenderHP <= 0) {
        let loser = null;
        if (attackerHP <= 0) {
            loser = attacker;
        } else {
            loser = defender;
        }
        loser.dataset.hp = 0; 
        updateHealthBar(loser, 0); 
        loser.remove(); 
        gameEnded = true; 
        return;
    }

   
if (activePlayers.length === 1) {
    const winner = activePlayers[0];
    winner.dataset.hp = 100; 
    alert(`Tebrikler! ${winner.querySelector('h2').textContent}, 1. oyunu kazandınız. 2. oyuna devam edebilirsiniz.`);
    startSecondStage();
    gameEnded = true; 
}

}
function startSecondStage() {
    gameEnded = false; 
  
    alert("İkinci aşama başladı! 2. oyuna hazır mısınız?");
}



window.onload = function() {
    displayRandomPokemon();
}


   
    document.getElementById('startGameButton').addEventListener('click', function() {
        alert("Oyun başladı! Saldırı için bir Pokemon seçin.");
        startBattle();
    });



