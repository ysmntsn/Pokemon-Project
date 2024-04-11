// // createPokemon.js


// // Yeni Pokemon oluşturma işlemini gerçekleştiren fonksiyon
// function createNewPokemon() {
//     // Formdan gelen bilgileri al
//     const pokemonName = document.getElementById('pokemonName').value;
//     const pokemonType = document.getElementById('pokemonType').value;

//     // Yeni Pokemon objesi oluştur
//     const newPokemon = {
//         name: pokemonName,
//         type: pokemonType,
//         id: 25, // Örnek olarak bir Pokemon ID'si ekleniyor
//         url: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/25.png` // Örnek olarak bir resim URL'si ekleniyor
//     };
    
    
//     // Yeni Pokemon kartını ekrana ekle
//     addNewPokemonCard(newPokemon);
// }
// const defaultImageUrl =  'https://assets.pokemon.com/assets/cms2/img/pokedex/full/25.png';
// ;
// function addNewPokemonCard(pokemon) {
//     // Kart elementini oluştur
//     const card = document.createElement('div');
//     card.classList.add('pokemon-card');

//     // Kart içeriğini oluştur
//     const nameElement = document.createElement('h3');
//     nameElement.textContent = pokemon.name;

//     const typeElement = document.createElement('p');
//     typeElement.textContent = pokemon.type;

//     // Resim elementini oluştur ve özelliklerini ayarla
//     const imgElement = document.createElement('img');
//     imgElement.src = defaultImageUrl; // Varsayılan resim URL'si
//     imgElement.alt = `${pokemon.name} image`;

//     // Kart içeriğini kart elementine ekle
//     card.appendChild(imgElement); // Resmi kart içeriğine ekle
//     card.appendChild(nameElement);
//     card.appendChild(typeElement);

//     // Kartı sayfaya ekle
//     const container = document.getElementById('containerPokeSaved');
//     container.appendChild(card);
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


// Yeni Pokemon oluşturma işlemini gerçekleştiren fonksiyon
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
// }

// // Sabit bir resim URL'si
// const defaultImageUrl =

// function addNewPokemonCard(pokemon) {
//     // Kart elementini oluştur
//     const card = document.createElement('div');
//     card.classList.add('pokemon-card');

//     // Kart içeriğini oluştur
//     const nameElement = document.createElement('h3');
//     nameElement.textContent = pokemon.name;

//     const typeElement = document.createElement('p');
//     typeElement.textContent = pokemon.type;

//     // Resim elementini oluştur ve özelliklerini ayarla
//     const imgElement = document.createElement('img');
//     imgElement.src = defaultImageUrl; // Sabit resim URL'si
//     imgElement.alt = `${pokemon.name} image`;

//     // Kart içeriğini kart elementine ekle
//     card.appendChild(imgElement); // Resmi kart içeriğine ekle
//     card.appendChild(nameElement);
//     card.appendChild(typeElement);

//     // Kartı sayfaya ekle
//     const container = document.getElementById('containerPokeSaved');
//     container.appendChild(card);
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

// Yeni Pokemon oluşturma işlemini gerçekleştiren fonksiyon
// function createNewPokemon() {
//     // Formdan gelen bilgileri al
//     const pokemonName = document.getElementById('pokemonName').value;
//     const pokemonType = document.getElementById('pokemonType').value;

//     // Yeni Pokemon objesi oluştur
//     const newPokemon = {
//         name: pokemonName,
//         type: pokemonType,
//         id: 25, // Örnek olarak bir Pokemon ID'si ekleniyor
//         url: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/25.png` // Örnek olarak bir resim URL'si ekleniyor
//     };
    
//     // Yeni Pokemon kartını ekrana ekle
//     addNewPokemonCard(newPokemon);
// }

// const defaultImageUrl = 'https://images.app.goo.gl/VmZQD3pyP6ritdYd8';

// function addNewPokemonCard(pokemon) {
//     // Kart elementini oluştur
//     const card = document.createElement('div');
//     card.classList.add('pokemon-card');

//     // Kart içeriğini oluştur
//     const nameElement = document.createElement('h3');
//     nameElement.textContent = pokemon.name;

//     const typeElement = document.createElement('p');
//     typeElement.textContent = `Type: ${pokemon.type}`; // Type içeriği atanıyor

//     // Resim elementini oluştur ve özelliklerini ayarla
//     const imgElement = document.createElement('img');
//     imgElement.src = pokemon.url || defaultImageUrl; // Eğer newPokemon nesnesinde URL varsa onu kullan, yoksa defaultImageUrl kullan
//     imgElement.alt = `${pokemon.name} image`;

//     // Kart içeriğini kart elementine ekle
//     card.appendChild(imgElement); // Resmi kart içeriğine ekle
//     card.appendChild(nameElement);
//     card.appendChild(typeElement);

//     // Kartı sayfaya ekle
//     const container = document.getElementById('containerPokeSaved');
//     container.appendChild(card);
// }
// Yeni Pokemon oluşturma işlemini gerçekleştiren fonksiyon
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
}

// Sabit bir resim URL'si
const defaultImageUrl ='https://www.evrensel.net/images/840/upload/dosya/57053.jpg';

function addNewPokemonCard(pokemon) {
    // Kart elementini oluştur
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    // Kart içeriğini oluştur
    const nameElement = document.createElement('h3');
    nameElement.textContent = pokemon.name;

    const typeElement = document.createElement('p');
    typeElement.textContent = pokemon.type;

    // Resim elementini oluştur ve özelliklerini ayarla
    const imgElement = document.createElement('img');
    imgElement.src = defaultImageUrl; // Sabit resim URL'si
    imgElement.alt = `${pokemon.name} image`;

    // Kart içeriğini kart elementine ekle
    card.appendChild(imgElement); // Resmi kart içeriğine ekle
    card.appendChild(nameElement);
    card.appendChild(typeElement);

    // Kartı sayfaya ekle
    const container = document.getElementById('containerPokeSaved');
    container.appendChild(card);
}

// Form gönderildiğinde tetiklenecek olay
const form = document.getElementById('pokemonForm');

if (!form) {
    console.error("Form with id 'pokemonForm' not found!");
} else {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Sayfanın yeniden yüklenmesini engeller
        createNewPokemon(); // Yeni Pokemon oluşturma işlemini gerçekleştir
    });
}