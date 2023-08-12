////////////第一部分：微信提示浏览器打开////////////
//1：JS文件
function downloaddanbo(tag) { 
    var s = navigator.userAgent.toLowerCase();
    if (s.indexOf('iphone') > 0 || s.indexOf('ipad') > 0) {
        if (s.indexOf('micromessenger') > 0 || s.indexOf('qq') > 0) {
            alert('请点击右上角，选择‘在手机自带浏览器中打开’');
        } else {
            location.href = 'https://xxx.gitee.io';
        }
    } else {
        alert('请使用iphone或ipad浏览器打开安装！');
    }
}

//2：JS文件
function downloadapp(tag) { 
    location.href = 'itms-services://?action=download-manifest&url=https://xxx/xxx.plist';
}
//上方js随意一个
//在htnl文件设置如下，downloaddanbo对应js里的downloaddanbo
<div class="aui-get-button"><button onclick="downloaddanbo()">安装</button></div>
-

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////第二部分：按钮提示框////////////
//在htnl文件设置如下，openning01可替换成上面js代码downloaddanbo
<div class="software-down"><a button onclick="openning01()"> <span onclick="return confirm('欢迎使用定制-企业软件，如果点击安装完图标是黑色或无法安装，说明企业证书掉了,请耐心等待修复！')" class="button button-glow button-highlight" rel ="noopener" target="_blank">获取</span></a></div>
-

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////第三部分：按钮维护////////////
//js代码
<script>$(document).delegate(".qun .button", 'click', function () {
    Dialog.init('❤️&nbsp哗哩哗哩大会员失效维护中',2000);})
</script>
-

//html示例
<li class="software qun"><div class="software-icon"><img src="https://cdn.jsdelivr.net/gh/zzsnn/jsdelivr-fome/app/ios/bibi.png" alt></div>
<div class="software-describe"><div class="name_type">
<span class="name">哗哩哗哩概念<span class="type icon_type1">签名类</span></span></div>
<span class="describe"><em><i><img src="https://cdn.jsdelivr.net/gh/zzsnn/jsdelivr-fome/app/c.png" alt=""></i></em><p>&nbsp;破解大会员</p></span>
<span class="time"><em><i><img src="https://cdn.jsdelivr.net/gh/zzsnn/jsdelivr-fome/app/s.png" alt=""></i></em><p>&nbsp;2020-09-18</p></span></div>
<div class="software-down">
<a href="javascript:;" class="button button-glow button-rounded button-raised button-primary">安装</a></div></li>


<img id="image" src="smiley.gif">

<script>
document.getElementById("image").src="landscape.jpg";
</script>