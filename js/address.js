new Vue({
	el: '.container',
	data: {
		addressList: [],
		// checked: false,
		checked: 0,
		addressNum: 3,
		expressMethod: 0
		// asd: ''
	},
	mounted: function () {
		this.$nextTick(function () {
			this.addressView()
		})
	},
	computed: {
		filterAddress: function () {
			return this.addressList.slice(0, this.addressNum)
		}
	},
	methods: {
		addressView: function () {
		  var _this = this
		  this.$http.get('data/address.json').then(function (response) {
		    var res = response.data
		    if (res.status == 0) {
		      _this.addressList = res.result
		    }
		  })
		},
		// checkD: function (item, index) {
		//  if(typeof item.checked == 'undefined') {
		//    this.$set(item, 'checked', false)
		//    this.addressList[0].checked = true
		//  }
		// },
		// checkIt: function (item) {
		//  this.addressList.forEach(function (value, index) {
		//    value.checked = false
		//  })
		//  item.checked = true
		// },
		showMore: function () {
			if (this.addressNum == this.addressList.length) {
				this.addressNum = 3
			} else {
				this.addressNum = this.addressList.length
			}
		},
		isDefaultItem: function (item, index) {
			this.addressList.forEach(function (value, index) {
				value.isDefault = false
			})
			this.addressList.splice(index, 1)
			this.addressList.unshift(item)
			item.isDefault = true
			this.checked = 0
		}
		// isDefaultItem: function (item, index) {
		// 	this.addressList.forEach(function (value, index) {
		// 		value.isDefault = false
		// 	})
		// 	this.addressList.splice(index, 1)
		// 	this.addressList.unshift(item)
		// 	item.isDefault = true
		// 	this.addressList.forEach((item, index) => {
		// 		item.checked = false
		// 	  this.addressList[0].checked = true
		// 	})
		// }
	}
})
