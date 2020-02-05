const API = 'https://acme-users-api-rev.herokuapp.com/api/users/random'

const user1 = fetch(API).then(result => result.json())

const user2 = fetch(API).then(result => result.json())

const user3 = fetch(API).then(result => result.json())

// interesting choice...
// thought my browser was broken for a bit
// maybe the default should be to showall?
window.location.hash = ''

function render(user, userCount) {
    let card = document.querySelector(`#user${userCount}`)
    let check = document.querySelector(`#user${userCount}>.card`)

    if (check == null) {

        let html = `<div class='card'>
        <div>${user.fullName}</divs>
         </div>
         <div>${user.email}</divs>
         </div>
         <img src="${user.avatar}">
         </div>`

        card.innerHTML += html

        let highlightSelect = document.querySelector(`#user${userCount}>.digit`)
        highlightSelect.className = 'selected'
    }
}

function remove(userCount) {
    let reset = document.querySelector(`#user${userCount}`)

    let html = `<div class="digit">${userCount}</div>`

    reset.innerHTML = html

    let highlightSelect = document.querySelector(`#user${userCount}>.digit`)
    highlightSelect.className = 'digit'
}


Promise.all([user1, user2, user3])
    // doing this results in pUser1, pUser2,.. being defined globally
    // this is not a good approach to generally take!
    // use the results var below
    .then(result => [pUser1, pUser2, pUser3] = result)
    .then(result => {
        document.addEventListener('click', (ev) => {
            let selectedNum = event.target

            if (selectedNum.matches('h1')) {
                window.location.hash = `ShowAll`

            }

            if (selectedNum.matches('.digit')) {

                let seletectedDig = Number(selectedNum.innerHTML)
                let selectedUser = result[seletectedDig - 1]
                window.location.hash = `#pUser${seletectedDig}`
            }

        })
    })
    // this var is unused! use it somewhere...
    .then(result => {

        window.addEventListener('hashchange', () => {

            let urlHash = window.location.hash
            let userHash = urlHash.slice(1, urlHash.length)
            let divHash = urlHash.slice(-1)
            // these are the globals again but can be replaced with just result
            const useArr = [pUser1, pUser2, pUser3]

            let userCount = 0
            if (userHash === 'ShowAll') {
                // take a look at the docs for foreach, filter, map fns
                // see what the callback fn can take
                useArr.forEach(user => {
                    userCount++
                    render(user, userCount)
                })
            } else {
                let removeCount = 0
                useArr.forEach(user => {
                    removeCount++
                    remove(removeCount)
                })

                render(this[userHash], divHash)
            }


        })
    })
