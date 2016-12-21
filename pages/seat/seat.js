var dateFormat = require('../../utils/dateutil');
Page({
  data: {
      trainList:[]
  },
  onLoad(option){
      this.setData({
          trainList: JSON.parse(option.seatInfos),
          date: JSON.parse(option.date)
      });

      var startDate = this.data.date.originDate;
      var startTime = startDate +" "+ this.data.trainList.startTime ;
      var duration = this.data.trainList.duration;

      this.toDate(startTime, duration);
  },
  toDate(startTime,duration){

      var time = duration.split(/时|分/);
      var tempTime = new Date(new Date(startTime).getTime() + time[0]*60*60*1000 + time[1]*1000);

      var curWeek = dateFormat.formatWeek(tempTime);
      var curTime = dateFormat.formatTime(tempTime);
      this.setData({
        curWeek: curWeek,
        curTime: curTime
      })
  }
});