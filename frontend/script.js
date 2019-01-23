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
      query: ' ',
      category: '3000',
      onsale: 'false',
      free: 'true',
      page: 1,
      isLoading: false,
      noMoreData: false
    }
  },
  methods: {
    doQuery(page) {
      if (!page) {
        page = 1
        this.noMoreData = false
        this.page = 1
        this.loading = true

      }
      if (this.noMoreData) return
      var vm = this
      axios({
        url: 'https://hyöty.net/omatori-backend/query',
        params: { keyword: vm.query, category: vm.category, onsale: vm.onsale, free: vm.free, page: page },
        method: 'get'
      }).then(function (response) {
        console.log(response.data, response.data.length)
        console.log(vm, vm.items)
        if (vm.page > 1) {
          vm.items.push.apply(vm.items, response.data)
        }
        else {
          vm.items = response.data
        }
        vm.page++
        vm.isLoading = false
        if (!response.data || response.data.length == 0) {
          vm.noMoreData = true
        }
      })
        .catch(error => {
          vm.shown++
          vm.noMoreData = true
          console.log(error)
        })

    },
    handleScroll() {
      var container = document.getElementsByClassName("items")[0];
      var last = container.lastChild
      var scrollPosition = window.pageYOffset;
      var windowSize = window.innerHeight;
      var bodyHeight = document.body.offsetHeight;
      var lastPosition = last.getBoundingClientRect().top
      // var distFromBottom = Math.max(lastPosition*2 - (scrollPosition), 0);
      //        var distFromBottom = Math.max(bodyHeight - (scrollPosition + windowSize), 0);
      console.log(lastPosition, last.innerHTML)
      if (lastPosition < 800 && !this.isLoading) {
        this.isLoading = true
        console.log("load")
        this.doQuery(this.page)
      }

    }

  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)

    for (var i = 0; i < 15; i++) {
      this.items.push({
        image: 'default_image_icon.png',
        link: '',
        description: 'Esimerkki',
        date: 'Jou 1 12:12',
        price: i
      })
    }
  }
})

