const usersBox = document.querySelector('.users')
const links = document.querySelector('.links')
const usersURL = 'https://acme-users-api-rev.herokuapp.com/api/users/random'
let users = []
let idx = window.location.hash.slice(1) //pulls the number after the # as a string


window.addEventListener('hashchange', () => { //is waiting for any change in has, click event not needed
    const idStr = window.location.hash.slice(1) //index after has as string needed because data-is is a string
    const idNum = window.location.hash.slice(1) * 1 //index as a number, needed for logic
    const userCards = [...document.querySelectorAll('.user')] //arr of all users '...' needed because queryselector all returns an arr-like object, needs to be coerced into an arr
    console.log(idStr)
    if (Number.isNaN(idNum) || idNum > userCards.length || idNum <= 0) { //checking to make sure the number is workable, meaning withhin the scope of uor users (not too high or too low)
        userCards.forEach(card => {
            card.classList.remove('selected', 'hidden') //if it is out of scope, remove all classes
   
        })
    } else {
       

        userCards.forEach(card => {
        //if its not out of our scope then we need to check to see if it was clicked

            if (card.getAttribute('data-id') === idStr) { // if it was clicked (data-id === the # number but as a string) add class selected remove hidden. if no class it wont break
              
                card.classList.add('selected')
                card.classList.remove('hidden')
            } else { //if it wasnt selected do the opposite
                card.classList.remove('selected')
                card.classList.add('hidden')
            }
        })
    }

})



const renderUsers = ()=>{

    const html = users.map((user,idx) =>{
        return `
            <div class='user' data-id=${idx+1}>
                <p> ${user.fullName} </p>
                <p> ${user.email} </p>
                <img src="${user.avatar}" alt="User Avatar">
            </div>
        `
    }).join('')

    usersBox.innerHTML = html
    
}

Promise.all([fetch(usersURL), fetch(usersURL), fetch(usersURL)])
    .then(response => Promise.all(response.map(r => r.json())))
    .then(data => {
        for(let i =0;i<data.length;i++){
            users.push(data[i])
        }
        renderUsers(users)
        renderPages()
    })


function renderPages(){
    let pageTotal = 3
    let html = []
    for (let i = 0; i < pageTotal; i++) {
        html.push(
          `<div class='' data-id=${i+1}><a href='#${i+1}'>${i+1}</a></div>` // for each link you need a data-id to compare to the # number (as a string)
        ) // i did i+1 in order for the links to start at 1, and to keep everything consistent
    }
    links.innerHTML = html.join('')
  }



