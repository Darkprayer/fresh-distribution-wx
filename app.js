//app.js
var server = require('utils/server');
App({
  onLaunch: function () {
    console.log('App Launch')
    var self = this;
    var rd_session = wx.getStorageSync('rd_session');
    console.log('rd_session', rd_session)
    if (!rd_session) {
      self.login();
    } else {
      wx.checkSession({
        success: function () {
          // 登录态未过期
          console.log('登录态未过期')
          //返回最近门店
          self.GetNearShop(wx.getStorageSync('lat'), wx.getStorageSync('lng'));
          
        },
        fail: function () {
          //登录态过期
          self.login();
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    hasLogin:false
  },

  rd_session: null,
  login: function () {
    console.log("asdasd");
    var self = this;
    wx.login({
      success: function (res) {
        console.log('wx.login', res)
        server.getJSON('/wx/api/user/setSessionKey', { code: res.code }, function (res) {
          console.log('setUserSessionKey', res)
          self.rd_session = res.data.rd_session;
          self.globalData.hasLogin = true;
          wx.setStorageSync('rd_session', self.rd_session);
          self.CustomerInfoSave();
          wx.getLocation({
            type: 'wgs84',
            success: function(res) {
              console.log("wx.getlocation", res);
              wx.setStorageSync('lat', res.latitude);
              wx.setStorageSync('lng', res.longitude);
            }
            // type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            // success: function (res) {
            //   var latitude = res.latitude
            //   var longitude = res.longitude
            //   wx.openLocation({
            //     latitude: latitude,
            //     longitude: longitude,
            //     scale: 28
            //   })
            // }
          })
        });
      },
      fail:function(res){
        console.log("wx.login fail:",res);
      },
      complete:function(res){
        console.log("wx.login complete:" ,res)
      }
    });
  },
  CustomerInfoSave: function () {
    var self = this;
    wx.getUserInfo({
      success: function (res) {
        console.log('getUserInfo', res)
        self.globalData.userInfo = res.userInfo;
        server.getJSON('/wx/api/user/login', {
          rd_session: wx.getStorageSync('rd_session'),
          record: self.globalData.userInfo
        }, function (res) {
          console.log('CustomerInfoSave', res)
          if (!res.data.status) {
            // TODO:验证有误处理
            console.log("失败，重新获取rd_session")
            //重新登入
            self.login();
          }
          else {
            console.log("最后登入成功")
          }
        });
      },
      complete: function (res) {
        //console.log('complete', res)
      }

    });
  },
  GetNearShop:function(lat,lng){
    var self=this;
    server.getJSON('/wx/api/location/getNearShop', {
      rd_session: wx.getStorageSync('rd_session'),
      lat: lat,
      lng: lng
    }, function (res) {
      console.log('GetNearShop', res)
      if (!res.data.status) {
          console.log("没有门店或者返回失败")
      }
      else {
        //console.log("最后登入成功")
      }
    });
  }
})
