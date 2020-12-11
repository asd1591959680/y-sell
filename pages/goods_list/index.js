import {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  data: {
    tabs:[
      {
        id:0,
        title:'热门',
        isActive:true
      },
      {
        id:1,
        title:'热门',
        isActive:false
      },
      {
        id:2,
        title:'热门',
        isActive:false
      },
    ],
    goodList:[],
    
  },
  queryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid
    this.getGoodsList()
  },

  async getGoodsList(){
    const res = await request({url:'/goods/search',data:this.queryParams})
    let goodList = res.goods
    let total =  res.total
    this.totalPages=Math.ceil(total/this.queryParams.pagesize)
    this.setData({
      goodList:[...this.data.goodList,...goodList]
    
    })
    //停止刷新
    wx.stopPullDownRefresh()
  },


  selectTitle(e){
    const index = e.detail
    let {tabs} = this.data
    tabs.forEach((v,i)=>{i===index ? v.isActive=true : v.isActive=false})
    this.setData({
      tabs
    })
  },

  onReachBottom(){
    
    if(this.queryParams.pagenum>=this.totalPages){
      wx.showToast({
        title: '没有下一页了',
      });
        
    }else{
      this.queryParams.pagenum++
      this.getGoodsList()
    }
  },
  onPullDownRefresh(){
    this.setData({
      goodList:[]
    })
    this.queryParams.pagenum=1
    this.getGoodsList()
  }

})