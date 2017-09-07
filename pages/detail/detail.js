// pages/we/we.js
var server = require('../../utils/server');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // condition:false,
    comment: [],
    details: [],
    shopGoods: [],
    hasList: false,
    totalPrice: 0,
    totalNum: 0
  },
  btn_change: function (event) {
    console.log(event.currentTarget)
    this.setData({
      poster: event.currentTarget.dataset.imageurl
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      poster: "http://111.231.51.215:8080/klz-fresh-distribution//manage/api/attachment/loadImage?id=539858f0-1a9b-4b26-8961-1c180fc93aa2",
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.setNavigationBarTitle({
    //   // title: '@all 我想对你们说'
    //   title:'最鲜送-城市冷链配送专家'
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      hasList: true,
      shopGoods: [
        {
          id: 1,
          title: '冰工厂',
          num: 0,
          price: 1.5,
          selected: true,
          imageUrl: 'http://111.231.51.215:8080/klz-fresh-distribution//manage/api/attachment/loadImage?id=539858f0-1a9b-4b26-8961-1c180fc93aa2'
        },
        {
          id: 2,
          title: '香浓布丁',
          num: 0,
          price: 10,
          selected: true,
          imageUrl: 'http://111.231.51.215:8080/klz-fresh-distribution//manage/api/attachment/loadImage?id=9fc5025b-e8f8-4c45-9ce6-1a9ca2d90ab5'
        }
      ]
    })
  },
  getTotalPrice() {
    let shopGoods = this.data.shopGoods;
    let total = 0;
    for (let i = 0; i < shopGoods.length; i++) {
      if (shopGoods[i].selected) {
        total += shopGoods[i].num * shopGoods[i].price;
      }
    }
    this.setData({
      shopGoods: shopGoods,
      totalPrice: total.toFixed(2)
    });
  },
  getTotalNum() {
    let shopGoods = this.data.shopGoods;
    let total = 0;
    for (let i = 0; i < shopGoods.length; i++) {
      if (shopGoods[i].selected) {
        total += shopGoods[i].num
      }
    }
    this.setData({
      shopGoods: shopGoods,
      totalNum: total
    });
  },
  // 增加数量
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let shopGoods = this.data.shopGoods;
    let num = shopGoods[index].num;
    num = num + 1;
    shopGoods[index].num = num;
    this.setData({
      shopGoods: shopGoods
    });
    this.getTotalPrice();
    this.getTotalNum();
  },
  // 减少数量
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let shopGoods = this.data.shopGoods;
    let num = shopGoods[index].num;
    if (num <= 0) {
      return false;
    }
    num = num - 1;
    shopGoods[index].num = num;
    this.setData({
      shopGoods: shopGoods
    });
    this.getTotalPrice();
    this.getTotalNum();
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
