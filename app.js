const randomUserURL = 'https://acme-users-api-rev.herokuapp.com/api/users/random';
const usersContainer = document.querySelector('#usersContainer');

const render3RandomUsers = (userObjsArr) => {
    //console.log(userObjsArr);
    const html = userObjsArr.map( user => {
        //console.log(user);
        const num = userObjsArr.indexOf(user) + 1;
        return `
        <div class='userbox'>
            <h3 class='numberBox' id='number${num}'><a href='#${num}'>${num}</a></h3>
            <ul class='userInfo' id='userInfo${num}'>
            <li>${user.fullName}</li>
            <li>${user.email}</li>
            <li><img src='${user.avatar}'></li>
            </ul>
        </div>`;
    }).join('');
    //console.log(html);
    usersContainer.innerHTML = html;
}

const p = Promise.all([fetch(randomUserURL),fetch(randomUserURL),fetch(randomUserURL)])
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

const notSelected = (numArr, selectedNum) => {
    if (!selectedNum) {
        return [];
    }
    return numArr.filter(num => num !== selectedNum);
}
   
window.addEventListener('hashchange', () => {
    let selectedId = window.location.hash.slice(1);
    //console.log(typeof selectedId);
    //console.log(selectedId);
    selectedId = parseInt(selectedId);
    
    let unSelectedArr = notSelected([1,2,3], selectedId); 
    //console.log(unSelectedArr);

    if (unSelectedArr.length === 0) {
        const allItems = document.querySelectorAll(`ul`);
        //console.log(allItems);
        allItems.forEach(item => item.style.visibility = 'visible')    
    } else {
        const selectedItem = document.querySelector(`ul#userInfo${selectedId}`);
        selectedItem.style.visibility = 'visible'
        const unselectedUserInfo1 = document.querySelector(`ul#userInfo${unSelectedArr[0]}`);
        const unselectedUserInfo2 = document.querySelector(`ul#userInfo${unSelectedArr[1]}`);
        //console.log(unselectedUserInfo1,unselectedUserInfo2);
        unselectedUserInfo1.style.visibility = 'hidden';
        unselectedUserInfo2.style.visibility = 'hidden';
    }
    
    //const selectedNumberBox = document.querySelector(`h3#number${selectedId}`);
    //console.log(selectedNumberBox);
    //selectedNumberBox.classList.toggle('selected');
})

