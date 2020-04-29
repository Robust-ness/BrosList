import Cookies from '/scripts/js.cookie.mjs'

document.getElementById('login').addEventListener('submit', async (e) => {
    console.log(document.getElementById('email'))
    e.preventDefault()
    const credentials = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    }
    console.log(credentials)
    let response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
            'Content-Type': 'application/json',
          },
    })
    response = await response.json()
    Cookies.set('sessionToken', response.token)
})