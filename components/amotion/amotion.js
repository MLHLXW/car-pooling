// components/amotion/amotion.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    like1: '../../images/like1.png',
    like2: '../../images/like2.png',
    like: true,
    t1: false,
    ac1: '',
    ac2: '',
    ac3: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike() {
    wx.vibrateShort() //手机振动API
    this.setData({
      ac1: ' 1s back-half linear 1s forwards',
      ac2: ' 1s front-half linear forwards',
      ac3: ' blin 0.5s ease-in-out forwards',
    })
    this.animation = wx.createAnimation({
     duration: 300, // 动画持续时间，单位 ms
     timingFunction: 'linear', // 动画的效果
     delay: 10, // 动画延迟时间，单位 ms
     transformOrigin: '50% 50%' // 动画的中心点
   })
    setTimeout(function () {
      this.animation.scale(1.5).step();
      this.animation.scale(1.0).step();
      this.setData({
          animation: this.animation.export(),
          like: false
        });
      }.bind(this), 50);
    },
  }
})
