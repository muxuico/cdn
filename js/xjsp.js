/*


[rewrite_local]
# > 会员
https:\/\/.*\.*xinai99.com url request-header Cookie:.+ request-header Cookie: xxx_api_auth=6661366530633937373937653461323662393366663038636634356139353330
# > 去广告
https?:\/\/.*\.*xinai99\.com\/(ucp\/index|getGlobalData|.+\/reqplay\/) url script-response-body https://raw.githubusercontent.com/Muxui6/cdn/master/js/xjsp.js
[MITM]
hostname = *.*xinai99.com


* */

var obj = JSON.parse($response.body);
if ($request.url.indexOf("/ucp/index") != -1){
    obj.data.uinfo.down_daily_remainders = "999";
    obj.data.uinfo.play_daily_remainders = "999";
    obj.data.uinfo.minivod_play_daily_remainders = "999";
    obj.data.uinfo.minivod_down_daily_remainders = "999";
    obj.data.user.mobi = "QQ:12345678";
}
if ($request.url.indexOf("/getGlobalData") != -1){
    delete obj.data.adgroups;
    delete obj.data.iOS_adgroups;
}
if ($request.url.indexOf("/reqplay/") != -1){
    obj.retcode = "0";
    if(obj.data.hasOwnProperty("httpurl_preview")){
        var playurl = obj.data["httpurl_preview"];
        obj.data["httpurl"] = playurl;
    };
}

$done({body: JSON.stringify(obj)});