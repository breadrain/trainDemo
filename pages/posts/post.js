var app=getApp();
var dateFormat = require('../../utils/dateutil');
var requests = require('../../utils/request.js');
var oneDay = 1*24*60*60*1000;
Page({
  data: {
    currentIndex: '0',
    startCity: '广州',
    endCity: '上海',
    rotate: -360
  },
  onLoad: function(){
    this.setData({
      FSdate: {
        date: dateFormat.formatTime(new Date(Date.now() + oneDay)),
        week: dateFormat.formatWeek(new Date(Date.now() + oneDay)),
        startday: dateFormat.formatDay(new Date(Date.now() + oneDay)),
        currentday: dateFormat.formatDay(new Date(Date.now() + oneDay))
      },
      FEdate: {
        date: dateFormat.formatTime(new Date(Date.now() + 2*oneDay)),
        week: dateFormat.formatWeek(new Date(Date.now() + 2*oneDay)),
        startday: dateFormat.formatDay(new Date(Date.now() + 2*oneDay)),
        currentday: dateFormat.formatDay(new Date(Date.now() + 2*oneDay))
      },
      originDate:dateFormat.formatDay(new Date(Date.now() + oneDay))
    })
  },
  onReady: function(){
    this.animation = wx.createAnimation({
      timingFunction: "ease",
      duration: 300
    })
  },
  rotate_img: function() {//旋转图片
    this.animation.rotateZ(this.data.rotate).step()
    this.setData({
      rotate: -1*this.data.rotate,
      startCity: this.data.endCity,
      endCity: this.data.startCity,
      animation: this.animation.export()
    })
  },
  changeBtn: function(ev) {//单程，往返切换
    this.setData({
      currentIndex: ev.target.dataset.index
    })
  },
  bingDateChange: function(e){//绑定选择时间的函数
    var val = e.detail.value;
     this.setData({
          FSdate: {
            date: dateFormat.formatTime(new Date(e.detail.value)),
            week: dateFormat.formatWeek(new Date(e.detail.value)),
            startday: this.data.FSdate.startday,
            currentday: dateFormat.formatDay(new Date(e.detail.value))
          },
          originDate:val
     })
  },
  searchProduct: function(){//跳转详情页
    var method = "GET";
    var header = {apikey: app.globalData.apiKey};
    var data= {
      version: '1.0',
      from: this.data.startCity,
      to: this.data.endCity,
      date: this.data.FSdate.currentday
    };
    var url = app.globalData.baseUrl+"?version="+data.version +"&from="+data.from +"&to="+ data.to + "&date="+data.date;
    requests.request(url, method, header, "", this.successCbTrain, null, null);
  },
  successCbTrain:function(res){
    var jsonString = JSON.stringify(res.data.data.trainList);
    var date = {};
    date.day= this.data.FSdate.date;
    date.week= this.data.FSdate.week;
    date.originDate = this.data.originDate;
    var jsonDate = JSON.stringify(date);

    wx.navigateTo({
      url: "../trainList/trainList?trainInfos="+jsonString+"&date="+ jsonDate
    });
  },

  selectCity: function(e){//选择城市 切换保存方法
    var type = e.currentTarget.dataset.type;
    var that = this;
    var url='../selectStartCity/selectStartCity';
    url=url+'?type='+type;
    app.globalData.cityFn = function(city,type){
      switch (type) {
        case '1':
          that.setData({
            startCity: city
          });
          break;
        case '2':
          that.setData({
            endCity: city,
          });
          break;
      }
    };
    wx.navigateTo({
      url:url
    })
  }
})
