const randomUserURL = 'https://acme-users-api-rev.herokuapp.com/api/users/random';
const usersContainer = document.querySelector('#usersContainer');

const render3RandomUsers = (userObjsArr) => {
    //console.log(userObjsArr);
    const html = userObjsArr.map( user => {
        //console.log(user);
        const num = userObjsArr.indexOf(user) + 1;
        return `
        <div class='userbox'>
            <h3 class='numberBox'><a href='#${num-1}'>${num}</a></h3>
            <ul class='userInfo'>
            <li>${user.fullName}</li>
            <li>${user.email}</li>
            <li><img src='${user.avatar}'></li>
            </ul>
        </div>`;
    }).join('');
    //console.log(html);
    usersContainer.innerHTML = html;
}

Promise.all([fetch(randomUserURL),fetch(randomUserURL),fetch(randomUserURL)])
    // .then(response => console.log(response))
    .then(response => Promise.all(response.map(r=>r.json())))
    // .then(data => console.log(data[0]))
    // .then(data => {
    //     let user1 = data[0];
    //     let user2 = data[1];
    //     let user3 = data[2];
    //     console.log(user1);
    // })
    .then(data => render3RandomUsers(data))

