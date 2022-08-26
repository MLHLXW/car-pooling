// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    list: {},
    src1: '../../images/star1.png',
    src2: '../../images/star2.png',
    star: [0,0,0],//星星数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onC1(e){
    let index = e.currentTarget.dataset.index;
    if(this.data.star[index] == 1){
      this.setData({
        ['star['+ index +']']: 0, 
      })
    }else{
      this.setData({
        ['star['+ index +']']: 1, 
      })
    }
  },
  onC2(e){
    let index = e.currentTarget.dataset.index;
    if(this.data.star[index] == 2){
      this.setData({
        ['star['+ index +']']: 1, 
      })
    }else{
      this.setData({
        ['star['+ index +']']: 2, 
      })
    }
  },
  onC3(e){
    let index = e.currentTarget.dataset.index;
    if(this.data.star[index] == 3){
      this.setData({
        ['star['+ index +']']: 2, 
      })
    }else{
      this.setData({
        ['star['+ index +']']: 3, 
      })
    }
  },
  onC4(e){
    let index = e.currentTarget.dataset.index;
    if(this.data.star[index] == 4){
      this.setData({
        ['star['+ index +']']: 3, 
      })
    }else{
      this.setData({
        ['star['+ index +']']: 4, 
      })
    }
  },
  onC5(e){
    let index = e.currentTarget.dataset.index;
    if(this.data.star[index] == 5){
      this.setData({
        ['star['+ index +']']: 4, 
      })
    }else{
      this.setData({
        ['star['+ index +']']: 5, 
      })
    }
  },
  allF(){
    this.setData({
      ['star[0]']: 5,
      ['star[1]']: 5,
      ['star[2]']: 5,
    })
  },
  async getlist(){
    const {data: res} = await wx.p.request({
      method: 'POST',
      url: 'https://rrewuq.com/evaFormDe',
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
  async send(){
    wx.showLoading({
      title: '加载中',
    })
    var arr1 = [];
    var arr2 = [];
    for(var i = 0; i < this.data.list.userList.length; i++){
      arr1.push(this.data.list.userList[i].student_id)
      console.log(this.data.list.userList[i].student_id)
      arr2.push(this.data.star[i])
    }
    var narr1 = JSON.stringify(arr1);
    var narr2 = JSON.stringify(arr2);
    let str1=narr1.replace(/\[|]|"/g,'');
    let str2=narr2.replace(/\[|]/g,'');
    const {data: res} = await wx.p.request({
      method: 'POST',
      url: 'https://rrewuq.com/evaluateForm',
      data: {
        formId: this.data.id,
        targets: str1,
        starsCount: str2
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
  onLoad(options) {
    this.setData({
      id: options.id
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