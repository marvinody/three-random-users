const userOne = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random').then(response => response.json())
const userTwo = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random').then(response => response.json())
const userThree = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random').then(response => response.json())

const p = Promise.all([userOne, userTwo, userThree])
    .then(responses => {
        renderUsers(responses)
        userLinks(responses)
        return responses
    })

const userCards = document.querySelector('.user-cards')
const links = document.querySelector('.links')

const renderUsers = (users) => {
    const html = users.map(user => {
        return `
        <div class='card'>
                <div>${user.fullName}</div>
                <div>${user.email}</div>
                <img src="${user.avatar}">
            </div>
        `
    }).join('')
    userCards.innerHTML = html
}

const userLinks = (responses) => {
    const num = responses.length
    const userLinkArr = []

    for (let i = 0; i < num; i++) {
        userLinkArr.push(`<a href=#${i} class=${window.location.hash.slice(1) === i.toString() ? 'selected' : ''}>${i + 1}</a>`)
    }
    links.innerHTML = userLinkArr.join('')
}

window.addEventListener('hashchange', () => {
    const id = window.location.hash.slice(1)

    if (window.location.hash.length > 1) {
        p.then(users => {
            renderUsers([users[id]])
            userLinks(users)
        })
    } else {
        p.then(users => {
            renderUsers(users)
            userLinks(users)
        })
    }
})
