var parser = require('./parse')

const express = require('express')
const request = require('request')
const cors = require('cors')

const app = express()
app.use(cors())
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

// https://github.com/request/request
app.get('/query/:keyword', (req, res) => {
  var keyword = encodeURIComponent(req.params.keyword)
  console.log(keyword, req.query.category, req.query.onsale, req.query.free, req.query.page)

  var url = 'https://www.tori.fi/pirkanmaa?q='+keyword+'&cg='+req.query.category+'&w=111'
  if( req.query.onsale == 'true' ) url+= '&st=s'
  if( req.query.free == 'true' ) url+= '&st=g'
  if( req.query.page > '1' ) url+= '&o='+req.query.page

  url += '&ca=18&l=0&md=th'

  console.log(url)

  request({
    method: 'GET',
    uri: url,
    // uri: 'https://www.tori.fi/pirkanmaa?q='+keyword+'&cg='+req.query.category+'&w=111&st=s&st=k&st=g&c=5036&ca=18&l=0&md=th',
    // uri: 'https://www.tori.fi/pirkanmaa?q=n%E4ytt%F6&cg=5030&w=111&st=s&st=k&st=g&c=5036&ca=18&l=0&md=th',
    encoding: 'latin1'
  },
    (error, response, body) => {
      console.log(error)
      console.log(response && response.statusCode)

      res.send(parser.parse(response.body))
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
