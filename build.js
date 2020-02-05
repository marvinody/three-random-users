// should be const
let random = 'https://acme-users-api-rev.herokuapp.com/api/users/random'
// although tagName works, try to either give something an id or a class and use that to query
// makes it more resistant to breaking...I can give some personal horror stories of my code scrapers
// breaking when sites updated their html
const rootId = document.getElementsByTagName('MAIN')[0]
const h1 = document.getElementsByTagName('H1')[0]
console.log(h1)
const getData = (api) => {
	// notice how you're nesting the .thens? Lik,e instead of chaining them off each other
	// you put another .then literally inside the other .then
	// we definitely want to try to avoid this if possible because we creep back
	// onto callback hell
	Promise.all([fetch(api), fetch(api), fetch(api)]).then((response) =>
		Promise.all(response.map((result) => result.json())).then((data) => {
			renderHTML(data) // good pass to another fn
		}))
}

const renderHTML = (apiCalls) => {
	apiCalls
		// ooooo, nice. not many people know the idx part!
		.map((user, idx) => {
			idx++
			// I would like to see this split up into multilines, but preference
			// also, interesting id using user.id...we'll revisit that idea later...
			return `<div id="card-holder"><a href="#${user.id}">${idx}</a><div><p>${user.fullName}</p> <p>${user.email}</p> <img src="${user.avatar}" alt="${user.fullName}"/></div></div>`
		})
		// beautiful chaining!
		// .map into a foreach with both parts doing exactly
		.forEach((user) => {
			rootId.innerHTML += user
		})
}

// I gotta say, it took me a while to understand how this was working
// that being said, if you are comfortable with this, beautiful
window.addEventListener('hashchange', (event) => {
	const id = window.location.hash.slice(1)
	const arrId = [...document.querySelectorAll('a[href]')]
	arrId.forEach((a) => {
		// actually, regarding the comment on the html above, if you do that, it will break this I believe
		// because space counts as a text node in html. There's ways to fix this and get the best of all words
		// we can go over that during OH one day if you want...not super important
		let div = a.nextSibling
		if (a.hash.slice(1).includes(id)) {
			a.classList.add('border-link')
			div.classList.remove('hide')
		} else {
			a.classList.remove('border-link')
			div.classList.add('hide')
		}
	})
})

// I would have preferred to not see any click events but I think you show
// you know the hashchange event well! A good thought experiment might be how you
// would change your hashchange handler to handle all the cases (including blank # to show all)
h1.addEventListener('click', (event) => {
	const arrId = [...document.querySelectorAll('a[href]')]
	arrId.forEach((a) => {
		a.classList.remove('border-link')
		a.nextSibling.classList.remove('hide')
	})
})
getData(random)
