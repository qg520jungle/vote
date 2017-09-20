// var shareBaseUrl='http://static.nfapp.southcn.com/hd/redpack/';
// var shareBaseUrl = 'http://test2.nfapp.southcn.com/zhxg/vote/'
// var shareBaseUrl = 'http://devstatic.nfapp.southcn.com/zhxg/vote/'
var shareBaseUrl = 'https://static.nfapp.southcn.com/hd/poetryVote/'
// 分享
var shareUrl = shareBaseUrl + 'index.html#/share'
var tempShareUrl = shareBaseUrl + 'index.html#/share'
var shareIcon = 'http://static.nfapp.southcn.com/app/nanfang_logo.png'
// var shareSucTitle = ''
var shareTitle = '小诗仙争霸赛开始啦！'
var shareDesc = '赢取丰厚万元奖品，等你一起助力小诗仙起飞！票选你心中的小诗仙。'
window.getShareUrl = () => {
  // shareUrl
  // if (optionId) {
  //   shareUrl = shareUrl + '?optionId=' + optionId
  // }
  return shareUrl
}
window.resetShareUrl = (optionId) => {
  let surl = tempShareUrl
  if (optionId) {
    surl = surl + '?optionId=' + optionId
  }
  shareUrl = surl
}
window.getShareDesc = () => {
  return shareDesc
}
window.getShareIcon = () => {
  return shareIcon
}
window.getShareTitle = () => {
  return shareTitle
}
window.getShareObj = () => {
  // alert(shareUrl)
  window.activity.getShareUrl(shareUrl)
  window.activity.getShareDesc(shareDesc)
  window.activity.getShareTitle(shareTitle)
  window.activity.getShareIcon(shareIcon)
}

// function hasStr (aim, str) {
//   let flag = false
//   let test = aim.indexOf(str)
//   flag = test !== -1
//   return flag
// }
// alert(2)
// export {
//   getShareUrl,
//   getShareDesc,
//   getShareIcon,
//   getShareTitle,
//   getShareObj
// }
