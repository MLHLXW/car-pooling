// components/clock/clock.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    status: String,
    srclist: Array,
    num: Number,
    timer: null,
  },

  /**
   * 组件的初始数据
   */
  data: {
    days: '00', //天
    hours: '00', //时
    minutes: '00', //分
    seconds: '00', //秒
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
      countTime(endDate, that) {
        let days,hours, minutes, seconds;
        let now = new Date().getTime();
        let end = new Date(endDate).getTime(); //设置截止时间
        let leftTime = end - now; //时间差                         
        if (leftTime >= 0) {
          days = Math.floor(leftTime / 1000 / 60 / 60 / 24);
          hours = Math.floor(leftTime / 1000 / 60 / 60 % 24);
          minutes = Math.floor(leftTime / 1000 / 60 % 60);
          seconds = Math.floor(leftTime / 1000 % 60);
          seconds = seconds < 10 ? "0" + seconds : seconds
          minutes = minutes < 10 ? "0" + minutes : minutes
          hours = hours < 10 ? "0" + hours : hours
          that.setData({
            days,
            hours,
            minutes,
            seconds
          })
        }
        else{
          clearInterval(that.data.timer);
          that.triggerEvent("sx");
        }
    },
    begin(endDate){
      var that = this;
      this.data.timer = setInterval(this.countTime, 1000, endDate, that)
    }
  },


})
