// pages/phone/phone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    yz: '',
    list: {},
    isok: true,
    timer: null,
    djs: 60,
  },
  clock(){
    const that = this; 
    that.setData({
      isok: false,
      djs: 60
    })
    that.data.timer = setInterval(()=>{
      if(that.data.djs >= 1){
        that.setData({
          djs: that.data.djs - 1
        })
      }else{
        clearInterval(that.data.timer)
        that.setData({
          isok: true
        })
      }
    },1000)
  },

  inputna(e){
    var na = e.detail.value;
    this.setData({
      name: na
    })
  },

  inputph(e){
    var ph = e.detail.value;
    this.setData({
      phone: ph
    })
  },

  inputyz(e){
    var yz = e.detail.value;
    this.setData({
      yz: yz
    })
  },

  async send(){
    if(this.data.phone != ''){
    this.clock();
    const {data: res} = await wx.p.request({
      method: 'POST',
      url: 'https://rrewuq.com/sendMessage',
      data: {
        phone: this.data.phone
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
      },
    })
    wx.showToast({
      title: '已发送',
      icon: 'none',
      duration: 2000//持续的时间
    })
  }
  else{
    wx.showToast({
      title: '请输入正确的手机号',
      icon: 'none',
      duration: 2000//持续的时间
    })
  }
},
  /*async isright(){
    const {data: res} = await wx.p.request({
      method: 'GET',
      url: 'https://rrewuq.com/judgeMes',
      data: {
       mes: this.data.yz
      },
      header: {
        'content-Type': 'application/json',
        'satoken':wx.getStorageSync("token")
      },
    })
    this.setData({
      isOk: res.isOk,
    })
  },*/
  async bendname(){
    if(this.data.name != ''){
    const {data: res} = await wx.p.request({
      method: 'POST',
      url: 'https://rrewuq.com/updateName',
      data: {
       name: this.data.name
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'satoken':wx.getStorageSync("token")
      },
    })
    }
    else{
      wx.showToast({
        title: '请输入正确的昵称',
        icon: 'none',
        duration: 2000//持续的时间
      })
    }
  },
  async bendphone(){
    const {data: res} = await wx.p.request({
      method: 'POST',
      url: 'https://rrewuq.com/upByPho',
      data: {
       phone: this.data.phone,
       message: this.data.yz
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'satoken':wx.getStorageSync("token")
      },
    })
    this.setData({
      list: res
    })
    if(this.data.list.code == 200){
      wx.setStorageSync("token",this.data.list.data.tokenValue);
      this.bendname();
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
    else{
      wx.showToast({
        title: '绑定失败请检查您的验证码是否正确',
        icon: 'none',
        duration: 2000//持续的时间
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})