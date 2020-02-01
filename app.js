const cards = document.querySelector("#cards");

let users = []


const USER1_URL = `https://acme-users-api-rev.herokuapp.com/api/users/random`;



const renderUsers = user => {

  
  const html = user
    .map(user => {
      return `
      <div>
        <h2>${user.fullName}</h2>
        <p> ${user.email}</p>
        <img src="${user.avatar}">
        </div>
        
        `;
    })
    .join("");

  cards.innerHTML = html;
};

Promise.all([fetch(USER1_URL), fetch(USER1_URL), fetch(USER1_URL)])
  .then(response => Promise.all(response.map(r => r.json())))
  .then(data => {
    users = data
    console.log(data[0]);
    console.log(data[1]);
    console.log(data[2]);
    renderUsers(data);
  });
