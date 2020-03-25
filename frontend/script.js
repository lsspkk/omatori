var vue = new Vue({
	el: "#app",
	data() {
		return {
			items: [{
				image: 'default_image_icon.png',
				link: '',
				description: 'Esimerkki',
				date: 'Jou 1 12:12',
				price: 30
			}],
			showHelp: false,
			query: ' ',
			category: '3020',
			onsale: false,
			free: true,
			page: 1,
			isLoading: false,
			noMoreData: false
		}
	},
	methods: {
		doQuery(page) {
			this.isLoading = true
			if (!page) {
				this.noMoreData = false
				page = 1
				this.page = 1
			}
			if (this.noMoreData) return
			var vm = this
			axios({
					// url: 'http://localhost:3000/query',
					url: 'https://hyöty.net/omatori-backend/query',
					params: { keyword: vm.query, category: vm.category, onsale: vm.onsale, free: vm.free, page: page },
					method: 'get'
				}).then(function(response) {
					console.log('Page: ', vm.page, 'Response items count:', response.data.length)
					if (vm.page > 1) {
						vm.items.push.apply(vm.items, response.data)
					} else {
						vm.items = response.data
					}
					vm.page++
						vm.isLoading = false
					if (!response.data || response.data.length === 0) {
						vm.noMoreData = true
					}
					vm.saveState()
				})
				.catch(error => {
					vm.noMoreData = true
					console.log("Error when loading items from backend: ", error)
				})
		},
		lastItemPosition() {
			var container = document.getElementsByClassName("items")[0]
			var last = container.lastChild
			return last != null ? last.getBoundingClientRect().top : 0
		},
		scrolledToBottom() {
			return (window.innerHeight + window.scrollY) >= document.body.scrollHeight
		},
		handleScroll() {
			if (this.scrolledToBottom() && !this.isLoading && !this.noMoreData) {
				console.log("scroll detection loading next page")
				this.doQuery(this.page)
			}
		},
		saveState() {
			localStorage.setItem("omatori", JSON.stringify({
				items: this.items,
				page: this.page,
				query: this.query,
				category: this.category,
				free: this.free,
				onsale: this.onsale,
				date: new Date()
			}))
		},
		loadState() {
			var saved = JSON.parse(localStorage.getItem('omatori'))
			this.query = saved.query
			this.category = saved.category
			this.free = saved.free
			this.onsale = saved.onsale
			var now = new Date().getTime()
			var msToLastSearch = now - Date.parse(saved.date)
			if (msToLastSearch < 600000) { // 10 min
				this.items = saved.items
				this.page = saved.page
				console.log('Using stored items, seconds from last search:', msToLastSearch * 1000)
			} else {
				this.doQuery(0)
				console.log('Reloading items, seconds from last search:', msToLastSearch * 1000)
			}
		}
	},
	updated() {
		if (this.lastItemPosition() < window.innerHeight && !this.isLoading && !this.noMoreData && this.page === 2 && this.items.length > 30) {
			console.log("screen not filled from first items, loading more...")
			this.doQuery(this.page)
		}
	},
	mounted() {
		window.addEventListener('scroll', this.handleScroll)

		if (localStorage.getItem('omatori')) {
			this.loadState()
			return
		}
		for (var i = 0; i < 15; i++) {
			this.items.push({
				image: 'default_image_icon.png',
				link: '',
				title: 'Esimerkki tavara',
				date: 'Jou 1 12:12',
				price: i
			})
		}

	}
})