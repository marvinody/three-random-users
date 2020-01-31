const main = document.querySelector('main');

const randomUserURL = "https://acme-users-api-rev.herokuapp.com/api/users/random";

const fetchUser = async randomUserAPI => {
    const firstUser = fetch(randomUserAPI).then(res => res.json())
    const secondUser = fetch(randomUserAPI).then(res => res.json())
    const thirdUser = fetch(randomUserAPI).then(res => res.json())

    const responses = await Promise.all([firstUser, secondUser, thirdUser]).then(res => {
        let userData = res.map(data => {
            return data;
        })
        // console.log(userData)
        return userData;
    })
    return responses;
}

const render = () => {
    console.log('Hello in render')
    fetchUser(randomUserURL).then(userData => {
        let html = userData.map(data => {
            console.log(data)
            const {fullName, email} = data;
            return `
                <div>${fullName} <span>${email}</span></div>
            `
        }).join('')
        main.innerHTML = html;
    })
}
render()
