// pages/carList/carList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '',
    list: [],
  },
  async getlist(){
    const {data: res} = await wx.p.request({
      method: 'GET',
      url: 'https://rrewuq.com/destList',
      data: {
        destination: this.data.name
      }
    })
    this.setData({list: res})
    console.log(this.data.list)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({  
      id: options.id, 
      name: options.name
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
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading(); 
        wx.showLoading({
          title: '刷新中...',
        })
        this.onLoad();
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
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