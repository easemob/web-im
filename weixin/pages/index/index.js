var _ = require('../../utils/underscore.js')
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World' + typeof _.map,
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad', _.map([1,2,3], function(a) {return 2 * a}))
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
