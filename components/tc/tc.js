// components/tc/tc.js
Component({
  options: {
    styleIsolation: 'shared',
  },
  
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    myon: true, //控制弹窗以及发起按钮的显示
    isLimit: false,
    isOK: true,
    myre: {isOk: true},
    begin: '',
    end: '',
    time: '',
    num: 0,
    grade: 0,
    more: '',
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 0,
    option1: [
      { text: '福大东门', value: 0 },
      { text: '福大北门', value: 1 },
    ],
    option2: [
      { text: '福州机场', value: 0 , category: '机场'},
      { text: '中医医院', value: 1 , category: '医院'},
      { text: '爱心公园', value: 2 , category: '公园'},
      { text: '船政文化景区', value: 3, category: '公园' },
      { text: '福州国家森林公园', value: 4 , category: '公园'},
      { text: '福州市第一医院', value: 5 , category: '医院'},
      { text: '福建医科大学附属第一医院', value: 6 , category: '医院'},
      { text: '福州大学', value: 7 , category: '大学'},
      { text: '福建医科大学', value: 8 , category: '大学'},
      { text: '福建师范大学', value: 9 , category: '大学'},
      { text: '福州长乐机场', value: 10 , category: '机场'},
    ],
    option3: [
      { text: '2', value: 0 },
      { text: '3', value: 1 },
      { text: '4', value: 2 },
    ],
    option4:[
      { text: '0', value: 0 },
      { text: '10', value: 1 },
      { text: '20', value: 2 },
      { text: '30', value: 3 },
      { text: '40', value: 4 },
      { text: '50', value: 5 },
      { text: '60', value: 6 },
      { text: '70', value: 7 },
      { text: '80', value: 8 },
      { text: '90', value: 9 },
    ],
    minHour: 0,
    maxHour: 24,
    minDate: new Date(2022,7,20).getTime(),
    maxDate: new Date(2030, 12, 31).getTime(),
    currentDate: new Date().getTime(),
    show: false,
    currentChoose: ''  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    beton(){
      this.setData({myon: !this.data.myon});
      this.judge();
    },
    input1(e){
      var time = e.detail.value;
      this.setData({
        time: time
      })
    },
    input2(e){
      var num = e.detail.value;
      this.setData({
        num: num
      })
    },
    input3(e){
      var g = e.detail.value;
      this.setData({
        grade: g
      })
    },
    input4(e){
      var m = e.detail.value;
      this.setData({
        more: m
      })
    },
    onChange1(e){
      this.setData({
        value1: e.detail
      })
    },
    onChange2(e){
      this.setData({
        value2: e.detail
      })
    },
    onChange3(e){
      this.setData({
        value3: e.detail
      })
    },
    onChange4(e){
      this.setData({
        value4: e.detail
      })
    },
    openPicker() {
      this.setData({ show: true })
    },
    onConfirm(e) {
      this.setData({ show: false, currentChoose: this.formatDate(new Date(e.detail))+':00' })
    },
    onClose() {
      this.setData({ show: false })
    },
    onCancel() {
      this.setData({ show: false })
    },
    formatDate(date) {
      let taskStartTime
      if (date.getMonth() < 9) {
        taskStartTime = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-"
      } else {
        taskStartTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
      }
      if (date.getDate() < 10) {
        taskStartTime += "0" + date.getDate()
      } else {
        taskStartTime += date.getDate()
      }
      taskStartTime += " " + date.getHours() + ":" + date.getMinutes()
      this.setData({
        taskStartTime: taskStartTime,
      })
      return taskStartTime;
    },
    async send(e){
    if(this.data.currentChoose != ''&& this.data.more != ''){
      /*console.log( this.data.option2[this.data.value2].category)
      console.log(this.data.option1[this.data.value1].text)
      console.log(this.data.option2[this.data.value2].text)
      console.log(this.data.isLimit)
      console.log(this.data.option4[this.data.value4].text)
      console.log(this.data.option3[this.data.value3].text)
      console.log(this.data.more)
      console.log(this.data.currentChoose)*/
      if(this.data.isOK){
        if(this.data.grade != 0){
          this.setData({
            isLimit: true,
          })
        }
        const {data: res} = await wx.p.request({
          method: 'POST',
          url: 'https://rrewuq.com/addForm',
          data: {
            category: this.data.option2[this.data.value2].category,
            origin: this.data.option1[this.data.value1].text,
            destination: this.data.option2[this.data.value2].text,
            isLimit: this.data.isLimit,
            creditFloor: this.data.option4[this.data.value4].text,
            needCount: this.data.option3[this.data.value3].text,
            remark: this.data.more,
            deadline: this.data.currentChoose
          },
          header: {
            'content-Type': 'application/x-www-form-urlencoded',
            'satoken':wx.getStorageSync("token")
          }
        })
        this.setData({
          myon: true,
          myre: res,
        })
        if(this.data.myre.isOk == false){
          wx.showToast({
            title: '请选择正确的时间！',
            icon: 'none',
            duration: 2000//持续的时间
          })
        }else{
          wx.showToast({
            title: '已发送',
            icon: 'none',
            duration: 2000//持续的时间
          })
          this.triggerEvent("sx");
        }
      }
      else{
        this.setData({myon: true})
        wx.showToast({
          title: '可加入拼单数已到达上限',
          icon: 'none',
          duration: 2000//持续的时间
        })
      }
    }else{
      wx.showToast({
        title: '请确认信息是否填写完整',
        icon: 'none',
        duration: 2000//持续的时间
      })
    }
    },
    async judge(){
      const {data: res} = await wx.p.request({
        method: 'GET',
        url: 'https://rrewuq.com/toJudge',
        header: {
          'satoken':wx.getStorageSync("token")
        }
      })
      this.setData({isOK: res.isOk});
    },
  }
})
