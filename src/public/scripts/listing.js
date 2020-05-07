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

    let arr = Cookies.get('cart').split(',')
     if (arr.some(el => new RegExp(res._id, 'gm').test(el))) {
        document.getElementById('addCart').innerText = 'In Cart'
     } else {
        document.getElementById('addCart').addEventListener('click', async (e) => {
            e.preventDefault()
            let res = await (await fetch(window.location.pathname + '/info', {
                headers: {
                    'Content-Type': 'application/json',
                }
            })).json()
            if (!Cookies.get('cart')) {
                
        
                Cookies.set('cart', [res._id + ':' + document.getElementById('quantity').selectedOptions[0].value].toString())
            } else {
                let arr = Cookies.get('cart').split(',')
                arr.push(res._id + ':' + document.getElementById('quantity').selectedOptions[0].value)
                console.log(arr)
                Cookies.set('cart', arr.toString())
            }
            window.location.replace(window.location.pathname)
        })
     }

     if (Cookies.get('sessionToken')) {
        let response = await fetch('/users/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('sessionToken')}`
            }
        })
        response = await response.json()
        document.getElementById('addCart').innerText = 'In Cart'
        if (response._id == res.owner) {
            document.getElementById('addCart').innerText = 'Delete Post'
            document.getElementById('addCart').addEventListener('click', async (e) => {
                e.preventDefault()
                let resp = await fetch(window.location.pathname, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('sessionToken')}`
                    }
                })
                window.location.replace('/')
            })
        }
    }

    //<option value="1">1</option>
    for (let x = 1; x <= res.quantity; x++) {
        document.getElementById('quantity').innerHTML = document.getElementById('quantity').innerHTML + `<option value="${x}">${x}</option>`
    }
    
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



