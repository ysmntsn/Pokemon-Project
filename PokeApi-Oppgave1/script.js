
//Variables//

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
        let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        let response = await fetch(url);
        let data = await response.json();
        createBoxPokemon(data); // id parametresi kullanılmıyor
    
    } catch (error) {
        console.error('Hata:', error.message);
    }
};


const deletePokemon = (id) => {
    const pokemonCards = document.querySelectorAll(".box-poke");

    
    pokemonCards.forEach(card => {
        if (card.getAttribute("data-id") === "00" + id.toString()) {
    
            card.remove(); // Kartı DOM'dan kaldır
        }
    });

    let savedPokemons = JSON.parse(localStorage.getItem('savedPokemons')) || [];
    savedPokemons = savedPokemons.filter(pokemon => pokemon.id !== parseInt(id));
    localStorage.setItem('savedPokemons', JSON.stringify(savedPokemons));
};
