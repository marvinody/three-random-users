// OK!
const USERS_URL = `https://acme-users-api-rev.herokuapp.com/api/users/random`
const cards = document.querySelector('#cards')

const renderPage = user => {
  const pager = document.querySelector('#pager')
  // if you have to underscore it, there's probably a better name for it
  // maybe id or page or curr
  // also, || 0 is a nice hack. Just try not to overuse it everywhere...
  // fine here and in simple cases similar to this tho
  const _idx = window.location.hash.slice(1) || 0
  // unused variables
  const user1 = user[0]
  const user2 = user[1]
  const user3 = user[2]

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1)
    // yes! any thoughts?
    //want to add a way to select only by idx
  })

  const pages = new Array(user.length).fill('').map((_, idx) => {
    return {
      selected: _idx == idx,
      text: idx + 1,
      idx
    }
  })
  //
  const html = pages
    .map(page => {
      return `
    <li ${page.selected ? 'class = selected' : ''}>
    <a href = '#${page.idx}'>${page.text}</a>
    </li>
    `
    })
    .join('')

  pager.innerHTML = html
  // if code is commented out, you can probably delete it before you submit or 'push to production'
  // console.log(pager);
}

const renderUsers = user => {
  const html = user
    .map((user, idx) => {
      // hmm, so it seems like img has an id of image. which is constant.
      // so there are user.length img tags with same ID. Probably should change to class
      // to have the html make sense
      return `
      <div id = '${idx}'>
        <p>${user.fullName}</p>
        <p> ${user.email}</p>
        <img id = 'image' src="${user.avatar}">
        </div>

        `
    })
    .join('')

  cards.innerHTML = html
}

Promise.all([fetch(USERS_URL), fetch(USERS_URL), fetch(USERS_URL)])
  // good use of map to reduce code duplication
  .then(response => Promise.all(response.map(r => r.json())))
  .then(data => {
    // hmmmmmm. that's a lot of unneeded console.logs. Maybe get rid of them
    console.log(data[0])
    console.log(data[1])
    console.log(data[2])
    renderUsers(data)
    renderPage(data)
  })
