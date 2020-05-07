const addMovie = async function(e) {
    e.preventDefault()
    document.getElementById('field').innerHTML = ''
    //console.log(e.target)
    let response = await fetch('/movies', {
        body: JSON.stringify({
            "title": document.getElementById('title').value,
            "genre": document.getElementById('genre').value,
            "year" : String(document.getElementById('year').value)
        }),
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          }
    }).then(async r => {
        return await r.json()
    })
    document.getElementById('field').insertAdjacentHTML('afterbegin', JSON.stringify(response))
}

const findMovieID = async function(e) {
    e.preventDefault()
    document.getElementById('field').innerHTML = ''
    let response = await fetch('/movies/' + document.getElementById('id').value).then(async r => {
        return await r.json()
    })
    document.getElementById('field').insertAdjacentHTML('afterbegin', JSON.stringify(response))
}

const deleteMovieID = async function(e) {
    e.preventDefault()
    document.getElementById('field').innerHTML = ''
    let response = await fetch('/movies/' + document.getElementById('id').value, {
        method: 'DELETE'
    }).then(async r => {
        return await r.json()
    })
    document.getElementById('field').insertAdjacentHTML('afterbegin', JSON.stringify(response))
}

const modifyMovieID = async function(e) {
    e.preventDefault()
    document.getElementById('field').innerHTML = ''
    let response = await fetch('/movies/' + document.getElementById('id').value, {
        body: JSON.stringify({
            "title": document.getElementById('title').value,
            "genre": document.getElementById('genre').value,
            "year" : String(document.getElementById('year').value)
        }),
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
          }
    }).then(async r => {
        return await r.json()
    })
    document.getElementById('field').insertAdjacentHTML('afterbegin', JSON.stringify(response))
}



document.getElementById('newMovie').addEventListener('click', function(e) {
    addMovie(e)
})
document.getElementById('findMovieID').addEventListener('click', function(e) {
    findMovieID(e)
})
document.getElementById('deleteMovieID').addEventListener('click', function(e) {
    deleteMovieID(e)
})
document.getElementById('modifyMovieID').addEventListener('click', function(e) {
    modifyMovieID(e)
})