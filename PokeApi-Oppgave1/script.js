

const searchInput = document.querySelector("#input-poke");
const searchBtn = document.querySelector(".btn-search");
const containerPoke = document.querySelector(".container-poke");
const buttonsHeader = document.querySelectorAll(".btn-header");
const containerPokeSaved = document.querySelector(".container-saved-pokemon");








const colors ={
    normal:"#F5F5F5",
    ice:"#e0f5ff",
    fire:"#FDDFDF",
    grass:"#DEFDE0",
    electric:"#FCF7DE",
    water:"#DEF3FD",
    ground:"#f4e7da",
    rock:"#d5d5d4",
    fairy:"#fceaff",
    poison:"#d6b3ff",
    bug:"#f8d5a3",
    dragon:"#97b3e6",
    psychic:"#eaeda1",
    flying:"#E6E0D4",
    fighting:"#E6E0D4",
    dark: "#606060",
    ghost:"#494343",
    steel:"#dbd5d5"
    

};

const countPoke = 50;




const listPokemon = async () => {
    try {
        for (let i = 1; i <= countPoke; i++){
            await getPokemon(i);
        }
    } catch (error) {
        console.error('Hata:', error.message);
    }
};


const getPokemon = async (id) => {
    try {
        let url =`https://pokeapi.co/api/v2/pokemon/${id}`
        let response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        let data = await response.json();
        createBoxPokemon(data); 
    
    } catch (error) {
        console.error('Hata:', error.message, error); 
    }
};


const deletePokemon = (id) => {
    const pokemonCards = document.querySelectorAll(".box-poke");

    
    pokemonCards.forEach(card => {
        if (card.getAttribute("data-id") === "00" + id.toString()) {
    
            card.remove(); 
        }
    });

    let savedPokemons = JSON.parse(localStorage.getItem('savedPokemons')) || [];
    savedPokemons = savedPokemons.filter(pokemon => pokemon.id !== parseInt(id));
    localStorage.setItem('savedPokemons', JSON.stringify(savedPokemons));
};





document.addEventListener('DOMContentLoaded', function () {
    createBoxPokemon();
});

const createBoxPokemon = (pokemon)=>{
   


       const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
   
    //    const id = pokemon.id < 10 ? `00${pokemon.id}` : `0${pokemon.id}`;
    const id = pokemon.id < 10 ? `00${pokemon.id}` : pokemon.id < 100 ? `0${pokemon.id}` : pokemon.id;
   
       //    const type = pokemon.types[0].type.name;
    const pokemonTypes = pokemon.types.map(type => type.type.name); 
    const validTypes = pokemonTypes.filter(type => Object.keys(colors).includes(type)); 
    const type = validTypes.length > 0 ? validTypes[0] : "normal"; 
       const color = colors[type];


 
   const pokemonElement = document.createElement("div");
   pokemonElement.classList.add("box-poke");
   pokemonElement.style.backgroundColor = `${color}`;
   pokemonElement.setAttribute("data-id", id);


   pokemonElement.innerHTML=` 
   <img 
   src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" 
   alt="${name} image"
   />
   
   <h4 class="name-poke">${name}</h4>
   <p class="type-poke">Type: ${type}</p>
   <div class="poke-buttons">           
   <button class="btn-save" onclick="savePokemon('${name}', ${id}, '${type}')">Lagre</button>
   <button class="btn-delete" onclick="deletePokemon(${id})">Slette</button>
    <button class="btn-edit" onclick="editPoke(${id})">Redigere</button>
   </div>
    `;

 
    containerPoke.appendChild(pokemonElement);
    console.log("Pokemon-element opprettet:", pokemonElement);

    
   



  
};

searchInput.addEventListener("input", function(event) {
    const search = event.target.value.toLowerCase();
    
    const pokemonElements = document.querySelectorAll(".box-poke");
    
    pokemonElements.forEach(pokemonElement => {
        const typeElement = pokemonElement.querySelector(".type-poke");
        if (typeElement) { 
            const pokemonType = typeElement.textContent.toLowerCase();
          
            if (pokemonType.includes(search)) {
                pokemonElement.style.display = "block";
            } else {
                pokemonElement.style.display = "none";
            }
        }
    });
});

