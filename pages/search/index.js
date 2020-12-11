import {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    goods:[],
    isShow:false,
    isValue:''
  },
  timer:-1,
  handleInput(e){
    const {value}=e.detail
    //防止因if判断导致上个定时器没被清除
    clearTimeout(this.timer)
    if(!value.trim()){
      this.setData({
        goods:[],
        isShow:false
      })
      return
    }
   
    this.setData({
      isShow:true
    })
    this.timer=setTimeout(()=>{
      this.searchItem(value)
    },300)
    
  },
  async searchItem(query){
    const res = await request({
      url:'/goods/search',
      data:{query}
    })
    this.setData({
      goods:res.goods
    })
  },
  cancel(){
    this.setData({
      goods:[],
      isShow:false,
      isValue:''
    })
  },
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
  