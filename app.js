const user1Promise = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random')
    .then(response => response.json())

const user2Promise = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random')
    .then(response => response.json())

const user3Promise = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random')
    .then(response => response.json())

Promise.all([user1Promise, user2Promise, user3Promise])
    .then(result => {
        render(result);
    })

// window.addEventListener('hashchange', () => {
//     const id = window.location.hash.slice(1);

//     const chosen = document.querySelector(`#user${id}data`)

//     if(chosen.tagName === 'DIV'){
//         chosen.selected = !chosen.selected
//     }

//     console.log(chosen)
// })

function render(arr) {
    arr.map((user, idx) => {
        const usersList = document.querySelector(`#user${idx + 1}`);

        const userHtml = `
            <div ${ user.selected ? "class='selected'": ''}>
                <a href='#${idx + 1}'>
                    ${idx + 1}
                </a>
            </div>

            <ul>
                <li>${user.fullName}</li>
                <li>${user.email}</li>
                <li><img id="profpic" src="${user.avatar}"></li>
            </ul>
        `

        window.addEventListener('hashchange', () => {
            const page = window.location.hash.slice(1);

            if(parseInt(page) === idx + 1){
                user.selected = true;
                console.log(user);
            } else {
                user.selected = false;
            }

            render(arr)
        })

        usersList.innerHTML = userHtml;
    })
}


// style="visibility:hidden;"
