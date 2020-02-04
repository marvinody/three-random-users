

  const API = 'https://acme-users-api-rev.herokuapp.com/api/users/random';
  const usersList = document.querySelector('#usersList');


  window.addEventListener('hashchange', (ev)=> {
    const id = window.location.hash.slice(1)
    console.log(id)
  });
  
  function fetchUserData() {
    const user1 = fetch(API)
    const user2 = fetch(API)
    const user3 = fetch(API)
    const allResponses = Promise.all([user1, user2, user3]);
  
    return allResponses
      .then(response => {
        const user1info = response[0]
        const user2info = response[1]
        const user3info = response[2]

        return Promise.all([user1info.json(), user2info.json(), user3info.json()]);
      })
      .then(JSONs => {
        const user1JSON = JSONs[0]
        const user2JSON = JSONs[1]
        const user3JSON = JSONs[2]

        return [user1JSON, user2JSON, user3JSON];
      })
      .then ((userData)=> {
        return html = userData.map( function(user, index) {
          return `<div id ='usersList'>
                    <div id = 'people'>
                      <div id = 'page'> <a href='#${index}'>${index + 1 }</a></div>
                      <div>${ user.firstName }</div>
                      <div>${ user.email }</div>
                      <img  src = ${user.avatar}>
                    </div>
                  </div>`
      })
      .join('');
      })
      .then(html => usersList.innerHTML = html)
   }
  
    fetchUserData();
