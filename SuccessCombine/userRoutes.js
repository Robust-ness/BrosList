//Dependencies
const express = require('express')
const path = require('path')





//Server-side variables
const port = process.env.port || 3000  //Default test port 3000 otherwise process environment port value generated from Heroku
const app = express()



//App use
app.use(express.static(__dirname))



//Initialize Server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`)
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'index.html'))
})

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.address);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });