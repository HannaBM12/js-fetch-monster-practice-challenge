document.addEventListener('DOMContentLoaded', init)

function init(){
    createForm()
    renderAllMonsters() 
    submitForm()
}
function createForm(){
    const form = document.createElement('form')
        form.id = 'monster-form'
        form.innerHTML = `<input id="name" placeholder="name...">
        <input id="age" placeholder="age...">
        <input id="description" placeholder="description...">
        <button>Create</button>`
    
    //Slap it on the DOM
    const outerDiv = document.querySelector('#create-monster')
    outerDiv.append(form)
}

function renderOneMonster(monster){
    const monsterDiv = document.createElement('div')
    monsterDiv.dataset.id = monster.id
    const h2 = document.createElement('h2')
    h2.innerText = monster.name
    const h4 = document.createElement('h4')
    h4.innerText = monster.age
    monsterDiv.append(h2,h4)

    const monsterP = document.createElement('p')
    monsterP.innerText= monster.description

    const mainDiv = document.querySelector('#monster-container')
    mainDiv.append(monsterDiv, monsterP)

}
//Get Request
function renderAllMonsters(){
    fetch('http://localhost:3000/monsters/?_limit=50&_page=1')
        .then(res => res.json())
        .then(monsterData => {
            monsterData.forEach(monster => renderOneMonster(monster))
        })
}


//Post Request
function submitForm(){
    const submitForm = document.querySelector('#monster-form')
    submitForm.addEventListener('submit', event => {
        event.preventDefault()

        const newMonster = {
            name: event.target['name'].value,
            age: event.target['age'].value,
            description: event.target['description'].value
        }
        
        //making a post request

        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newMonster)
        })
            .then(response => response.json())
            .then(monsterData => renderOneMonster(monsterData))
    } )
}

