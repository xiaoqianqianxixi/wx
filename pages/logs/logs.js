//logs.js
const app = getApp()
Page({
  data: {
    imgarr:[],
    userInfo:{
      avatarUrl:"",
      nickName:"",
      loadingHidden: false,
      block:false
    }
  },
  preview: function (e) {
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.imgarr;
    //for (let i = 0; i < this.data.imgUrls2.length;i++){
    //console.log(item)
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
              
              //登录成功上传文件
              wx.chooseImage({
                success: function (res) {
                  console.log(res);
                  count: 9;
                  //返回选定照片的本地文件路径列表
                  //tempFilePaths可以作为img标签的是src属性显示图片
                  console.log(res.tempFilePaths)
                  that.setData({
                    imgarr: res.tempFilePaths
                  })
                }
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
  block:function(){
    this.setData({
      block: true
    })
    
  },
  none:function(){
    this.setData({
      block: false
    })
  },
  onLoad: function (options) {
    var that=this;
    wx.getUserInfo({
      success:function(res){
        var avatarUrl ="userInfo.avatarUrl";
        var nickName ="userInfo.nickName";
        console.log(avatarUrl);
        console.log(nickName);
        that.setData({
          [avatarUrl]:res.userInfo.avatarUrl,
          [nickName]:res.userInfo.nickName,
          loadingHidden: true
        })
      }
    })
  },
  
})

