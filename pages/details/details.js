
// pages/details/details.js
const app = getApp()
Page({

  data: {
    imgUrls2: [],
    value: '',
    src:"",
    pagenum:1,
    loadingHidden: false
  },
  //点击图片预览
  preview: function (e) {
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.imgUrls2;
    var url = imgArr.map(function (item) {
      return item["url"];
    })
    wx.previewImage({
      current: url[index],     //当前图片地址
      urls: url,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })


  },
  err: function (e) {
    var that = this;
    var list = that.data.imgUrls2;
    list[e.target.dataset.index].replace_count = list[e.target.dataset.index].replace_count | 0;
    list[e.target.dataset.index].url = list[e.target.dataset.index].replace_url[list[e.target.dataset.index].replace_count++];
    that.setData({
      imgUrls2: list,
      
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var str = options.value;
    
    var len=str.indexOf("手机");
    //var title=str.substring(0, len);
    if (str.indexOf("手机") != -1) {
      str = options.value;
        
    }else{
      str += "手机高清壁纸";
    }
    var that=this;
    that.setData({
      value: options.value,
      src:str
    })
    that.fn();
    
  },
  fn:function(){
    var that = this;
    wx.request({
      url: app.globalData.server1 + '/wallpaper/search/keyword/' + encodeURI(that.data.src) + '/' + that.data.pagenum + '/10',
      success: (res) => {
        var arr1 = that.data.imgUrls2;//从data获取当前datalist数组
        var arr2 = res.data.data;//从此次请求返回得数据中获取新数组
        arr1 = arr1.concat(arr2)//合并数组
        that.setData({
          imgUrls2: arr1,
          loadingHidden: true
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  onReachBottom: function () { //触底开始下一页
    var that = this;
    var page = 20;
    var pagenum = that.data.pagenum + 5; //获取当前页数并+1
    that.setData({
      pagenum: pagenum, //更新当前页数
    })
    if (pagenum <= page) {
      that.fn();//重新调用请求获取下一页数据
    } else {
      this.setData({
        block: true
      })
    }

  },
})









