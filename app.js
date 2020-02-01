const user = (idx) => {
    fetch('https://acme-users-api-rev.herokuapp.com/api/users/random')
    .then(response => response.json())
    .then(result => {
        const usersList = document.querySelector(`#user${idx + 1}`);
        
        console.log(result);

        const user = `
            <li>${result.fullName}</li>
            <li>${result.email}</li>
            <li><img id="profpic" src="${result.avatar}"></li>
        `

        usersList.innerHTML = user;
    })
}

const user1 = user(0);
const user2 = user(1);
const user3 = user(2);
