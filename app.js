const main = document.querySelector('main')
// nice break to make line length easy to read
const randomUserURL =
  'https://acme-users-api-rev.herokuapp.com/api/users/random'

// this takes in a parameter called randomUserAPI but you use randomUserURL instead
// seems silly but I see the intention! be aware of unused variables
const fetchUser = randomUserAPI => {
  const firstUser = fetch(randomUserURL).then(res => res.json())
  const secondUser = fetch(randomUserURL).then(res => res.json())
  const thirdUser = fetch(randomUserURL).then(res => res.json())
  Promise.all([firstUser, secondUser, thirdUser]).then(response => {
    // nice .then function here
    // doing the right stuff!
    renderUsers(response)
    toggleUsers()
  })
}
const renderUsers = userData => {
  let html = userData
    .map((user, idx) => {
      // ooooo weeeee, nice destructuring
      const { fullName, id, avatar, email } = user
      // get rid of commented out code that has no uses...
      //   console.log(fullName);
      return `
      <div>
        <a class='links' href="#${idx + 1}">${idx + 1}</a>
            <div class='user'>
                <div>${fullName}</div>
                <div>${email}</div>
                <img src='${avatar}'/>
        </div>
    </div>
    `
    })
    .join('')
  main.innerHTML = html
}
const toggleUsers = () => {
  let userBox = [...document.querySelectorAll('main > div')]
  let id = window.location.hash.slice(1)
  if (id) {
    userBox[id - 1].classList.remove('hide')
    userBox[id - 1].classList.add('show')
    // great chaining of array methods!!!
    // perfect use of each one.
    userBox
      .filter((user, idx) => {
        console.log(user.classList.value)
        idx !== id - 1 // you're not returning anything here...
        // if you did, it would work well!
      })
      .forEach(user1 => {
        user1.classList.add('hide')
        user1.classList.remove('show')
      })
  } else {
    userBox.forEach(user => {
      user.classList.remove('hide', 'show')
    })
  }
}

fetchUser(randomUserURL)
// beautiful, reusing a function for 2 event handlers!
window.addEventListener('hashchange', toggleUsers)
// this should have been done without adding a .click but that's alright.
// it actually works without the following line!
document.querySelector('#three-users').addEventListener('click', toggleUsers)


// solid improvement over your array methods!
