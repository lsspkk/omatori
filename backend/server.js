var parse = require('./parse')

const express = require('express')
const request = require('request')
const cors = require('cors')
const fs = require('fs')

const app = express()
app.use(cors())
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

// https://github.com/request/request
app.get('/query', (req, res) => {
  var keyword = encodeURIComponent(req.query.keyword)
  console.log('request: /query ', req.query)

  const region = req.query.region === 'kantahame' ? 'uusimaa?w=117' : 'pirkanmaa?w=111'
  var url = 'https://www.tori.fi/' + region + '&q=' + keyword + '&cg=' + req.query.category
  if (req.query.onsale == 'true') url += '&st=s'
  if (req.query.free == 'true') url += '&st=g'
  if (req.query.page > '1') url += '&o=' + req.query.page

  url += '&ca=18&l=0&md=th'

  console.log('tori url :', url)

  request({
    method: 'GET',
    uri: url,
    // https://www.tori.fi/uusimaa?q=ikkunoita&cg=0&w=117&st=s&st=k&st=u&st=h&st=g&ca=18&l=0&md=th
    // https://www.tori.fi/uusimaa?q=ikkunoita&cg=0&w=118&st=s&st=k&st=u&st=h&st=g&ca=18&l=0&md=th
    // uri: 'https://www.tori.fi/pirkanmaa?q='+keyword+'&cg='+req.query.category+'&w=111&st=s&st=k&st=g&c=5036&ca=18&l=0&md=th',
    // uri: 'https://www.tori.fi/pirkanmaa?q=n%E4ytt%F6&cg=5030&w=111&st=s&st=k&st=g&c=5036&ca=18&l=0&md=th',
    encoding: 'latin1'
  },
  (error, response, body) => {
    if (error) { console.log('tori error: ', error) } else if (response && response.statusCode === 200) {
      // fs.writeFileSync('./loaded_tori_page.html', "<!--hi-->\n" + response.body)
      console.log('tori response http code: ', response.statusCode)
      res.send(parse(body))
    } else {
      console.log('tori response http code: ', response.statusCode)
    }
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
