const user1 = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random').then((res) => res.json())
const user2 = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random').then((res) => res.json())
const user3 = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random').then((res) => res.json())

// good promise.all!
Promise.all([user1, user2, user3]).then((res) => {
  renderUsers(res)
  toggleUsers()
})

const usersList = document.querySelector('#users')
const usersTitle = document.querySelector('h1 a')

const renderUsers = (users) => {
  const html = users
    // good use of map and the ind parameter
    .map((user, ind) => {
      // cool destructuring
      const { fullName, email, avatar, id } = user
      // above and beyond attempt?
      fetch(`https://acme-users-api-rev.herokuapp.com/api/users/${id}/notes`)
        .then((res) => res.json())
        .then((res) => { }) // but I guess didn't have time to get adding notes
      // no worries, not part of it
      // nice email integration. in real applications, we try to hide emails a bit
      // to prevent spammers and scrapers from detecting it. (obviously not expected here,
      // just extra info)
      return `<li>
        <p><a class="pager" href="#${ind + 1}">${ind + 1}</a></p>
        <div class="user user-${ind + 1}">
          <p>${fullName}</p>
          <p><a href="mailto:${email}" title="${fullName}">${email}</a></p>
          <p><img src="${avatar}" alt="${fullName}" title="${fullName}" /></p>
        </div>
      </li>`
    })
    .join('')
  usersList.innerHTML = html
}


const toggleUsers = () => {
  const id = window.location.hash.slice(1)
  const users = [...document.querySelectorAll('#users > li')]

  if (id) {
    // good use of filter->foreach and a good small fn in your filter
    users.filter((user, ind) => ind !== id - 1).forEach((user) => {
      user.classList.add('hidden')
      user.classList.remove('active')
    })
    users[id - 1].classList.remove('hidden')
    users[id - 1].classList.add('active')
  } else {
    users.forEach((user) => {
      user.classList.remove('hidden', 'active')
    })
  }
}

window.addEventListener('hashchange', toggleUsers)
// clicking on title doesn't seem to do anything for me...
// if 1 person was active and I click on title, still leaves same person active
usersTitle.addEventListener('click', toggleUsers)
