var vm = new Vue({
  el: '#app',
  data: {
    totalMoney: 0,
    productList: [],
    checkItems: true,
    id: 0,
    isEject: '',
    isFlag: false
  },
  filters: {
    formateMoney: function (value,type) {
      if(type == undefined){
        type = ''  //return '¥ ' + value.toFixed(2)
      }
      return '¥ ' + value.toFixed(2) + type
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.cartview()
//       this.checkD()
    })
  },
  methods: {
    cartview: function () {
      var _this = this
      this.$http.get("data/cartData.json", {"id":123}).then(function (res) {
        _this.productList = JSON.parse(res.body).result.list
        // _this.totalMoney = JSON.parse(res.body).result.totalMoney
      })
      this.productList.forEach((item,index)=>{
	if(typeof item.checked == 'undefined'){
	  Vue.set(item, "checked", true)
	  this.id = this.productList.length
	  this.totalPay()
	}
      })
    },
    numP: function (item,int) {
      if(int>0){
        item.productQuantity++
      }else{
        item.productQuantity--
        if(item.productQuantity<1){
          item.productQuantity=1
        }
      }
      this.totalPay()
    },
//     checkD: function (item) {
//       if(typeof item.checked == 'undefined'){
//         Vue.set(item, "checked", true)
//         this.id = this.productList.length
//         this.totalPay()
//       }
//     },
//     checkD: function () {
// 			this.productList.forEach((item,index)=>{
// 				if(typeof item.checked == 'undefined'){
// 					Vue.set(item, "checked", true)
// 					this.id = this.productList.length
// 					this.totalPay()
// 				}
// 			})
// 		},
    checkIt: function (item) {
      var _this = this  
      item.checked = !item.checked
      if(item.checked){
        this.id++
        if(this.id == _this.productList.length){
          _this.checkItems = true
        }
      }else{
        this.id--
        _this.checkItems = false
      }
      this.totalPay()
    },
    checkAll: function (nu) {
      var _this = this
      this.checkItems = !this.checkItems
      this.productList.forEach(function (item, index) {
        if(nu>0){
          _this.checkItems = true
        }
        if(nu<0){
          _this.checkItems = false
        }
        item.checked = _this.checkItems
      })
      if(this.checkItems){
        this.id = this.productList.length
      }else{
        this.id = 0
      }
      if(this.productList.length == 0){
        this.checkItems = false
      }
      this.totalPay()
    },
    remove: function (item) {
      this.isFlag = true
      this.isEject = item
    },
    totalPay: function () {
      var _this = this
      this.totalMoney = 0
      this.productList.forEach(function (item, index) {
        if(item.checked){
          _this.totalMoney += item.productPrice * item.productQuantity
        }
      })
    },
    onYes: function () {
      var index = this.productList.indexOf(this.isEject)
      this.productList.splice(index, 1)
      if(this.isEject.checked){
        this.id--
      }
      if(this.id == this.productList.length){
        this.checkItems = true
      }
      if(this.productList.length == 0){
        this.checkItems = false
      }
      this.totalPay()
      this.isFlag = false
    }
  }
})

// Vue.filter("money", function (value,type) {
//    return '¥ ' + value.toFixed(2) + type
// })
