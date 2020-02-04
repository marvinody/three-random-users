let links = document.querySelector(".links");
let nameCard = document.querySelector(".nameCard");
let users = document.querySelector(".users");
let list;
let dataThreeUsers = [];
const getUsers = async function() {
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

  const response = await threeUsers;
  const user1Data = response[0];
  const user2Data = response[1];
  const user3Data = response[2];
  const threeUserData = [user1Data.json(), user2Data.json(), user3Data.json()];
  const data = await Promise.all(threeUserData);
  const dataUser1 = data[0];
  const dataUser2 = data[1];
  const dataUser3 = data[2];
  dataThreeUsers = [dataUser1, dataUser2, dataUser3];
};
getUsers();
function reload() {
  location.reload();
}

function removeUsers() {
  let index = location.hash.slice(1);
  index = parseInt(index);
  for (let i = 0; i < 3; ) {
    document.querySelector(`.user${index + 1}`).innerHTML = "";

    document.querySelector(`.user${index + 1}`).classList.remove("card");
  }
}
// links.addEventListener("click", function() {
//   removeUsers();
// });
window.addEventListener("hashchange", function(ev) {
  //removeUsers();
  getUsers();
  let index = location.hash.slice(1);
  index = parseInt(index);
  console.log(typeof index);
  if (index === 3) {
    for (let i = 0; i < 3; i++) {
      console.log(i);
      let userSelector = document.querySelector(`.user${i + 1}`);
      document.querySelector(`.user${i + 1}`).innerHTML =
        dataThreeUsers[i].fullName +
        "<br>" +
        dataThreeUsers[i].email +
        "<br>" +
        `<img style='margin-top:25px' class='image' src=${dataThreeUsers[i].avatar}>`;
      userSelector.classList.add("card");
    }
  }
  document.querySelector(`.user${index + 1}`).innerHTML =
    dataThreeUsers[index].fullName +
    "<br>" +
    dataThreeUsers[index].email +
    "<br>" +
    `<img  style='margin-top:25px' class='image' src=${dataThreeUsers[index].avatar}>`;
  document.querySelector(`.user${index + 1}`).classList.add("card");
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
