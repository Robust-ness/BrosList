import Cookies from '/scripts/js.cookie.mjs'
async function createPage () {
    if (!Cookies.get('sessionToken')) {
        // document.getElementById('hellouser').innerText = 'Hello, Guest!'
        // document.getElementById('usermanage').innerHTML = ''
        // document.getElementById('loginlink').href = '/login'
    } else {
        // let response = await fetch('/users/me', {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${Cookies.get('sessionToken')}`
        //     }
        // })
        // response = await response.json()

        document.getElementById('login').innerText = 'Log Out'
        document.getElementById('loginlink').href = '/logout'
    }
    let res = await fetch(window.location.pathname + '/info', {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    res = await res.json()
    // console.log('data:image/png;base64,' + )
    if (!res) {
        window.location.replace('/')
    } else {
        document.getElementById('postingTitle').innerText = res.postingTitle
        document.getElementById('description').innerText = res.description
        document.getElementById('price').innerText = `$${res.price}`
        document.getElementById('itemPicture').src = `data:image/png;base64,${res.itemPicture}`
    }
    console.log(res)
}

createPage()



