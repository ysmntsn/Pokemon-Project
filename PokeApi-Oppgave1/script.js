
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

function editPoke(id) {
    console.log("fonksiyon cagrildi");
    
    // Kullanıcıdan yeni isim ve tür bilgilerini al
    const newName = prompt("Lütfen yeni ismi giriniz:");
    const newType = prompt("Lütfen yeni türü giriniz:");

    // Kullanıcı yeni isim ve tür bilgilerini girdiyse devam et
    if (newName !== null && newType !== null) {
        // Kartı bul
        const card = document.querySelector(".btn-edit");
       

        // Eğer kart varsa, isim ve tür bilgilerini güncelle
        if (card) {
            card.querySelector('.name-poke').textContent = newName;
            card.querySelector('.type-poke').textContent = `Type: ${newType}`;

            // localStorage'deki kartın bilgilerini güncelle
            let savedPokemons = JSON.parse(localStorage.getItem('savedPokemons')) || [];
            savedPokemons = savedPokemons.map(pokemon => {
                if (pokemon.id === id) {
                    pokemon.name = newName;
                    pokemon.type = newType;
                }
                return pokemon;
            });
            localStorage.setItem('savedPokemons', JSON.stringify(savedPokemons));

            // Başarılı bir şekilde güncelleme mesajı göster
            alert('Pokemon bilgileri başarıyla güncellendi!');
        } else {
            // Kart bulunamazsa hata mesajı göster
            alert('Belirtilen Pokemon bulunamadı!');
        }
    }
}





const createBoxPokemon = (pokemon)=>{
   


       const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
       const id =pokemon.id.toString().padStart(3,"0");
    //    const type = pokemon.types[0].type.name;
    const pokemonTypes = pokemon.types.map(type => type.type.name); // Pokemon'un tüm türlerini al
    const validTypes = pokemonTypes.filter(type => Object.keys(colors).includes(type)); // Geçerli türleri kontrol et
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

    
   



  
};

