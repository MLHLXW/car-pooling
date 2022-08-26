// components/sideBar/sideBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: String,
    phone: String,
    grade: Number,
    tsrc: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    fileList: [],
    isshow: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    mybad(){
      this.triggerEvent('sync',{showa: true})
    },
    on(){
      this.setData({isshow: true})
    },
    off(){
      this.setData({isshow: false});
      this.triggerEvent("sx");
    },
    afterRead(event) {
      const { file } = event.detail;
     // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
     var that = this;
     wx.showLoading({
      title: '上传中...'
      });
      wx.uploadFile({
        url: 'https://rrewuq.com/updateImage',
        filePath: file.path,
        name: 'file',
        header:{
          "satoken":wx.getStorageSync('token')
        },
      })
      var jsonlist = this.data.fileList.concat(file);
      this.setData({
        fileList: jsonlist,
      })
      wx.hideLoading();
    },
    deleteClick(event) {
      var jsonlist = this.data.fileList;
      jsonlist.splice(event.detail.index, 1)
      this.setData({
        fileList: jsonlist
      })
    },
    x_phone(){
      wx.navigateTo({
        url: '/pages/x_phone/x_phone',
      })
    },
    gob(){
      wx.setStorageSync('key', 0)
      wx.setStorageSync('token', '')
    }
  }
})
