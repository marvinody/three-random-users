// bruh, we went over this
// WHAT ARE THOSE LINE LENGTHS!!
// but yeah, don't be afraid to break the lines out a bit
// to make it more readable
// gonna start leaving my comment as 1 huge line and let you parse it :^)
const userOne = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random').then(response => response.json())
const userTwo = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random').then(response => response.json())
const userThree = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random').then(response => response.json())

// good assignment but could have a better names
// usersPromise or something
const p = Promise.all([userOne, userTwo, userThree])
    .then(responses => {
        // good breaking them apart
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

// I would like to see this as a .map from you
const userLinks = (responses) => {
    const num = responses.length
    const userLinkArr = []

    for (let i = 0; i < num; i++) {
        // BRUH. LOOK AT THIS LINE LENGTH
        userLinkArr.push(`<a href=#${i} class=${window.location.hash.slice(1) === i.toString() ? 'selected' : ''}>${i + 1}</a>`)
    }
    links.innerHTML = userLinkArr.join('')
}

window.addEventListener('hashchange', () => {
    const id = window.location.hash.slice(1)

    if (window.location.hash.length > 1) {
        // this is a beautiful solution to the question and I love it
        // didn't even think of doing it this way!
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
