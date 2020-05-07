import Cookies from '/scripts/js.cookie.mjs'
async function createPage () {if (!Cookies.get('sessionToken')) {
    window.location.replace('/login')
} else {
    let response = await fetch('/users/me', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('sessionToken')}`
        }
    })
    response = await response.json()
    document.querySelector('.info-name').innerText = `Your name: ${response.firstName} ${response.lastName}`
    document.querySelector('.info-username').innerText =  `Your username: ${response.username}`
    document.querySelector('.info-email').innerText = `Your registered email: ${response.email}`
}}

createPage()



