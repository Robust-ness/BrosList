const express = require('express')
const Movie = require('../models/movie')
const router = new express.Router()
const path = require('path')

router.post('/movies', async (req, res) => {
    try {
        console.log(req.body)
        const movie = new Movie(req.body)
        res.send(req.body)
        await movie.save()
    }
    catch(e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.get('/movies/:id', async (req, res) => {
    try{
        let movie = await Movie.findById(req.params.id)
        console.log(movie)
        if (movie != null) {
            res.send(movie)
        } else {
            res.send({"not":"so", "fast":"homie"})
        }
        
    } catch(e) {
        res.status(500).send(e)
    }
})

router.delete('/movies/:id', async (req, res) => {
    try{
        const movie = await Movie.findByIdAndDelete(req.params.id)
        if (movie != null) {
            res.send(movie)
        } else {
            res.send({"not":"so", "fast":"homie"})
        }
    } catch(e) {
        res.status(500).send(e)
    }
})

router.patch('/movies/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    console.log(updates)
    const allowedUpdates = ['genre']
    console.log(req.body)
    let allowed = {}
    const isValidOperation = updates.forEach(update => {
        console.log(update)
        if (allowedUpdates.includes(update)) {
            console.log(update, req.body[update])
            allowed[update] = req.body[update]
        }
    })
    try{
        console.log('final: ' + JSON.stringify(allowed))
        const movie = await Movie.findByIdAndUpdate(req.params.id, allowed, {new: true})
        if (movie != null) {
            res.send(movie)
        } else {
            res.send({"not":"so", "fast":"homie"})
        }

    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'index.html'))
})

module.exports = router