const randomUrl = 'http://acme.deploy.sadpanda.moe/api/users/random'

const user1Promise = fetch(randomUrl)
    .then(response => response.json())

const user2Promise = fetch(randomUrl)
    .then(response => response.json())

const user3Promise = fetch(randomUrl)
    .then(response => response.json())

Promise.all([user1Promise, user2Promise, user3Promise])
    .then(result => {
        render(result)
    })

function render(arr) {

    arr.map((user, idx) => {
        const usersList = document.querySelector(`#user${idx + 1}`)

        const userHtml = `
            <div ${ user.selected ? "class='selected'" : ''}>
                <a href='#${idx + 1}'>
                    ${idx + 1}
                </a>
            </div>
            <ul ${ user.hide ? "class='hide'" : ''}>
                <li>${user.fullName}</li>
                <li>${user.email}</li>
                <li><img id="profpic" src="${user.avatar}"></li>
            </ul>
        `

        window.addEventListener('hashchange', () => {
            const page = window.location.hash.slice(1)

            if (page.length) {
                if (parseInt(page) === idx + 1) {
                    user.selected = true
                    user.hide = false
                } else {
                    user.selected = false
                    user.hide = true
                }
            } else {
                user.selected = false
                user.hide = false
            }

            render(arr)
        })

        usersList.innerHTML = userHtml
    })
}
