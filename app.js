const randomUserURL = 'https://acme-users-api-rev.herokuapp.com/api/users/random'
const usersContainer = document.querySelector('#usersContainer')

const render3RandomUsers = (userObjsArr) => {
    //console.log(userObjsArr);
    const html = userObjsArr.map(user => {
        //console.log(user);
        const num = userObjsArr.indexOf(user) + 1
        return `
        <div class='userbox'>
            <a class='numberBox' id='number${num}' href='#${num}'>${num}</a>

            <ul class='userInfo' id='userInfo${num}'>
            <li>${user.fullName}</li>
            <li>${user.email}</li>
            <li><img src='${user.avatar}'></li>
            </ul>
        </div>`
    }).join('')
    //console.log(html);
    usersContainer.innerHTML = html
}

const p = Promise.all([fetch(randomUserURL), fetch(randomUserURL), fetch(randomUserURL)])
    .then(response => Promise.all(response.map(r => r.json())))
    .then(data => render3RandomUsers(data))

const notSelected = (numArr, selectedNum) => {
    if (!selectedNum) {
        return []
    }
    return numArr.filter(num => num !== selectedNum)
}

window.addEventListener('hashchange', () => {
    let selectedId = window.location.hash.slice(1)
    selectedId = parseInt(selectedId)
    let unSelectedArr = notSelected([1, 2, 3], selectedId)

    const allNumberboxs = document.querySelectorAll(`a`)

    if (unSelectedArr.length === 0) {
        const allItems = document.querySelectorAll(`ul`)
        allItems.forEach(item => item.style.visibility = 'visible')
        allNumberboxs.forEach(item => item.classList.remove('selected'))
    } else {
        allNumberboxs.forEach(item => item.classList.remove('selected'))
        const selectedItem = document.querySelector(`ul#userInfo${selectedId}`)
        selectedItem.style.visibility = 'visible'
        const selectedNumberBox = document.querySelector(`a#number${selectedId}`)
        selectedNumberBox.classList.add('selected')
        const unselectedUserInfo1 = document.querySelector(`ul#userInfo${unSelectedArr[0]}`)
        const unselectedUserInfo2 = document.querySelector(`ul#userInfo${unSelectedArr[1]}`)
        unselectedUserInfo1.style.visibility = 'hidden'
        unselectedUserInfo2.style.visibility = 'hidden'
    }
})

