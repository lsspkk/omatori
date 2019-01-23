const fs = require('fs')
const cheerio = require('cheerio')

// .item_row = one item
// .item_image = img elements
// .desc a = link to announcement with text
// .desc .list_price = price
var doParse = function (data) {
  // console.log(data)
  console.log('length:', data && data.length)
  var $ = cheerio.load(data)
  // console.log($('.item_row').html())

  var results = []
  $('.item_row').each((i, elem) => {
    // console.log($(elem).find('.item_image').attr('src'))
    // console.log('\n\n')
    // console.log($(elem).find('.desc a').attr('href'))
    // console.log($(elem).find('.desc a').text())
    // console.log($(elem).find('.list_price').text())
    // console.log('\n\n')
    if ($(elem).find('.item_image').attr('src')) {
      var price = $(elem).find('.list_price').text()
      if (price) {
        price = price.replace(/\s/g, '')
      }
      var href = $(elem).attr('href')
      results.push({
        image: $(elem).find('.item_image').attr('src'),
        date: $(elem).find('.date_image').text(),
        description: $(elem).find('.desc').find('.listing-link').text(),
        link: href,
        price: parseInt(price && price.length > 1 ? price.substring(0, price.length - 1) : -1)
      })
    }
  })
  return results
}

// cheerio for parsing html
// https://github.com/cheeriojs/cheerio
module.exports = {
  parse: function (data) {
    if (data === 'default') {
      fs.readFile('example_tori_page.html', { encoding: 'utf-8' }, async (err, content) => {
        if (err) {
          console.log(err)
        } else {
          var results = doParse(content)
          return results
        }
      })
    } else {
      var results = doParse(data)
      return results
    }
  }
}

// parse('default')
