const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Welcome To Code Handbook!'))
/*
* Route to render HTML Page
*/
app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, './')
    })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
