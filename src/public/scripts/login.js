import Cookies from 'js-cookie'

document.getElementById('login').addEventListener('submit', async (e) => {
    e.preventDefault()
    const credentials = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    }
    let response = await fetch('/login', {
        method: 'POST',
        body: credentials
    })
    response = await response.json()
    Cookies.set('sessionToken', response.token)
})