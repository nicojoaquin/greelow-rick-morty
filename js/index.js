const baseURL = "https://rickandmortyapi.com/api/character";
const card = document.querySelector('#cardContainer');
const finder = document.querySelector('#finderInput');
let characters = [];

const showCharacters = (characters) => {
    characters.map( character => {

        card.innerHTML += 
        `
            <div class="card bg-dark me-3 mt-3 text-light" style="width: 18rem;">
                <img src="${character.image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${character.name}</h5>
                <h6 class="card-text">${character.status} - ${character.species}</h6>
                <div>
                    <span>Origin:
                        <p>${character.origin.name}</p>
                    </span>
                    <span>Last known location:
                        <p>${character.location.name}</p>
                    </span>
                </div>
                </div>
            </div>  
        `
    });
}

const getData = async () => {
    try {
        const res = await fetch(`${baseURL}/1,2,54,26,130,433,768,347,511 `);
        const data = await res.json();
        data.map( dt => characters.push(dt))
        showCharacters(characters);
    } catch (err) {
        console.warn(err);
    }
}


const handleSearch = (e) => {
    
    e.preventDefault();
    
    const filteredCharacters = characters.filter(character => character.name.toLowerCase().includes(finder.value.trim().toLowerCase()));
    
    if(finder.value === '') {
        return;
    } else if(filteredCharacters.length === 0) {
        return card.innerHTML = '<h3 class="text-center text-danger" >No existe un personaje con ese nombre</h3>'
    }
    
    card.innerHTML = ''
    showCharacters(filteredCharacters);
    
};

window.onload = getData; 
finder.addEventListener('keyup', handleSearch);