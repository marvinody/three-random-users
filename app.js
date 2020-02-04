const usersBox = document.querySelector('.users')
const links = document.querySelector('.links')
const usersURL = 'https://acme-users-api-rev.herokuapp.com/api/users/random'
let users = []
let idx = window.location.hash.slice(1)


window.addEventListener('hashchange', () => {
    const idStr = window.location.hash.slice(1)
    const idNum = window.location.hash.slice(1) * 1
    const userCards = [...document.querySelectorAll('.user')]
    console.log(idStr)
    if (Number.isNaN(idNum) || idNum > userCards.length || idNum <= 0) {
        userCards.forEach(card => {
            card.classList.remove('selected', 'hidden')
            // card.style.order = '0'
        })
    } else {
        // const order = orderCode[idNum]

        userCards.forEach(card => {
            // card.style.order = order[card.getAttribute('data-id')]

            if (card.getAttribute('data-id') === idStr) {
                console.log('hey')
                card.classList.add('selected')
                card.classList.remove('hidden')
            } else {
                card.classList.remove('selected')
                card.classList.add('hidden')
            }
        })
    }

})



const renderUsers = ()=>{

    const html = users.map((user,idx) =>{
        return `
            <div class='user' data-id=${idx+1}>
                <p> ${user.fullName} </p>
                <p> ${user.email} </p>
                <img src="${user.avatar}" alt="User Avatar">
            </div>
        `
    }).join('')
    console.log(html)
    usersBox.innerHTML = html
    renderPages()
}

Promise.all([fetch(usersURL), fetch(usersURL), fetch(usersURL)])
    .then(response => Promise.all(response.map(r => r.json())))
    .then(data => {
        for(let i =0;i<data.length;i++){
            users.push(data[i])
        }
        renderUsers(users)
    })


function renderPages(){
    let pageTotal = 3
    let html = []
    for (let i = 0; i < pageTotal; i++) {
        html.push(
          `<div class='' data-id=${i+1}><a href='#${i+1}'>${i+1}</a></div>`
        )
    }
    links.innerHTML = html.join('')
  }



