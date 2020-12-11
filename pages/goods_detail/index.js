import {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail:{},
    isCollect:false
  },
  goodsInfo:{},
  onLoad: function (options) {
    const {goods_id}=options
    this.getGoodDetail(goods_id)
  },
  onShow: function () {
    let pages =  getCurrentPages();
    let currentPage=pages[pages.length-1]
    let options=currentPage.options
    const {goods_id}=options
    this.getGoodDetail(goods_id)
    
      
      
  },
  async getGoodDetail(goods_id){
    const res=await request({url:'/goods/detail',data:{goods_id}})
    this.goodsInfo=res
    let collect=wx.getStorageSync('collect') || [];
    let isCollect=collect.some(v=>v.goods_id===this.goodsInfo.goods_id)
    let goodsDetail = res
    this.setData({
      //面向对象编程减少不必要数据
      goodsDetail:{
        goods_price:goodsDetail.goods_price,
        goods_name:goodsDetail.goods_name,
        //部分iphone手机不支持webp格式图片
        goods_introduce:goodsDetail.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsDetail.pics
      },
      isCollect
    })

  },
  handleItem(e){
    const urls=this.goodsInfo.pics.map(n=>n.pics_mid)
    const current=e.currentTarget.dataset.url
    wx.previewImage({
      current:current,
      urls:urls
    })
  },
  addCart(){
    let cart=wx.getStorageSync('cart')||[]
    let index=cart.findIndex(v=>v.goods_id===this.goodsInfo.goods_id)
    if(index === -1){
      this.goodsInfo.num=1
      this.goodsInfo.checked=true
      cart.push(this.goodsInfo)
    }else{
      cart[index].num++
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
    });
  },
  collectItem(){
    let isCollect=false
    //首次收藏没有时加个[]数组
    let collect=wx.getStorageSync('collect') || [];
    let index=collect.findIndex(v=>v.goods_id===this.goodsInfo.goods_id)
    if(index!==-1){
      collect.splice(index,1)
      isCollect=false
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true,
      });
        
    }else{
      collect.push(this.goodsInfo)
      isCollect=true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true,
      });
    }
    wx.setStorageSync('collect', collect);
    this.setData({
      isCollect
    })
  },
  
  /**
   * 生命周期函数--监听页面显示
   */




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