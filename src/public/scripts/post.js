import Cookies from '/scripts/js.cookie.mjs'

document.getElementById('post').addEventListener('submit', async (e) => {
    e.preventDefault()
    var formdata = new FormData();
    formdata.append("itemPicture", document.getElementById('item-image').files[0], document.getElementById('item-image').value);
    formdata.append("postingTitle", document.getElementById('postingTitle').value)
    formdata.append("price", Number(document.getElementById('price').value))
    formdata.append("city", document.getElementById('city').value)
    formdata.append("description", document.getElementById('description').value)

    let res = await fetch('/products/create', {
        method: 'POST',
        body: formdata,
        headers: {
            'Authorization': `Bearer ${Cookies.get('sessionToken')}`
        }
    })
    res = await res.json()
    window.location.replace('/product/' + res._id)
})

if (!Cookies.get('sessionToken')) {
    window.location.replace('/login')
}

