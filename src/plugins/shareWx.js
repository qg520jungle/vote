import axios from 'axios'
import wx from 'weixin-js-sdk'
let toWxShareUrl = 'http://hd2.nfapp.southcn.com/wx/getShareSignInfo'
// let wx = require(['http://res.wx.qq.com/open/js/jweixin-1.0.0.js'])
// 创建微信分享
const initShare = function (toWxData) {
  // // 生成script导入wxjssdk
  // let wxScript = document.createElement('script')
  // wxScript.src = 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js'
  // // wxScript.onload = function () {
  // //   getWxData(toWxData)
  // // }
  // document.head.appendChild(wxScript)
  // 获取微信公众号信息
  let sendAjax = function (data, sucFuc) {
    axios({
      method: 'get',
      url: toWxShareUrl,
      data: data,
      dataType: 'json',
      cache: true,
      async: true,
      timeout: 60000
    }).then((res) => {
      sucFuc(res)
    }, (XMLHttpRequest, textStatus) => {
      // if (toWxShareData.getShareFail) {
      //   toWxShareData.getShareFail()
      // }
    })
    /*
    $.ajax(
      {
        url: toWxShareUrl,
        type: 'get',
        dataType: 'json',
        cache: true,
        async: true,
        timeout: 60000,
        data: data,
        success: function (result) {
          sucFuc(result)
        },
        error: function (XMLHttpRequest, textStatus) {
          if (toWxShareData.getShareFail) {
            toWxShareData.getShareFail()
          }
        }
      }
    )
    */
  }
  // 获取发送数据
  const getWxData = function (toWxData) {
    let getWxSuc = function (result) {
      let getData = result.data
      try {
        wxDoubleShare(getData, toWxData)
      } catch (e) {
        setTimeout(function () {
          wxDoubleShare(getData, toWxData)
        }, 300)
      }
    }
    let sendData = {}
    sendData.shareUrl = window.location.href.split('#')[0]
    sendAjax(sendData, getWxSuc)
  }
  return {
    getWxData: getWxData
  }
}
// 修改二次分享,getData后台传的数据，wxShareData分享的自定义数据
const wxDoubleShare = function (getData, wxShareData) {
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: getData.app_id, // 必填，公众号的唯一标识
    timestamp: getData.timestamp, // 必填，生成签名的时间戳
    nonceStr: getData.nonceStr, // 必填，生成签名的随机串
    signature: getData.signature, // 必填，签名，见附录1
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  })
  wx.ready(function () {
    // 分享到朋友圈
    wx.onMenuShareTimeline({
      title: wxShareData.title, // 分享标题
      desc: wxShareData.desc, // 分享描述
      link: wxShareData.shareUrl, // 分享链接
      imgUrl: wxShareData.iconUrl // 分享图标
    })
    // 分享给朋友
    wx.onMenuShareAppMessage({
      title: wxShareData.title, // 分享标题
      desc: wxShareData.desc, // 分享描述
      link: wxShareData.shareUrl, // 分享链接
      imgUrl: wxShareData.iconUrl // 分享图标
    })
    // 分享到QQ
    wx.onMenuShareQQ({
      title: wxShareData.title, // 分享标题
      desc: wxShareData.desc, // 分享描述
      link: wxShareData.shareUrl, // 分享链接
      imgUrl: wxShareData.iconUrl // 分享图标
    })
    // 分享到腾讯微博
    wx.onMenuShareWeibo({
      title: wxShareData.title, // 分享标题
      desc: wxShareData.desc, // 分享描述
      link: wxShareData.shareUrl, // 分享链接
      imgUrl: wxShareData.iconUrl // 分享图标
    })
    // 分享到QQ空间
    wx.onMenuShareQZone({
      title: wxShareData.title, // 分享标题
      desc: wxShareData.desc, // 分享描述
      link: wxShareData.shareUrl, // 分享链接
      imgUrl: wxShareData.iconUrl // 分享图标
    })
  })
}
export {
  initShare
}
