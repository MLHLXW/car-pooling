// pages/s_number/s_numeber.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sno: '',
    password: '',
    list: {},
    id: ''
  },

  inputno(e){
    var no = e.detail.value;
    this.setData({
      sno: no
    })
  },

  inputpw(e){
    var pw = e.detail.value;
    this.setData({
      password: pw
    })
  },

  async login(){
    const {data: res} = await wx.p.request({
      method: 'GET',
      url: 'https://rrewuq.com/sign/BySno',
      data: {
       sno: this.data.sno,
       password: this.data.password,
      }
    })
    this.setData({list: res});
    if(this.data.list.code == 200){
      var that = this;
      wx.setStorageSync("token",that.data.list.data.tokenValue);
      wx.setStorageSync("key", 1);
      if(that.data.list.data.tag != "0"){
        wx.navigateTo({
          url: '/pages/detail/detail?id='+this.data.id,
        })
      }else{
        wx.navigateTo({
          url: '/pages/detail/detail?id='+this.data.id,
        })
      }
    }else{
      wx.showToast({
        title: '登陆失败请检查您的学号密码是否正确',
        icon: 'none',
        duration: 2000//持续的时间
      })
      wx.setStorageSync("key", 0);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id
    })
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