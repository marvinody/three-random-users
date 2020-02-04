const USERS_URL = `https://acme-users-api-rev.herokuapp.com/api/users/random`;
const cards = document.querySelector("#cards");

const renderPage = user => {
  const pager = document.querySelector("#pager");
  const _idx = window.location.hash.slice(1) || 0;
  const user1 = user[0];
  const user2 = user[1];
  const user3 = user[2];

  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.slice(1);
    //want to add a way to select only by idx
  });

  const pages = new Array(user.length).fill("").map((_, idx) => {
    return {
      selected: _idx == idx,
      text: idx + 1,
      idx
    };
  });

  const html = pages
    .map(page => {
      return `
    <li ${page.selected ? "class = selected" : ""}>
    <a href = '#${page.idx}'>${page.text}</a>
    </li>
    `;
    })
    .join("");

  pager.innerHTML = html;
  // console.log(pager);
};

const renderUsers = user => {
  const html = user
    .map((user, idx) => {
      return `
      <div id = '${idx}'>
        <p>${user.fullName}</p>
        <p> ${user.email}</p>
        <img id = 'image' src="${user.avatar}">
        </div>  
      
        `;
    })
    .join("");

  cards.innerHTML = html;
};

Promise.all([fetch(USERS_URL), fetch(USERS_URL), fetch(USERS_URL)])
  .then(response => Promise.all(response.map(r => r.json())))
  .then(data => {
    console.log(data[0]);
    console.log(data[1]);
    console.log(data[2]);
    renderUsers(data);
    renderPage(data);
  });
