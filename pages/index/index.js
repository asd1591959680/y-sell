import {request} from '../../request/index.js'
Page({
  data: {
    swiperList:[],
    category:[],
    floorList:[]
  },
  //options(Object)
  onLoad: function(options) {
    this.getSwiper()
    this.getCategory()
    this.getFloorList()
  },
  getSwiper(){
    request({url:'/home/swiperdata'})
    .then((res) => {
      this.setData({
        swiperList:res
      })
    })
  },
  getCategory(){
    request({url:'/home/catitems'})
    .then((res) => {
      
      this.setData({
        category:res
      })
    })
  },
  getFloorList(){
    request({url:'/home/floordata'})
    .then((res) => {
      
      this.setData({
        floorList:res
      })
    })
  }
  
});
  