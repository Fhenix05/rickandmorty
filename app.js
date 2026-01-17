const url = 'https://rickandmortyapi.com/api/character/'
const container = document.querySelector('.container')
const details = document.querySelector('.details')
const searchInput = document.querySelector('#search')
const searchBtn = document.querySelector('#searchBtn')

const clearContainer = () => {
    container.innerHTML = ''
}

const searchCharacters = () => {
    const value = searchInput.value.trim().toLowerCase()
    
    if (!value) return

    let query = `${url}?`

    const statusList = ['alive', 'dead', 'unknown']
    const genderList = ['male', 'female', 'genderless', 'unknown']
    const speciesList = [ 'human', 'alien']

    if (statusList.includes(value)) {
        query += `status=${value}`
    }
    else if (genderList.includes(value)) {
        query += `gender=${value}`
    }
    else if (speciesList.includes(value)) {
        query += `species=${value}`
    }
    else {
        query += `name=${value}`
    }

    container.innerHTML = ''

    fetch(query)
        .then(res => {
            if (!res.ok) throw new Error()
            return res.json()
        })
        .then(data => {
            data.results.forEach(character => {
                container.appendChild(card(character))
            }) 
        })

        .catch(() => {
            container.innerHTML = `<h2>No se encontraron personajes</h2>`
        })
}

const card = character => {
    const div = document.createElement('div')
    div.className = 'card'
    const html = `
    <h2>${character.name}</h2>
    <img src="${character.image}" alt="">
    <button class="btn" data-id="${character.id}">Ver más</button>
    `
    div.innerHTML = html
    return div
} 

const switchDiv = () => {
    container.classList.toggle('invisible')
    details.classList.toggle('invisible')
}

const getId = (e) => {
    if(e.target.classList.contains('btn')){
        const id = e.target.getAttribute('data-id')
        fetch(url + '/' + id)
            .then(response => response.json())
            .then(character => {
                console.log(character)
                const html = `
                <div class="details-card">
                    <img src="${character.image}" alt="">
                    <h2>"ID: ${character.id}"</h2>
                    <h2>"Nombre: ${character.name}"</h2>
                    <h2>"Estatus: ${character.status}"</h2>
                    <h2>"Especies: ${character.species}"</h2>
                    <h2>"Tipo: ${character.type}"</h2>
                    <h2>"Género: ${character.gender}"</h2>
                    <h2>"Origen: ${character.origin.name}"</h2>
                    <h2>"Locación: ${character.location.name}"</h2>
                    <h2>"Episodio: ${character.episode.length}"</h2>
                    <h2>"Creado: ${character.created}"</h2>

                    <button onclick="switchDiv()">Regresar</button>
                    `;
                    
                details.querySelector('div')
                    .innerHTML = html
                switchDiv()
            })
    }
}

const page = Math.ceil(Math.random() * 42)
fetch(url + '?page=' + page)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(character => {
            container.appendChild(card(character)) 
        })
    })

container.addEventListener('click', getId)
searchBtn.addEventListener('click', searchCharacters)

searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        searchCharacters()
    }
})