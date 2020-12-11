import {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

 
  data: {
    leftList:[],
    rightList:[],
    currentIndex:0,
    scrollTop:'' //距离顶部位置
  },
  goodsList:[],
 
  onLoad: function (options) {
    //缓存设置
    const Cates = wx.getStorageSync('cates')//取
    if(!Cates){
      this.getCategory()
    }else{
      if(Date.now()-Cates.time>1000*10){
        this.getCategory()
      }else{
        this.goodsList = Cates.data
        let leftList = this.goodsList.map(item=>item.cat_name)
        let rightList = this.goodsList[0].children
        this.setData({
          leftList,
          rightList
        })
      }
    }
    
  },

  async  getCategory(){
    const res = await request({url:'/categories'})//同步请求没值不执行下一步
    this.goodsList = res
      //存
      wx.setStorageSync('cates',{time:Date.now(),data:this.goodsList})

      let leftList = this.goodsList.map(item=>item.cat_name)
      let rightList = this.goodsList[0].children
      this.setData({
        leftList,
        rightList
      })
   
  },
  handleTap(e){
    
    const {index} = e.currentTarget.dataset
    let rightList = this.goodsList[index].children
    this.setData({
      currentIndex:index,
      rightList,
      scrollTop:0
    })
  }


})