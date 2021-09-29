const express = require("express")
const app = express()
const path = require("path")
app.use('/login', express.static(path.resolve(__dirname, '../build/index.html')))
app.use('/', express.static(path.resolve(__dirname, '../build')))

app.listen(3001, () => {
    console.log('http://localhost:3000')
  })