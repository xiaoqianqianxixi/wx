//logs.js
const app = getApp()
Page({
  data: {
    imgarr:[],
    userInfo:{
      avatarUrl:"",
      nickName:"",
      loadingHidden: false
    }
  },
  preview: function (e) {
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.imgarr;
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
      //current:
    })
    // }


  },
  upload:function(){
    var that = this;
    wx.checkSession({
      success() {
        //session_key 未过期，并且在本生命周期一直有效
        wx.login({
          success(res) {
            if (res.code) {
              console.log(res.code)
              wx.request({
                method:"post",
                url: "https://api.fengfutec.com/wallpaper",
                
              })
            } else {
              console.log("登录失败" + res.errMsg)
            }
          }
        })
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        wx.login() //重新登录
      }
    })
    
   
    
  },
  onLoad: function (options) {
    var that=this;
    wx.getUserInfo({
      success:function(res){
        var avatarUrl ="userInfo.avatarUrl";
        var nickName ="userInfo.nickName";
        that.setData({
          [avatarUrl]:res.userInfo.avatarUrl,
          [nickName]:res.userInfo.nickName,
          loadingHidden: true
        })
      }
    })
  },
  
})