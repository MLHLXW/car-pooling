// custom-tab-bar/index.js
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
    index: 1,//控制索引图标
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoHome(e){
      wx.switchTab({
        url: '/pages/index/index',
      })
      this.setData({index: 1})
    },
    gotoDes(e){
      wx.switchTab({
        url: '/pages/a-index/a-index',
      })
      this.setData({index: 2}),
      console.log(this.data.index)
    }
  }
})
