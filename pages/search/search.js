// pages/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:[],
    ment:[],
    value:"",
    loadingHidden: false
  },
  record(e){//输入框搜索
    this.data.value=e.detail.value;
  },
  send(){//搜索按钮点击
    wx.navigateTo({
      url: '/pages/details/details?value=' + this.data.value,
    })
  },
  search:function(e){
    //点击跳转到详情页面
    this.data.value = e.currentTarget.dataset.item;
    console.log(e)
    wx.navigateTo({
      url:'/pages/details/details?value=' + this.data.value,
    })

   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.server1 + '/ad/ad/0/2 ',
      success: (res) => {
        this.setData({
          ment:res.data.data,
          loadingHidden: true
        })
      }
    })
    wx.request({
      url: app.globalData.server1 + '/wallpaper/search/tags/14',
      success: (res) => {
        var str=res.data;
        var title=[]
        for (var i = 0; i < str.length;i++){
          if (str[i].keyword.indexOf("手机") != -1) {
            var ti = str[i].keyword.replace("手机高清壁纸","");
            title.push(ti)
          } else {
          }
        }
        
        this.setData({
          text: title
          
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})