// var shareBaseUrl='http://static.nfapp.southcn.com/hd/redpack/';
var shareBaseUrl='http://test2.nfapp.southcn.com/zhxg/vote/';
// var shareBaseUrl='http://static.nfapp.southcn.com/hd/redpack/';
//分享
var shareUrl = shareBaseUrl+"index.html#/share";
var shareIcon = 'http://static.nfapp.southcn.com/app/nanfang_logo.png';
var shareSucTitle = '诗歌';
var shareTitle = '投票';
var shareDesc = '诗歌投票';
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