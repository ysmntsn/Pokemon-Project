


// //Yeni Pokemon oluşturma işlemini gerçekleştiren fonksiyon

// const defaultImageUrl = 'https://www.evrensel.net/images/840/upload/dosya/57053.jpg';


// function createNewPokemon() {
//     // Formdan gelen bilgileri al
//     const pokemonName = document.getElementById('pokemonName').value;
//     const pokemonType = document.getElementById('pokemonType').value;

//     // Yeni Pokemon objesi oluştur
//     const newPokemon = {
//         name: pokemonName,
//         type: pokemonType,
//         // id ve url özellikleri artık kullanılmıyor
//     };

//     // Yeni Pokemon kartını ekrana ekle
//     addNewPokemonCard(newPokemon);

//     // Yeni Pokemon'i localStorage'e kaydet
//     savePokemon(newPokemon);
// }




// function addNewPokemonCard(pokemon) {
//     // Kart elementini oluştur
//     const card = document.createElement('div');
//     card.classList.add("pokemonForm");
//     card.classList.add(pokemon.type.toLowerCase()); // Kartın arkaplan rengini ayarla

//     // Kart içeriğini oluştur
//     const imgElement = document.createElement('img');
//     imgElement.src = defaultImageUrl; // Default resim URL'si
//     imgElement.alt = `${pokemon.name} image`;

//     const nameElement = document.createElement('h4');
//     nameElement.textContent = pokemon.name;

//     const typeElement = document.createElement('p');
//     typeElement.textContent = pokemon.type;

//     // Kart içeriğini kart elementine ekle
//     card.appendChild(imgElement);
//     card.appendChild(nameElement);
//     card.appendChild(typeElement);

//     // Kartı sayfaya ekle
//     const container = document.getElementById('containerPokeSaved');
//     container.innerHTML = ''; 
//     container.appendChild(card);
// }



// // Yeni Pokemon'i localStorage'e kaydeden fonksiyon
// function savePokemon(pokemon) {
//     // Mevcut Pokemon listesini al
//     let savedPokemon = JSON.parse(localStorage.getItem('savedPokemon')) || [];

//     // Yeni Pokemon'i listeye ekle
//     savedPokemon.push(pokemon);

//     // Güncellenmiş Pokemon listesini localStorage'e kaydet
//     localStorage.setItem('savedPokemon', JSON.stringify(savedPokemon));
// }

// // Form gönderildiğinde tetiklenecek olay
// const form = document.getElementById('pokemonForm');

// if (!form) {
//     console.error("Form with id 'pokemonForm' not found!");
// } else {
//     form.addEventListener('submit', function(event) {
//         event.preventDefault(); // Sayfanın yeniden yüklenmesini engeller
//         createNewPokemon(); // Yeni Pokemon oluşturma işlemini gerçekleştir
//     });
// }


// // Kartı sayfaya ekle
// const container = document.getElementById('containerPokeSaved');
// container.insertBefore(card, container.firstChild);

//Yeni Pokemon oluşturma işlemini gerçekleştiren fonksiyon
const defaultImageUrl = 'https://www.evrensel.net/images/840/upload/dosya/57053.jpg';

function createNewPokemon() {
    // Formdan gelen bilgileri al
    const pokemonName = document.getElementById('pokemonName').value;
    const pokemonType = document.getElementById('pokemonType').value;

    // Yeni Pokemon objesi oluştur
    const newPokemon = {
        name: pokemonName,
        type: pokemonType,
        // id ve url özellikleri artık kullanılmıyor
    };

    // Yeni Pokemon kartını ekrana ekle
    addNewPokemonCard(newPokemon);

    // Yeni Pokemon'i localStorage'e kaydet
    savePokemon(newPokemon);
}

function addNewPokemonCard(pokemon) {
    // Kart elementini oluştur
    const card = document.createElement('div');
    card.classList.add("pokemonForm");
    card.classList.add(pokemon.type.toLowerCase()); // Kartın arkaplan rengini ayarla

    // Kart içeriğini oluştur
    const imgElement = document.createElement('img');
    imgElement.src = defaultImageUrl; // Default resim URL'si
    imgElement.alt = `${pokemon.name} image`;

    const nameElement = document.createElement('h4');
    nameElement.textContent = pokemon.name;

    const typeElement = document.createElement('p');
    typeElement.textContent = pokemon.type;

    // Kart içeriğini kart elementine ekle
    card.appendChild(imgElement);
    card.appendChild(nameElement);
    card.appendChild(typeElement);

    // Kartı sayfaya ekle
    const container = document.getElementById('containerPokeSaved');
    container.innerHTML = ''; 
    container.appendChild(card);
}



