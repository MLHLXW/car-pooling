// pages/b-fail/b-fail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    begin: '',
    end: '',
    deadline: '',
    id: '',
  },
  async send(){
    wx.showLoading({
      title: '加载中',
    })
    const {data: res} = await wx.p.request({
      method: 'POST',
      url: 'https://rrewuq.com/confirm',
      data:{
        id: this.data.id
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'satoken':wx.getStorageSync("token")
      }
    })
    setTimeout(()=>{
      wx.hideLoading()
      wx.switchTab({
        url: '/pages/index/index',
      })
    },2000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      begin: options.begin,
      end: options.end,
      deadline: options.deadline,
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