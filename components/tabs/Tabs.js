// components/tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      default(){
        return []
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTop(e){
      const {index} = e.target.dataset
      this.triggerEvent('selectTitle',index)
    }
  }
})
