

  const API = 'https://acme-users-api-rev.herokuapp.com/api/users/random';
  const usersList = document.querySelector('#usersList');
  const pager = document.querySelector('#pager');
  
  usersList.addEventListener('click', ()=> {
    console.log('I click')
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
//       .then ((userData)=> {
//           //const [user1, user2, user3] = userData
//           return html = userData.map( user => `
//           <div id ='usersList'>
//             <a href = #{}
//             <div>${ user.firstName }</div>
//             <div>${ user.email }</div>
//             <img  src = ${user.avatar}>
//           </div>`
//           ).join('');
         
        
                     
//           }).then(html => usersList.innerHTML = html)
         

//   }
.then ((userData)=> {
   
    return html = userData.map( function(user, index) {return `
    <div id ='usersList'>
    <a href='#${index}'>${index + 1 }</a>
      <div>${ user.firstName }</div>
      <div>${ user.email }</div>
      <img  src = ${user.avatar}>
    </div>`
}).join('');
   
  
               
    }).then(html => usersList.innerHTML = html)
   

}
  
//   const renderPager = ()=> {
//     const _idx = window.location.hash.slice(1) || 0;
//     const totalPages = 3;
//     const pages = (new Array(totalPages)).fill('').map( (_, idx)=> {
//       return {
//         selected: _idx == idx,
//         text: idx + 1,
//         idx
//       };
//     });
//     console.log(pages)
//     const html = pages.map( page => {
//       return `
//         <li ${ page.selected ? 'class=selected' : ''}>
//           <a href='#${page.idx}'>${ page.text }</a>
//         </li>
//       `;
//     }).join('');

//     pager.innerHTML = html;

//   };
    
//     renderPager();
    fetchUserData();
    console.log(window.location.hash)
    
    
 
  // We return a promise so we can also wait here:
  //fetchData()
   // .then(JSONs => console.log('Our JSONS: ', JSONs));

   
  

  

  



//so you can see that the 'render' functions are called inside the .thens
// 5:28
// and the render functions gets passed in the data
// 5:28
// so it can use it
// 5:29
// that's one way
// 5:32
// did that help?
// 5:32
// there's another way to do it but this aligns more closely with some concepts we'll use later
// 5:33
// essentially, having the data  be passed into your render function. so your render function ONLY changes the display. no fetching or funky stuff inside of it

//const API = 'https://acme-users-api-rev.herokuapp.com/api/users/random';
