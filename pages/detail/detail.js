// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    id:'',
    mytext: '',
    re: {},
  },
  async getperson(){
    const {data: res} = await wx.p.request({
      method: 'GET',
      url: 'https://rrewuq.com/formDetails',
      data: {
        id: this.data.id
      },
     header: {
       'satoken':wx.getStorageSync("token")
     },
    })
    this.setData({list: res});
 },
  async join(){
    const {data: res} = await wx.p.request({
      method: 'POST',
      url: 'https://rrewuq.com/joinForm',
      data: {
        formId: this.data.id
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'satoken':wx.getStorageSync("token")
      },
    })
    this.setData({re: res});
    if(this.data.re.isOk){
      wx.showToast({
        title: '已成功加入拼车',
        icon: 'none',
        duration: 2000//持续的时间
      })
      wx.switchTab({
        url: '/pages/index/index',
      })
    }else{
      wx.showToast({
        title: this.data.res.message,
        icon: 'none',
        duration: 2000//持续的时间
      })
    }
  },
  async leave(){
    wx.showLoading({
      title: '加载中',
    });
    const {data: res} = await wx.p.request({
      method: 'POST',
      url: 'https://rrewuq.com/secede',
      data: {
        formId: this.data.id
      },
     header: {
      'content-Type': 'application/x-www-form-urlencoded',
       'satoken':wx.getStorageSync("token")
     },
    })
    wx.showToast({
      title: "已退出本次拼单",
      icon: 'none',
      duration: 2000//持续的时间
    })
    setTimeout(()=>{
      wx.hideLoading()
      wx.switchTab({
        url: '/pages/index/index',
      })
    },2000)
 },
glogin(){
    wx.navigateTo({
      url: '/pages/x-index/x-index?id='+this.data.id,
    })
},
tlogin(){
    wx.navigateTo({
      url: '/pages/s_number/s_numeber',
    })
},
 async cancel(){
  wx.showLoading({
    title: '加载中',
  });
  const {data: res} = await wx.p.request({
    method: 'POST',
    url: 'https://rrewuq.com/cancelForm',
    data: {
      formId: this.data.id
    },
   header: {
    'content-Type': 'application/x-www-form-urlencoded',
     'satoken':wx.getStorageSync("token")
   },
  })
  wx.showToast({
    title: "已取消本次拼单",
    icon: 'none',
    duration: 2000//持续的时间
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
      id: options.id, 
    })
    this.getperson()
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
    var self = this;
    return {
      title: "快来加入我的拼车！",
      path: '/pages/detail/detail?id=' + self.data.id,
    }
  }
})