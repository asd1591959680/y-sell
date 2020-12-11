//Page Object
Page({
  data: {
    
  },
  getUserInfo(e){
    console.log(e);
    const {userInfo}=e.detail
    wx.setStorageSync('userInfo', userInfo);
    wx.navigateBack({
      delta: 1
    });
      
      
  },
  //options(Object)
  onLoad: function(options) {
    
  },
  onReady: function() {
    
  },
  onShow: function() {
    
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
  