function fetchData() {
    const user1Promise = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random')
        .then(response => response.json())

    const user2Promise = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random')
        .then(response => response.json())

    const user3Promise = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random')
        .then(response => response.json())

    Promise.all([user1Promise, user2Promise, user3Promise])
        .then(result => {
            result.map((user, idx) => {
                const usersList = document.querySelector(`#user${idx + 1}`);

                const userHtml = `
                    <li>${user.fullName}</li>
                    <li>${user.email}</li>
                    <li><img id="profpic" src="${user.avatar}"></li>
                `

                usersList.innerHTML = userHtml;

                const click = document.querySelector(`#click${idx+1}`)

                click.addEventListener('click', ev => {
                    const target = ev.target;
                    
                })
            })    
        })
}

fetchData()
