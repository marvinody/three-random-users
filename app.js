const main = document.querySelector('main')
const title = document.querySelector('h1')
// good use of const throughout!
const urls = [
  'https://acme-users-api-rev.herokuapp.com/api/users/random',
  'https://acme-users-api-rev.herokuapp.com/api/users/random',
  'https://acme-users-api-rev.herokuapp.com/api/users/random'
]

// beautiful use of map! exactly as should be done!!
const fetchAll = Promise.all(
  urls.map(url => fetch(url).then(response => response.json()))
)

const renderUsers = () => {
  fetchAll.then(users => {
    let i = 0
    const html = users
      // take a look at the .map method to see what gets passed into this callback
      // you get the value (user), but you also get some other goodies...
      .map(user => {
        i++
        user.number = i
        return `<div class="userContainer">
                <a class="number" href="#${i}">${i}</a>
                <div class="user${i}">
                  <div class="userName">${user.fullName}</div>
                  <div class='userEmail'>${user.email}</div>
                  <div class='avatarContainer'>
                    <img class="avatar" src="${user.avatar}" alt="">
                  </div>
                </div>
              </div>`
      })
      .join('')

    main.innerHTML = html
    // returning users is a good idea here generally
    // but I'm unsure if you need it. I think it's good to do this though
    // will prevent bugs in the future if you can keep it up!
    return users
  })
}
renderUsers()

window.addEventListener('hashchange', ev => {
  ev.preventDefault() // unsure if needed but not hurtful to have
  const userNumber = window.location.hash.slice(1)
  fetchAll.then(users => {
    console.log(users) // console.log should be removed
    const clickedUser = users.find(user => {
      console.log(userNumber) // console.log should be removed
      console.log(user.number) // console.log should be removed
      // if you use parseInt, you should pass in a 2nd parameter
      // or just use Number and it'll work a little more expected
      return parseInt(userNumber) === user.number
    })
    console.log(clickedUser)
    const i = clickedUser.number
    const html = `<div class="userContainer">
    <a class="number" href="#${i}">${i}</a>
    <div class="user${i}">
      <div class="userName">${clickedUser.fullName}</div>
      <div class='userEmail'>${clickedUser.email}</div>
      <div class='avatarContainer'>
        <img class="avatar" src="${clickedUser.avatar}" alt="">
      </div>
    </div>
  </div>`
    main.innerHTML = html
  })
})

// hmmmmm
// not the way we were expecting but it's alright. I would like to see your code
// in hash change handle having to show everyone
title.addEventListener('click', ev => {
  window.location.hash = ''
  renderUsers()
})
