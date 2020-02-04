const main = document.querySelector("main");

const randomUserURL =
  "https://acme-users-api-rev.herokuapp.com/api/users/random";

const fetchUser = randomUserAPI => {
const firstUser = fetch(randomUserURL).then(res => res.json());
const secondUser = fetch(randomUserURL).then(res => res.json());
const thirdUser = fetch(randomUserURL).then(res => res.json());

Promise.all([firstUser, secondUser, thirdUser]).then(response => {
  renderUsers(response);
  toggleUsers();
});
};
const renderUsers = userData => {
  let html = userData
    .map((user, idx) => {
      const { fullName, id, avatar, email } = user;
      //   console.log(fullName);
      return `
      <div id='user-box'>
        <a class='links' href="#${idx + 1}">${idx + 1}</a>
            <div class='user'>
                <div>${fullName}</div>
                <div>${email}</div>
                <img src='${avatar}'/>
        </div>
    </div>
    `;
    })
    .join("");
  main.innerHTML = html;
};
const toggleUsers = () => {
  let userBox = [...document.querySelectorAll("#user-box")];
  let id = window.location.hash.slice(1);
  console.log(id);
  if (id) {
    userBox
      .filter((user, idx) => {
        idx !== id - 1;
      })
      .forEach(user => {
        user.classList.add("hidden");
        user.classList.remove("active");
      });
    userBox[id - 1].classList.remove("hidden");
    userBox[id - 1].classList.add("active");
  } else {
    userBox.forEach(user => {
      user.classList.remove("hidden", "active");
    });
  }
};

fetchUser(randomUserURL);
window.addEventListener("hashchange", toggleUsers);
document.querySelector("#three-users").addEventListener("click", toggleUsers);
