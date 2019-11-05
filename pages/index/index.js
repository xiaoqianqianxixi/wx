//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pagenum: 1,//初始页默认值为1 
    imgUrls:[],
    imgUrls2: [],//.wxml文件需要绑定得列表
    url:"",
    indicatorDots:true,
    autoplay:true,
    interval:3000,
    duration:1000,
    circular:true,
    viewDatas:[],
    loadingHidden: false,
    block:false
  },
  //今日推荐下面滑块
  recommend:function(){
    wx.navigateTo({
      url: '/pages/recommend/recommend'
    })
  },
  //点击图片预览
  preview:function(e){
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.imgUrls2;
    var url = imgArr.map(function(item){
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
  err:function(e){
    var that=this;
    var list = that.data.imgUrls2;
    list[e.target.dataset.index].replace_count = list[e.target.dataset.index].replace_count | 0;
    list[e.target.dataset.index].url = list[e.target.dataset.index].replace_url[list[e.target.dataset.index].replace_count ++];
    that.setData({
      imgUrls2:list,
      
    })
    
  },
  onLoad: function () {
    wx.request({
      url: app.globalData.server1 + '/ad/banner/0/6',
      success:(res)=>{
        this.setData({
          imgUrls: res.data.data
        })
      }
    })
    wx.request({
      url: app.globalData.server1 + '/ad/shop/0/4',
      success: (res) => {
        this.setData({
          viewDatas: res.data.data
        })
      }
    })
    var that = this;
    wx.request({
      url: app.globalData.server1 + '/wallpaper/search/keyword/%E5%8A%A8%E6%BC%AB%E6%89%8B%E6%9C%BA%E5%A3%81%E7%BA%B8/'+that.data.pagenum+'/10',
      success: (res) => {
        var arr1 = that.data.imgUrls2;//从data获取当前datalist数组
        var arr2 = res.data.data;//从此次请求返回得数据中获取新数组
        console.log(that.data)
        arr1 = arr1.concat(arr2)//合并数组
        
        that.setData({
          imgUrls2: arr1,
          loadingHidden: true
        })
        
      },
      fail: function (err) {
        //console.log(err)
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
    if (pagenum <= page){
      that.onLoad();//重新调用请求获取下一页数据
    }else{
      this.setData({
        block: true
      })
    }

  },
 
})
