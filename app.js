const user1 = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random').then((res) => res.json());
const user2 = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random').then((res) => res.json());
const user3 = fetch('https://acme-users-api-rev.herokuapp.com/api/users/random').then((res) => res.json());

Promise.all([ user1, user2, user3 ]).then((res) => {
  renderUsers(res);
  toggleUsers();
});

const usersList = document.querySelector('#users');
const usersTitle = document.querySelector('h1 a');

const renderUsers = (users) => {
  const html = users
    .map((user, ind) => {
      const { fullName, email, avatar, id } = user;
      fetch(`https://acme-users-api-rev.herokuapp.com/api/users/${id}/notes`)
      .then((res) => res.json())
      .then((res) => {});
      return `<li>
        <p><a class="pager" href="#${ind + 1}">${ind + 1}</a></p>
        <div class="user user-${ind + 1}">
          <p>${fullName}</p>
          <p><a href="mailto:${email}" title="${fullName}">${email}</a></p>
          <p><img src="${avatar}" alt="${fullName}" title="${fullName}" /></p>
        </div>
      </li>`;
    })
    .join('');
  usersList.innerHTML = html;
};


const toggleUsers = () => {
  const id = window.location.hash.slice(1);
  const users = [ ...document.querySelectorAll('#users > li') ];

  if (id) {
    users.filter((user, ind) => ind !== id - 1).forEach((user) => {
      user.classList.add('hidden');
      user.classList.remove('active');
    });
    users[id - 1].classList.remove('hidden');
    users[id - 1].classList.add('active');
  } else {
    users.forEach((user) => {
      user.classList.remove('hidden', 'active');
    });
  }
};

window.addEventListener('hashchange', toggleUsers);
usersTitle.addEventListener('click', toggleUsers);
