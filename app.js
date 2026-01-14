const url = 'https://rickandmortyapi.com/api/character/'
const container = document.querySelector('.container')

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

const getId = (e) => {
    if(e.target.classList.contains('btn')){
        const id = e.target.getAttribute('data-id')
        alert(id)
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