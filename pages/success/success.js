// pages/success/success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    deadline: '',
    list: {},
  },
  
  async getlist(){
    const {data: res} = await wx.p.request({
      method: 'POST',
      url: 'https://rrewuq.com/successForm',
      data: {
        id: this.data.id
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'satoken':wx.getStorageSync("token")
      }
    })
    this.setData({
      list: res
    })
  },
  mgt(){
    var mid = this.data.id
    wx.navigateTo({
      url: '/pages/comment/comment?id='+mid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id,
      deadline: options.deadline
    })
    this.getlist()
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
    var self = this;
    return {
      title: "快来看看我的行程表！",
      path: '/pages/success/success?id=' + self.data.id + '&deadline=' + self.data.deadline,
    }
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading(); 
        wx.showLoading({
          title: '刷新中...',
        })
        this.onLoad();
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
  }
})