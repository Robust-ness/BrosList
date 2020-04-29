import Cookies from '/scripts/js.cookie.mjs'

document.getElementById('post').addEventListener('submit', async (e) => {
    e.preventDefault()
    var formdata = new FormData();
    formdata.append("itemPicture", document.getElementById('item-image').files[0], document.getElementById('item-image').value);
    formdata.append("postingTitle", document.getElementById('postingTitle').value)
    formdata.append("price", Number(document.getElementById('price').value))
    formdata.append("city", document.getElementById('city').value)
    formdata.append("description", document.getElementById('description').value)
    // itemPicture, document.getElementById('item-image').src

    let res = await fetch('/products/create', {
        method: 'POST',
        body: formdata,
        headers: {
            'Authorization': `Bearer ${Cookies.get('sessionToken')}`
        }
    })
    console.log(await res.json())
})

if (!Cookies.get('sessionToken')) {
    window.location.replace('/login')
}

