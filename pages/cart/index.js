import {
  getSetting,
  chooseAddress,
  openSetting,
  showModel,
  showToast} from '../../utils/asyncWx'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },

  async chooseAddress(){

    try {
      let address=await chooseAddress()
      address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo
      wx.setStorageSync('address', address);
        
    } catch (error) {
      console.log(error);
    }
    
  },

  itemChange(e){
    const goodId=e.currentTarget.dataset.id
    let {cart}=this.data
    let index=cart.findIndex(v=>v.goods_id===goodId)
    cart[index].checked=!cart[index].checked
    this.setData({
      cart
    })
    this.setCart(cart)
   
      
  },

  setCart(cart){
    let allChecked=true
    let totalPrice=0
    let totalNum=0
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.goods_price
        totalNum+=v.num
      }else{
        allChecked=false
      }
    })
    allChecked=cart.length!=0?allChecked:false
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cart);
  },
  allChange(){
    let {cart,allChecked}=this.data
    allChecked=!allChecked
    cart.forEach(v=>v.checked=allChecked)
    this.setCart(cart)
  },
  async itemNum(e){
    const {id,operation}=e.currentTarget.dataset
    let {cart}=this.data
    const index=cart.findIndex(v=>v.goods_id===id)
    if(cart[index].num==1&&operation===-1){
      const res =await showModel({content:'您是否要删除?'})
      if(res.confirm){
        cart.splice(index,1)
        this.setCart(cart)
      }
    }else{
      cart[index].num+=operation
      this.setCart(cart)
    }
    
  },

  async itemPay(){
    const {address,totalNum}=this.data
    if(!address.userName){
      await showToast({title:'您还没有选择收货地址'})
      return
    }
    if(totalNum===0){
      await showToast({title:'您还没有选购商品'})
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    });
      
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const address=wx.getStorageSync('address');
    const cart=wx.getStorageSync('cart')||[];
    this.setData({address})
    this.setCart(cart)
      
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