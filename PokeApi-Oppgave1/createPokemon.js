// const defaultImageUrl ="https://static.posters.cz/image/750webp/71936.webp";

// // Yeni Pokemon oluşturma işlemini gerçekleştiren fonksiyon
// function createNewPokemon() {
//     // Formdan gelen bilgileri al
//     const pokemonName = document.getElementById('pokemonName').value;
//     const pokemonType = document.getElementById('pokemonType').value;

//     // Yeni Pokemon objesi oluştur
//     const pokemon = {
//         name: pokemonName,
//         type: pokemonType,
//     };
    
//     // Yeni Pokemon kartını oluştur
//     const newPokemonCard = document.createElement('div');
//     newPokemonCard.classList.add('pokemon-card');
//     newPokemonCard.classList.add(pokemon.type.toLowerCase());
    
    
    
    
//     // Yeni Pokemon kartını 3. sayfadaki div içine ekle
//     const containerPokeSaved = document.getElementById('containerPokeSaved');
//     containerPokeSaved.innerHTML = ''; // Önceki kartları temizle
//     containerPokeSaved.appendChild(newPokemonCard);

//     // Yeni Pokemon'i ilk sayfadaki 51. karta ekle
//     addNewPokemonImage(pokemon);
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

// // İlk sayfadaki resim listesine yeni Pokemon kartını ekleyen fonksiyon
// function addNewPokemonImage(pokemon) {
//     // Yeni Pokemon resmini oluştur
//     const newPokemonImage = document.createElement('img');
//     newPokemonImage.src = defaultImageUrl; // veya kullanıcı tarafından sağlanan bir URL
//     newPokemonImage.alt = pokemon.name; // Resmin alternatif metni olarak Pokemon ismini kullanabiliriz
    
//     // İlk sayfadaki resim listesine yeni Pokemon resmini 51. karta ekle
//     const imageList = document.getElementById('imageList');
//     const fiftyFirstImage = imageList.children[50]; // 51. kartın indeksi 50'dir
//     imageList.insertBefore(newPokemonImage, fiftyFirstImage.nextSibling);
// }


const defaultImageUrl = "https://static.posters.cz/image/750webp/71936.webp";

// Yeni Pokemon oluşturma işlemini gerçekleştiren fonksiyon
function createNewPokemon() {
    // Formdan gelen bilgileri al
    const pokemonName = document.getElementById('pokemonName').value;
    const pokemonType = document.getElementById('pokemonType').value;

    // Yeni Pokemon objesi oluştur
    const pokemon = {
        name: pokemonName,
        type: pokemonType,
    };
    
    // Yeni Pokemon kartını oluştur
    const newPokemonCard = document.createElement('div');
    newPokemonCard.classList.add('pokemon-card');
    newPokemonCard.classList.add(pokemon.type.toLowerCase());
    
    // Yeni Pokemon kartını 3. sayfadaki div içine ekle
    const containerPokeSaved = document.getElementById('containerPokeSaved');
    if (containerPokeSaved) {
        containerPokeSaved.innerHTML = ''; // Önceki kartları temizle
        containerPokeSaved.appendChild(newPokemonCard);
    } else {
        console.error("Element with id 'containerPokeSaved' not found!");
    }

    // Yeni Pokemon'i ilk sayfadaki 51. karta ekle
    addNewPokemonImage(pokemon);
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

// İlk sayfadaki resim listesine yeni Pokemon kartını ekleyen fonksiyon
function addNewPokemonImage(pokemon) {
    // Yeni Pokemon resmini oluştur
    const newPokemonImage = document.createElement('img');
    newPokemonImage.src = defaultImageUrl; // veya kullanıcı tarafından sağlanan bir URL
    newPokemonImage.alt = pokemon.name; // Resmin alternatif metni olarak Pokemon ismini kullanabiliriz
    
    // İlk sayfadaki resim listesine yeni Pokemon resmini 51. karta ekle
    const imageList = document.getElementById('imageList');
    if (imageList && imageList.children.length >= 51) {
        const fiftyFirstImage = imageList.children[50]; // 51. kartın indeksi 50'dir
        imageList.insertBefore(newPokemonImage, fiftyFirstImage.nextSibling);
    } else {
        console.error("Element with id 'imageList' not found or does not have at least 51 children!");
    }
}


