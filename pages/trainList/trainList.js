var app=getApp();

Page({
  data: {
    trainList: []
  },
  onLoad: function(options) {
    var jsonData = JSON.parse(options.trainInfos);
    var date = JSON.parse(options.date);

    this.setData({
      trainList: jsonData,
      date: date
    });

  },
  onReady:function(){
    wx.setNavigationBarTitle({
      title: this.data.trainList[0].from + " 到 " + this.data.trainList[0].to
    });
  },
  getDetail: function(e) {
    var trainIndex = e.currentTarget.dataset.listid;
    var json = this.data.trainList[trainIndex];
    var jsonString = JSON.stringify(json);
    var date = JSON.stringify(this.data.date);
    wx.navigateTo({
      url: '../seat/seat?seatInfos='+jsonString + "&date=" + date
    });
  }
});