const savePokemon = (name, id, type,imageUrl) => {
    const savedPokemons = JSON.parse(localStorage.getItem('savedPokemons')) || [];
    
    
    const isDuplicate = savedPokemons.some(pokemon => pokemon.id === id);
    if (isDuplicate) {
        alert("Denne Pokémonen er allerede registrert!");
        return;
    }

   
    if (savedPokemons.length >= 5) {
        alert("Du kan lagre opptil 5 Pokemon!");
        return;
    }

    const pokemon = { name, id, type ,imageUrl};
    savedPokemons.push(pokemon);
    localStorage.setItem('savedPokemons', JSON.stringify(savedPokemons));
};




document.addEventListener('DOMContentLoaded', function () {
    showSavedPokemons();
});

function showSavedPokemons() {
    const container = document.querySelector('.container-saved-pokemon');
    if (!container) {
        console.error('Feil: Container ble ikke funnet!');
        return;
    }
    container.innerHTML = ''; 

    const savedPokemons = JSON.parse(localStorage.getItem('savedPokemons')) || [];

    if (savedPokemons.length === 0) {
        container.innerHTML = '<p>Det er ingen Pokémon registrert.</p>';
        return;
    }

   
    const savedPokemonsToShow = savedPokemons.slice(0, 5);

    savedPokemonsToShow.forEach(pokemon => {
        const pokemonElement = createPokemonElement(pokemon);
        container.appendChild(pokemonElement);
    });
}



function createPokemonElement(pokemon) {
    const id = pokemon.id < 10 ? `00${pokemon.id}` : `0${pokemon.id}`;
    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('box-pokes');
    pokemonElement.id = `pokemon${pokemon.id}`;
    pokemonElement.innerHTML = `
    <img 
    src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" 
    alt="${pokemon.name} image"
    />
        <h4 class="name-poke">${pokemon.name}</h4>
        <p class="type-poke">Type: ${pokemon.type}</p>
        <div class="poke-buttons">
            <button class="btn-save" onclick="savePokemon('${pokemon.name}', ${pokemon.id}, '${pokemon.type}')">Lagre</button>
            <button class="btn-delete" onclick="deletePokemon(${pokemon.id})">Slette</button>
            <button class="btn-edit" onclick="editPoke(${pokemon.id})">Redigere</button>
        </div>
    `;

    return pokemonElement;
}



listPokemon();


buttonsHeader.forEach(button => button.addEventListener("click", async (event) => {
    const buttonType = event.currentTarget.id;
    console.log(`Button clicked: ${buttonType}`); 

    containerPoke.innerHTML = "";

    try {
           const response = await fetch(`https://pokeapi.co/api/v2/type/${buttonType}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const pokemons = data.pokemon;

        for (let i = 0; i < pokemons.length; i++) {
            const pokemonUrl = pokemons[i].pokemon.url;
            const pokemonResponse = await fetch(pokemonUrl);
            if (!pokemonResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const pokemonData = await pokemonResponse.json();
            const pokemonTypes = pokemonData.types.map(type => type.type.name);
            if (pokemonTypes.length === 1 && pokemonTypes.includes(buttonType)) {
                createBoxPokemon(pokemonData);
            }
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}));

function editPoke(id) {
    console.log("fonksiyon çağrıldı", id);
    
   
    const newName = prompt("Vennligst skriv inn det nye navnet:");
    const newType = prompt("Vennligst skriv inn det nye navnet:");

    
    if (newName !== null && newType !== null) {
        
        
//         const formattedId = id < 10 ? 00${id} : 0${id};
// const card = document.querySelector([data-id="${formattedId}"]);
// const card = document.querySelector([data-id="00${id}"]);
const card = document.querySelector(`[data-id="${id.toString().padStart(3, "0")}"]`);


        console.log("card", card);
        if (card) {
           
            card.querySelector('.name-poke').textContent = newName;
            card.querySelector('.type-poke').textContent = `Type: ${newType}`;

            
            let savedPokemons = JSON.parse(localStorage.getItem('savedPokemons')) || [];
            savedPokemons = savedPokemons.map(pokemon => {
                if (pokemon.id == id) {
                    pokemon.name = newName;
                    pokemon.type = newType;
                }
                return pokemon;
            });
            localStorage.setItem('savedPokemons', JSON.stringify(savedPokemons));

            
            alert('Pokémon-informasjon ble oppdatert!');
        } else {
            
            alert('Den angitte Pokémon ble ikke funnet!!');
        }
    }
}
