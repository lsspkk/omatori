const fs = require('fs')
const cheerio = require('cheerio')


/*
 * use log if html changed and need to update parsing
 */
const log = (msg) => 'hav fun'
	//const log = (msg) => console.log(msg)



var doParse = function(data) {
	// console.log(data)
	console.log('parse input data of length:', data && data.length)
	var $ = cheerio.load(data)

	log($('.item_row_flex').html())

	var results = []
	$('.item_row_flex').each((i, elem) => {
		const title = $(elem).find('.li-title').text()
		const image = $(elem).find('.item_image').attr('src')
		const link = $(elem).attr('href')
		var date = $(elem).find('.date_image').text().trim()
		var price = $(elem).find('.list_price').text()

		if (price) price = price.replace(/\s/g, '')
		if (date) date = date.replace(/[\t\n]/g, '')

		const item = {
			image: image,
			date: date,
			title: title,
			link: link,
			price: parseInt(price && price.length > 1 ? price.substring(0, price.length - 1) : -1)
		}
		log(item)
		results.push(item)
	})
	console.log('parse output items count:', results.length)
	return results
}

const parse = (data) => {
	if (data === 'default') {
		fs.readFile('loaded_tori_page.html', { encoding: 'utf-8' }, async(err, content) => {
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

// cheerio for parsing html
// https://github.com/cheeriojs/cheerio
module.exports = parse


//console.log(parse('default'))