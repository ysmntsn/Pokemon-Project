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
        let url =`https://pokeapi.co/api/v2/pokemon/${id}`
        let response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        let data = await response.json();
        createBoxPokemon(data); // id parametresi kullanılmıyor
    
    } catch (error) {
        console.error('Hata:', error.message, error); // Hata nesnesini de yazdır
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





document.addEventListener('DOMContentLoaded', function () {
    createBoxPokemon();
});

const createBoxPokemon = (pokemon)=>{
   


       const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id < 10 ? `00${pokemon.id}` : `0${pokemon.id}`;
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
    console.log("Pokemon elementi oluşturuldu:", pokemonElement);

    
   



  
};

searchInput.addEventListener("input", function(event) {
    const search = event.target.value.toLowerCase();
    
    const pokemonElements = document.querySelectorAll(".box-poke");
    
    pokemonElements.forEach(pokemonElement => {
        const typeElement = pokemonElement.querySelector(".type-poke");
        if (typeElement) { // Eğer .type-poke sınıfına sahip bir öğe varsa devam et
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
    
    // Eğer aynı Pokemon zaten kayıtlı ise, kullanıcıya bir uyarı göster
    const isDuplicate = savedPokemons.some(pokemon => pokemon.id === id);
    if (isDuplicate) {
        alert("Bu Pokemon zaten kayıtlı!");
        return;
    }

    // Eğer 5'ten fazla Pokemon kayıtlı ise, kullanıcıya bir uyarı göster
    if (savedPokemons.length >= 5) {
        alert("En fazla 5 Pokemon kaydedebilirsiniz!");
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
        console.error('Hata: Container elementi bulunamadı!');
        return;
    }
    container.innerHTML = ''; // Önceki içeriği temizle

    const savedPokemons = JSON.parse(localStorage.getItem('savedPokemons')) || [];

    if (savedPokemons.length === 0) {
        container.innerHTML = '<p>Kaydedilmiş Pokemon bulunmamaktadır.</p>';
        return;
    }

    // Kaydedilen ilk 5 pokemonu ya da daha azını al
    const savedPokemonsToShow = savedPokemons.slice(0, 5);

    savedPokemonsToShow.forEach(pokemon => {
        const pokemonElement = createPokemonElement(pokemon); // Kaydedilen pokemonlardan element oluştur
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
//Butonlar icin filtreme yapilan yer

buttonsHeader.forEach(button => button.addEventListener("click", async (event) => {
    const buttonType = event.currentTarget.id;
    console.log(`Button clicked: ${buttonType}`); // Butona tıklanıldığında konsola mesaj yazdır

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
// document.getElementById("update").addEventListener("click", async function() {
//     containerPokeSaved.innerHTML = ""; // Mevcut kartları temizle

//     try {
//         showSavedPokemons(); // Kaydedilmiş Pokemon kartlarını yeniden göster
//     } catch (error) {
//         console.error('Hata:', error.message);
//     }
// });

function editPoke(id) {
    console.log("fonksiyon çağrıldı", id);
    
    // Kullanıcıdan yeni isim ve tür bilgilerini al
    const newName = prompt("Lütfen yeni ismi giriniz:");
    const newType = prompt("Lütfen yeni türü giriniz:");

    // Kullanıcı yeni isim ve tür bilgilerini girdiyse devam et
    if (newName !== null && newType !== null) {
        // Kartı benzersiz data-id kullanarak bul
        
//         const formattedId = id < 10 ? 00${id} : 0${id};
// const card = document.querySelector([data-id="${formattedId}"]);
// const card = document.querySelector([data-id="00${id}"]);
const card = document.querySelector(`[data-id="${id.toString().padStart(3, "0")}"]`);


        console.log("card", card);
        if (card) {
            // Kart bulunduysa, isim ve tür bilgilerini güncelle
            card.querySelector('.name-poke').textContent = newName;
            card.querySelector('.type-poke').textContent = `Type: ${newType}`;

            // localStorage'deki kartın bilgilerini güncelle
            let savedPokemons = JSON.parse(localStorage.getItem('savedPokemons')) || [];
            savedPokemons = savedPokemons.map(pokemon => {
                if (pokemon.id == id) {
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

