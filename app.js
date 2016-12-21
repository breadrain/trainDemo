//app.js
App( {
  onLaunch: function() {

  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    baseUrl: "http://apis.baidu.com/qunar/qunar_train_service/s2ssearch",
    apiKey: "361cf2a2459552575b0e86e0f62302bc"
  }
})