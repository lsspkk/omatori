var parser = require('./parse')

const express = require('express')
const request = require('request')

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

// https://github.com/request/request
app.get('/query', (req, res) => {
  console.log(1)
  request({
    method: 'GET',
    uri: 'https://www.tori.fi/pirkanmaa?q=n%E4ytt%F6&cg=5030&w=111&st=s&st=k&st=g&c=5036&ca=18&l=0&md=th',
    encoding: 'latin1'
  },
    (error, response, body) => {
      console.log(error)
      console.log(response && response.statusCode)

      res.send(parser.parse(response.body))
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
