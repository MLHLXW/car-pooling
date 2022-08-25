// pages/a-index/a-index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      destination: '全部',
      place: '',
      list: [],
      list2: [
        "全部","机场","车站","医院","公园","大学"
      ]
  },

  async getSList(){
    var cs = this.data.splace;
    const {data: res} = await wx.p.request({
      method: 'GET',
      url: 'https://rrewuq.com/query',
      data: {
        mes: cs,
      }
    })
    this.setData({list: res});
  },

  mySearch(){//搜索触发的功能
    this.getSList()
  },
  
  async getList(){
    const {data: res} = await wx.p.request({
      method: 'GET',
      url: 'https://rrewuq.com/getList'
    })
    this.setData({list: res});
    console.log(this.list)
  },

  async cato(name){
    const {data: res} = await wx.p.request({
      method: 'GET',
      url: 'https://rrewuq.com/byCategory',
      data: {
        mes: name,
      }
    })
    this.setData({list: res});
  },

  onChange(e) {//双向绑定作用
    this.setData({
      splace: e.detail,
    });
  },
  goto(e){
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/carList/carList?id=' + id+ '&name=' + name,
    })
  },

  tp1(e){ 
    this.setData({
      destination: e.target.dataset.info
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getList();
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
       this.getTabBar().setData({
        index: 2
       })
    }
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