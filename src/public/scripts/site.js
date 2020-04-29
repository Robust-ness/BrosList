import Cookies from '/scripts/js.cookie.mjs'
async function createPage () {if (!Cookies.get('sessionToken')) {
    document.getElementById('hellouser').innerText = 'Hello, Guest!'
    document.getElementById('usermanage').innerHTML = ''
    document.getElementById('loginlink').href = '/login'
} else {
    let response = await fetch('/users/me', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('sessionToken')}`
        }
    })
    response = await response.json()
    document.getElementById('login').innerText = 'Log Out'
    document.getElementById('loginlink').href = '/logout'
    document.getElementById('hellouser').innerText = `Hello, ${response.firstName}`
}}

createPage()



