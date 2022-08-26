// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    splace: '',
    show: false,
    sshow: true,
    list: [],
    plist: {},
    hlist: [],
  },
  // 事件处理函数
  showSide(){
    this.setData({
      show: true,
      sshow: false
    })
  },
  showSide2(e){
    this.setData({show: false});
    setTimeout(()=>{
      this.setData({sshow: e.detail.showa})
    }, 200)
  },
  showSide3(e){
    this.setData({show: false});
    setTimeout(()=>{
      this.setData({sshow: true})
    }, 200)
  },
  onChange(e) {//双向绑定作用
    this.setData({
      splace: e.detail,
    });
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
  },
  async getperson(){
     const {data: res} = await wx.p.request({
       method: 'GET',
       url: 'https://rrewuq.com/userDetails',
      header: {
        'satoken':wx.getStorageSync("token")
      },
     })
     this.setData({plist: res});
  },
  async hangon(){
    const {data: res} = await wx.p.request({
      method: 'GET',
      url: 'https://rrewuq.com/hangMessage',
     header: {
       'satoken':wx.getStorageSync("token")
     },
    })
    this.setData({hlist: res});
    for(var i = 0; i < this.data.hlist.length; i++){
      if(this.data.hlist[i].status=='ing'){this.selectComponent("#a"+i).begin(this.data.hlist[i].deadline)};
    }
  },
  goto(e){
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/carList/carList?id=' + id+ '&name=' + name,
    })
  },
  gw(e){
    var message = e.currentTarget.dataset.message
    var fid = e.currentTarget.dataset.fid
    var b = e.currentTarget.dataset.begin
    var end = e.currentTarget.dataset.end
    var dead = e.currentTarget.dataset.deadline
    if(message == 'fail'){
      wx.navigateTo({
        url: '/pages/a-fail/a-fail?id='+fid+'&begin='+b+'&end='+end+'&deadline='+dead,
      })
    }
    else if(message == 'success'){
      wx.navigateTo({
        url: '/pages/success/success?id='+fid+'&deadline='+dead,
      })
    }
    else if(message == 'ing'){
      wx.navigateTo({
        url: '/pages/detail/detail?id='+fid,
      })
    }
    else if(message == 'cancel'){
      wx.navigateTo({
        url: '/pages/b-fail/b-fail?id='+fid+'&begin='+b+'&end='+end+'&deadline='+dead,
      })
    }
  },
  sx(){
    this.onLoad()
  },

  onLoad() {
   /* if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }*/
    this.hangon();
    this.getList();
    this.getperson();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
       this.getTabBar().setData({
        index: 1
       })
    }
    this.onLoad();
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
