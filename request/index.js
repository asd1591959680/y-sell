
let ajaxTimer=0
export const request=(params)=>{
  let header={...params.header}//既能带上旧token也能接受新的请求信息
  if(params.url.includes('/my')){
    header['Authorization'] = wx.getStorageSync('token');
      
  }
  ajaxTimer++
  wx.showLoading({
    title: '加载中',
    mask:true
  })

  return new Promise((reslove,reject)=>{
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'

    wx.request({
      ...params,//传递的数据会全部解构
      header:header,
      url:baseUrl+params.url,
      success: (result) => {
        reslove(result.data.message)
      },
      fail:(err)=>{
        reject(err)
      },
      complete:()=>{
        ajaxTimer--
        if(ajaxTimer===0){
          wx.hideLoading()
        }
       
      }
  })
}
)
}