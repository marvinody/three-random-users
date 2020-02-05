const randomUrl = 'http://acme.deploy.sadpanda.moe/api/users/random'

const user1Promise = fetch(randomUrl)
    .then(response => response.json())

const user2Promise = fetch(randomUrl)
    .then(response => response.json())

const user3Promise = fetch(randomUrl)
    .then(response => response.json())

// good promise.all
Promise.all([user1Promise, user2Promise, user3Promise])
    .then(result => {
        render(result) // and then nice use of render!
    })

function render(arr) {
    // if you're using a map, I expect you to assign the result of it.
    // maybe use a forEach if you're doing side effect stuff...
    arr.map((user, idx) => {
        const usersList = document.querySelector(`#user${idx + 1}`)

        // good idea using a ternary!! with some data on obj. I like it
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
        // if you try changing person like 7-9 times, your computer might slow down
        // that's because each rerender is adding a NEW event listener.
        // we only want to add event listeners ONCE (generally, like 90% of time)
        // so move this thing outside and only do it once
        // you may have to change your logic but doing it this way, you end up with 3 listeners EACH click
        // no bueno
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
