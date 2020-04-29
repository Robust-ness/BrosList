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
    if (response.error) {
        if (confirm("Incorrect Login info")) {
            console.log('the user has pressed okay')
        } else {
            console.log('the user has pressed cancel')
        }
    } else {
        Cookies.set('sessionToken', response.token)
        window.location.replace('/')
    }
    
})