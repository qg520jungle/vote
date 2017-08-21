import axios from 'axios'
const openApp = function (id, isnfh, isActivity, address, appData) {
  let openAppUrl = 'https://wapapi.nfapp.southcn.com/nfplus-wap-api/getArticle?articleId='
  let sysJuc = {
    ios: /(iPhone|iPad|iPod|iOS)/i,
    android: /(Android)/i
  }
  let nav = navigator.userAgent
  let system = sysJuc.ios.test(nav) ? 'ios' : sysJuc.android.test(nav) ? 'android' : 'other'
  if (system === 'ios') {
    turnToApp(id, isnfh, isActivity, address, appData)
    return
  }
  if (id === true) {
    turnToApp()
    return
  }
  if (isActivity) {
    turnToApp(id, isnfh, isActivity, address, appData)
    return
  }
  if (isnfh) {
    turnToApp(id, isnfh)
    return
  }
  axios.get(openAppUrl + id).then((data) => {
    if (data.code === 200) {
      turnToApp(id, isnfh, isActivity, address, data.data)
    }
  }, (error) => {
    console.log(error)
  })
}
const turnToApp = function (id, isnfh, isActivity, address, appData) {
  let sysJuc = {
    ios: /(iPhone|iPad|iPod|iOS)/i,
    android: /(Android)/i
  }
  let nav = navigator.userAgent
  let system = sysJuc.ios.test(nav) ? 'ios' : sysJuc.android.test(nav) ? 'android' : 'other'
  try {
    let ver = nav.match(/OS (\d+)_(\d+)_?(\d+)?/)
    ver = parseInt(ver[1], 10)
    if (ver > 8) {
      if (id === true) {
        window.location.href = 'https://static2.nfapp.southcn.com/openApp/openApp.html'
      } else {
        window.location.href = 'https://static2.nfapp.southcn.com/openApp/openApp.html?isnfh=' + (isnfh || false) + '&id=' + (id || '') + '&isActivity=' + (isActivity || false) + '&address=' + (address || '')
      }
    } else if (system === 'ios') {
      location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.nfdaily.nfplus'
    }
  } catch (e) {
    if (system === 'android') {
      // 1.content
      // 2.linkurl
      // 3.linkID
      // 4.videoUrl
      // 5.videoTime
      // 6.type
      let newJson
      newJson = (!id && !isnfh) ? {
      } : (appData instanceof Object && !isnfh && appData.articleType !== 10) ? {
        linkurl: appData.shareUrl || '',
        linkID: appData.linkID || '',
        videoUrl: appData.videoUrl || '',
        videoTime: appData.videoTime || '',
        type: appData.articleType,
        isToNFH: (isnfh && isnfh === true) ? 1 : 0,
        articleId: appData.articleId || appData.fileId || appData.columnID || '0'
      } : (appData && appData.articleType === 10) ? {
        content: appData.title || '',
        linkID: appData.shareUrl || '',
        linkurl: appData.picMiddle || appData.picSmall || '',
        videoUrl: appData.videoUrl || '',
        videoTime: appData.publishtime || '',
        type: appData.articleType,
        articleId: appData.articleId || appData.fileId || appData.columnID || ''
      } : isnfh ? {
        linkurl: '',
        linkID: id,
        videoUrl: '',
        videoTime: '',
        type: '',
        isToNFH: (isnfh && isnfh === true) ? 1 : 0,
        articleId: ''
      } : {
        content: '',
        linkurl: appData,
        linkID: '',
        videoUrl: '',
        videoTime: '',
        type: 7,
        articleId: '',
        isToNFH: ''
      }
      let jsonStr = JSON.stringify(newJson)
      // location.href = 'http : //a.app.qq.com/o/simple.jsp?pkgname = com.nfdaily.nfplus'
      if (nav.toLowerCase().match(/MicroMessenger/i) === 'micromessenger') {
        location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.nfdaily.nfplus&android_schema=nfapp' + encodeURIComponent('://splash?params = ' + jsonStr)
      } else {
        let oldDate = new Date()
        let oldtimeStr = oldDate.getTime()
        let iframe = document.createElement('iframe')
        iframe.style.width = 0
        iframe.style.height = 0
        iframe.style.visibility = 'hidden'
        iframe.src = 'nfapp://splash?params = ' + jsonStr
        document.body.appendChild(iframe)
        setTimeout(function () {
          try {
            iframe.parentNode.removeChild(iframe)
            let newDate = new Date()
            let nowtimeStr = newDate.getTime()
            let ttt = document.getElementById('ttt')
            ttt.innerHTML(nowtimeStr - oldtimeStr)
            if ((nowtimeStr - oldtimeStr) / 1000 < 1.7) {
              location.href = 'http://static.nfapp.southcn.com/nfapptest/apk/nfapp.apk'
            }
          } catch (e) {
            location.href = 'nfapp://splash?params=' + jsonStr
          }
        }, 1500)
      }
    } else {
    }
  }
}
export {
  openApp
}
