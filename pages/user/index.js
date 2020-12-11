//Page Object
Page({
  data: {
    userInfo:{},
    collectNum:0
  },
  //options(Object)
  onLoad: function(options) {
    
  },
  onReady: function() {
    
  },
  onShow: function() {
    const userInfo = wx.getStorageSync('userInfo');
    const collect=wx.getStorageSync('collect');
     
    this.setData({
      userInfo,
      collectNum:collect.length
    })
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
});
  