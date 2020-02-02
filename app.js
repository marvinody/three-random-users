const API = 'https://acme-users-api-rev.herokuapp.com/api/users/random'

const user1 = fetch(API).then(result => result.json())

const user2 = fetch(API).then(result => result.json())

const user3 = fetch(API).then(result => result.json())


const refresh = document.querySelector('h1')

refresh.addEventListener('click', (ev) => {
    document.location.reload()
})



Promise.all([user1, user2, user3])
    .then(result => [pUser1, pUser2, pUser3] = result)
    .then(result => {
        document.addEventListener('click', (ev) => {
            let selectedNum = event.target
            
            if (selectedNum.matches('.digit')){
                let seletectedDig = Number(selectedNum.innerHTML)
                let selectedUser = result[seletectedDig - 1]
                let card = document.querySelector(`#user${seletectedDig}`)
                console.log(card)
                let html = `<div class='card' id="card1"> 
                ${selectedUser.fullName} 
                </div>`;
                
                card.innerHTML += html


                
            }
            

        })
    })
    