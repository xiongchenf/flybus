// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    this.loading = false;
  },

  getData() {
    let url = 'https://api.soew.cn/product/search';
    wx.request({
      url: url,
      method: 'GET',
      data: {
        limit: 50,
        page: 1
      },
      success: res => {
        let olderList = this.data.list;
        if (Number(res.data.code) === 1) {
          let list = res.data.data;
            list = olderList.concat(list);
          this.setData({
            list: list
          });
        }
        this.loading = false;
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.loading) return;
    this.loading = true;
    this.page += 1;
    this.getData();
  }
})