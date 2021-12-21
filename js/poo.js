const baseURL = "https://rickandmortyapi.com/api/character";
const card = document.querySelector('#cardContainer');
const finder = document.querySelector('#finderInput');
let characters = [];

//Creamos la clase pasandole los datos de la api en el constructor
class Character {
    constructor(name, status, species, image, origin, location) {
        this.name = name;
        this.status = status;
        this.species = species;
        this.image = image;
        this.origin = origin;
        this.location = location;
    };
    //Creamos el método que muestra los personajes en el HTML
    showCharacters() {
            card.innerHTML += 
            `
                <div class="card bg-dark me-3 mt-3 text-light" style="width: 18rem;">
                    <img src="${this.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${this.name}</h5>
                    <h6 class="card-text">${this.status} - ${this.species}</h6>
                    <div>
                        <span>Origin:
                            <p>${this.origin}</p>
                        </span>
                        <span>Last known location:
                            <p>${this.location}</p>
                        </span>
                    </div>
                    </div>
                </div>  
            `
    };
}
//Función que recorre el array y llama al metodo
const showObjects = (characters) => characters.map( character => character.showCharacters());

//Obtenemos la data, la recorremos y creamos un objeto por cada personaje
const getData = async () => {
    try {
        const res = await fetch(`${baseURL}/1,2,54,26,130,433,768,347,511 `);
        const data = await res.json();
        data.map( dt =>  {
            /*Le pasamos como parámetros los atributos al constructor y llenamos el array vacio
            con los objetos */
            const newChar = new Character(dt.name, dt.status, dt.species, dt.image, dt.origin.name, dt.location.name);
            characters.push(newChar);
        });
        showObjects(characters);
    } catch (err) {
        console.warn(err);
    }
};


//Función de busqueda, recorremos un array filtrado con los valores del input
const handleSearch = (e) => {
    
    e.preventDefault();
    
    const filteredCharacters = characters.filter(character => character.name.toLowerCase().includes(finder.value.trim().toLowerCase()));
    
    if(finder.value === '') {
        return;
    } else if(filteredCharacters.length === 0) {
        return card.innerHTML = '<h3 class="text-center text-danger" >No existe un personaje con ese nombre</h3>'
    }
    
    card.innerHTML = ''
    showObjects(filteredCharacters);
    
};

window.onload = getData;
finder.addEventListener('keyup', handleSearch);