let links = document.querySelector(".links");
let nameCard = document.querySelector(".nameCard");
let users = document.querySelector(".users");
let list;
let dataThreeUsers = [];
const getUsers = function() {
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
      dataThreeUsers = [dataUser1, dataUser2, dataUser3];
      console.log(data);
      //return dataThreeUsers;
    });
};
getUsers();
console.log(dataThreeUsers);

links.addEventListener("click", function(ev) {
  ev.preventDefault();
  console.log(ev.target.innerHTML);
  document.querySelector(`.user${ev.target.innerHTML}`).innerHTML =
    dataThreeUsers[ev.target.innerHTML - 1].fullName +
    dataThreeUsers[ev.target.innerHTML - 1].email +
    `<img class='image' src=${dataThreeUsers[ev.target.innerHTML - 1].avatar}>`;
});
// getUsers();
// getUsers().then(dataThreeUsers => {
//   console.log(dataThreeUsers);
//   let count = 0;
//   let html = dataThreeUsers
//     .map(user => {
//       count++;
//       return `<div class='namecarduser'> <a class='users' href=''>${count}</a><div class='nameC'></div></div>`;
//     })
//     .join("");
//   links.innerHTML = html;

//   links.addEventListener(" click ", function(ev) {
//     ev.preventDefault();
//     //console.log(data);
//     list = `<li>${data[ev.target.innerHTML - 1].fullName}</li><li>${
//       data[ev.target.innerHTML - 1].email
//     }</li><li style="margin-top:40px"> <img class='image' src=${
//       data[ev.target.innerHTML - 1].avatar
//     }></li>`;
//     nameCard.innerHTML = list;
//     return list;
//   });
//   nameCard.innerHTML = list;
// });
