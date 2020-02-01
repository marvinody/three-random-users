let links = document.querySelector(".links");
let nameCard = document.querySelector(".nameCard");
let users = document.querySelector(".users");
let list;
async function getUsers() {
  const user1 = fetch(
    "https://acme-users-api-rev.herokuapp.com/api/users/random"
  );
  const user2 = fetch(
    "https://acme-users-api-rev.herokuapp.com/api/users/random"
  );
  const user3 = fetch(
    "https://acme-users-api-rev.herokuapp.com/api/users/random"
  );
  const threeUsers = Promise.all([user1, user2, user3]);

  return threeUsers
    .then(response => {
      const user1Data = response[0];
      const user2Data = response[1];
      const user3Data = response[2];
      const threeUserData = [
        user1Data.json(),
        user2Data.json(),
        user3Data.json()
      ];
      return Promise.all(threeUserData);
    })
    .then(data => {
      const dataUser1 = data[0];
      const dataUser2 = data[1];
      const dataUser3 = data[2];
      const dataThreeUsers = [dataUser1, dataUser2, dataUser3];
      return dataThreeUsers;
    });
}
//getUsers();
getUsers().then(data => {
  let count = 0;
  let html = data
    .map(user => {
      count++;
      return ` <a class='users' href="https://acme-users-api-rev.herokuapp.com/api/users/random">${count}</a>`;
    })
    .join("");
  links.innerHTML = html;

  links.addEventListener("click", function(ev) {
    ev.preventDefault();
    console.log(data);
    list = `<li>${data[ev.target.innerHTML - 1].fullName}</li><li>${
      data[ev.target.innerHTML - 1].email
    }</li><li style="margin-top:40px"> <img class='image' src=${
      data[ev.target.innerHTML - 1].avatar
    }></li>`;
    nameCard.innerHTML = list;
    return list;
  });
  nameCard.innerHTML = list;
});
