const pck_card = document.querySelector('[data-card-pck]')
const pck_name = document.querySelector('[data-name-pck]')
const pck_img = document.querySelector('[data-pck-img]')
const pck_img_container = document.querySelector('[data-img-pck-container]')
const pck_id = document.querySelector('[data-id-pck]')
const pck_type = document.querySelector('[data-type-pck]')
const pck_stats = document.querySelector('[data-stats-pck]')

function buscarPockemon(num) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${num}`) //busca el valor en la api
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound()) //error en caso de no encontrar valor
}

const renderPokemonData = data => {
    const sprite = data.sprites.front_default; ///obtener valor de sprite
    const { stats, types } = data; //toma el valor de data de stats y de type de data 

    //nombre
    pck_name.textContent = data.name; //obtiene el valor de data
    //imagen
    pck_img.setAttribute('src', sprite); //asigna la ruta de la imagen
    //id
    pck_id.textContent = `Nº ${data.id}`; //variable de tipo numero y asigna el id
    //types
    pck_type.innerHTML = ''; //limpia los valores
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.textContent = type.type.name;
        pck_type.appendChild(typeTextElement);
    });
    //stats
    pck_stats.innerHTML = ''; //limpia los valores
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName); //asigna el valor a un div
        statElement.appendChild(statElementAmount);
        pck_stats.appendChild(statElement);
    });
}


const renderNotFound = () => {
    pck_name.textContent = 'No encontrado';
    pck_img.setAttribute('src', 'pockemon invalido.png');
    pck_img.style.background = '#fff';
    pck_type.innerHTML = '';
    pck_stats.innerHTML = '';
    pck_id.textContent = '';
}