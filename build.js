let random = "https://acme-users-api-rev.herokuapp.com/api/users/random";
const rootId = document.getElementsByTagName("MAIN")[0];
const h1 = document.getElementsByTagName("H1")[0];
console.log(h1);
const getData = (api) => {
	Promise.all([fetch(api), fetch(api), fetch(api)]).then((response) =>
		Promise.all(response.map((result) => result.json())).then((data) => {
			renderHTML(data);
		})
	);
};

const renderHTML = (apiCalls) => {
	apiCalls
		.map((user, idx) => {
			idx++;
			return `<div id="card-holder"><a href="#${user.id}">${idx}</a><div><p>${user.fullName}</p> <p>${user.email}</p> <img src="${user.avatar}" alt="${user.fullName}"/></div></div>`;
		})
		.forEach((user) => {
			rootId.innerHTML += user;
		});
};

window.addEventListener("hashchange", (event) => {
	const id = window.location.hash.slice(1);
	const arrId = [...document.querySelectorAll("a[href]")];
	arrId.forEach((a) => {
		let div = a.nextSibling;
		if (a.hash.slice(1).includes(id)) {
			a.classList.add("border-link");
			div.classList.remove("hide");
		} else {
			a.classList.remove("border-link");
			div.classList.add("hide");
		}
	});
});

h1.addEventListener("click", (event) => {
	const arrId = [...document.querySelectorAll("a[href]")];
	arrId.forEach((a) => {
		a.classList.remove("border-link");
		a.nextSibling.classList.remove("hide");
	});
});
getData(random);
