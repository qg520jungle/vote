// var shareBaseUrl='http://static.nfapp.southcn.com/hd/redpack/';
var shareBaseUrl='http://test2.nfapp.southcn.com/zhxg/vote/';
// var shareBaseUrl='https://static.nfapp.southcn.com/hd/poetryVote/';
//分享
var shareUrl = shareBaseUrl+"index.html#/share";
var shareIcon = 'http://static.nfapp.southcn.com/app/nanfang_logo.png';
var shareSucTitle = '';
var shareTitle = '小诗仙争霸赛开始啦！';
var shareDesc = '赢取丰厚万元奖品，等你一起助力小诗仙起飞！票选你心中的小诗仙。';
function getShareUrl() {
    return shareUrl;
}
function getShareDesc() {
    return shareDesc;
}
function getShareIcon() {
    return shareIcon;
}
function getShareTitle() {
    return shareTitle;
}
function getShareObj() {
    window.activity.getShareUrl(shareUrl);
    window.activity.getShareDesc(shareDesc);
    window.activity.getShareTitle(shareTitle);
    window.activity.getShareIcon(shareIcon);
}
alert(1)