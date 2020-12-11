import {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    tabs:[
      {
        id:0,
        title:'全部',
        isActive:true
      },
      {
        id:1,
        title:'待付款',
        isActive:false
      },
      {
        id:2,
        title:'待发货',
        isActive:false
      },
      {
        id:3,
        title:'退款/退货',
        isActive:false
      },
    ],
    orders:[]
  },
  onShow: function(options) {
    wx.setStorageSync('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
    const token=wx.getStorageSync("token")
    if(!token){
      wx.navigateTo({
      url: '/pages/auth/index',
     });
      return
    }
    let pages =  getCurrentPages();
    let currentPage=pages[pages.length-1]
    const {type}=currentPage.options
    this.getOrder(type)
    this.changeTitleIndex(type-1)
  },
  selectTitle(e){
    const index = e.detail
    this.changeTitleIndex(index)
    //标题改变重新发送请求
    this.getOrder(index+1)
  },
  changeTitleIndex(index){
    let {tabs} = this.data
    tabs.forEach((v,i)=>{i===index ? v.isActive=true : v.isActive=false})
    this.setData({
      tabs
    })
  },
  async getOrder(type){
    const res = await request({
      url:'/my/orders/all',
      data:{
        type
      }
    })
    this.setData({
      orders:res.orders.map(v=>({
        ...v,
        create_time_cn:(new Date(v.create_time*1000).toLocaleString())
      }))
    })
  },
 
});
  