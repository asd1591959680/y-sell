//Page Object
Page({
  data: {
    tabs:[
      {
        id:0,
        title:'体验问题',
        isActive:true
      },
      {
        id:1,
        title:'商品/商家投诉',
        isActive:false
      },
     
    ],
    text:[
      {
        id:0,
        title:'功能建议'
      },
      {
        id:1,
        title:'购买遇到的问题'
      },
      {
        id:2,
        title:'性能问题'
      },
      {
        id:3,
        title:'其他问题'
      },
    ],
    chooseImg:[],
    value:''
  },
  upLoadImg:[],
  selectTitle(e){
    const index = e.detail
    let {tabs} = this.data
    tabs.forEach((v,i)=>{i===index ? v.isActive=true : v.isActive=false})
    this.setData({
      tabs
    })
  },
  chooseImg(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          chooseImg:[...this.data.chooseImg,...result.tempFilePaths]
        })
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  deleteImg(e){
    const {index}=e.currentTarget.dataset
    let {chooseImg}=this.data
    chooseImg.splice(index,1)
    this.setData({
      chooseImg
    })
  },
  textInput(e){
    let {value}=e.detail
    this.setData({
      value
    })
  },
  submitValue(){
    let {value,chooseImg}=this.data
    if(!value.trim()){
      wx.showToast({
        title: '内容为空',
        icon: 'none',
        mask: true,

      });
      return
    }
    wx.showLoading({
      title: '正在提交',
      mask: true,
    });
    if(chooseImg.length!==0){
      chooseImg.forEach((v,i)=>{
        wx.uploadFile({
          url: 'https://img.coolcr.cn/api/upload',
          filePath:v,
          name: 'image',
          formData: {},
          success: (res) => {
            let url=JSON.parse(res.data).data.url
            this.upLoadImg.push(url)
            if(i===chooseImg.length-1){
              console.log('提交');
              this.setData({
                value:'',
                chooseImg:[]
              })
              wx.hideLoading();
              wx.navigateBack({
                delta: 1
              });
                
            }
          },
        
        });
  
      })
     
    }else{
      wx.hideLoading();
      wx.navigateBack({
        delta: 1
      });  
    }
   
      
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
  