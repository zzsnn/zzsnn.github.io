/*
番茄看看跳转微信文章真实阅读（疑似鉴权文章不自动返回），云扫码直接倒计时虚假阅读（疑似鉴权文章会跳转微信文章真实阅读，会自动返回（多前台跑云扫码时，鉴权文章标识数据会覆盖，可导致非疑似鉴权的文章也进入文章页面进行真实阅读）
注意：
1、ios13、iOS4版本的系统使用qx自测可行，如果是ios12系统的qx用户，老实用单独重写搞定番茄看看和云扫码的真实阅读

[rewrite_local]
^http://.+/yunonline/v1/task url script-response-body https://raw.githubusercontent.com/age174/-/main/fqkk_auto_read.js
^http://.+/(reada/jump|v1/jump|task/read)\? url script-response-header https://raw.githubusercontent.com/age174/-/main/fqkk_auto_read.js
^http://.+/mock/read url script-analyze-echo-response https://raw.githubusercontent.com/age174/-/main/fqkk_auto_read.js

Loon：自测不行，不知道是Loon的问题还是写法与qx有不同之处；有使用Loon的，自行试试吧
http-response ^http://.+/task/read\? script-path=https://raw.githubusercontent.com/age174/-/main/fqkk_auto_read.js, requires-body=false, timeout=10, tag=阅读文章重写
http-request ^http://.+/mock/read\? script-path=https://raw.githubusercontent.com/age174/-/main/fqkk_auto_read.js, requires-body=true, timeout=10, tag=阅读返回重写

*/


const $ = new Env(`前台自动阅读`);
!(async () => {
  if (typeof $request !== "undefined") {
    let url = $request.url
    if (url.indexOf('/mock/read') > 0) {
      let body = `
      <html>
      <head>
          <meta charset="UTF-8">
      </head>
      <style>
          div {position:absolute; top:50%; left:50%; margin:0 0 0 -234px; width:auto; height:auto; border:0px solid #008800; font-size: 7vw}
      </style>
      <body><div id="timer"></div></body>
      <script>
          var oBox= document.getElementById('timer');
          var maxtime = parseInt(Math.random() * (10 - 9 + 1) + 9, 10);
          setTimeout(()=>window.history.back(),maxtime*1000);
          function CountDown() {
              if (maxtime >= 0) {
                  oBox.innerHTML = '返回倒计时'+maxtime+'秒';
                  --maxtime;
              } else{
                  clearInterval(timer);
                  window.history.back();
              }
          }
          timer = setInterval("CountDown()", 1000);
        </script>
      </html>
      `
      const headers = {
        "Connection": "Close",
        'Content-Type': 'text/html; charset=utf-8'
      };
      if ($.isSurge() || $.isLoon()) {
        $.done({response: {status: 200, headers, body}})
      } else if ($.isQuanX()) {
        $.done({status: 'HTTP/1.1 200 OK', headers, body})
      }
    } else if (typeof $response !== "undefined") {
      if (url.match(/https?:\/\/mp\.weixin\.qq\.com\/s.+/)) {
      } else if (url.indexOf('v1/task') > 0) {
        let data = $.toObj($response.body, {})
        if (data.errcode == 0 && (data = data.data)) {
          if (data.type == 'read' && data['session_link']) {
            if ((data.wx_read || 0) - 0 <= 2) {
              $.setval(new Date().getTime() + '', 'ysmReadTime')
            }
            $.log(`疑似鉴权文章:${data.wx_read}`)
          }
        }
      } else {
      // 如果重定向的是微信文章，改写重定向地址
      let url302 = ($response.headers && $response.headers['Location']) || ''
      if (url302.match(/https?:\/\/mp\.weixin\.qq\.com\/s/)) {
        let mock = true
        if (url.indexOf('v1/jump?') > 0) {
          // jump接口，需判断是否疑似鉴权阅读，否才修改重定向地址
          let time = ($.getval('ysmReadTime') || '0') - 0
          if (new Date().getTime() - time <= 6000) {
            // 6秒内跳转的疑似鉴权文章请求，需进入微信文章页面
            mock = false
          }
        } 
        else if (url.indexOf('reada/jump?') > 0 || url.indexOf('task/read?ch=fq') > 0) {
          // 番茄看看的阅读文章，需进入微信文章页面后自动返回
          mock = false
        }
        if (mock) {
          $.log('修改重定向地址为倒计时空白页面')
          let host = url.match(/^https?:\/\/(.+?)\//)[1]
          $response.headers['Location'] = `http://${host}/mock/read`
          $.done({headers: $response.headers})
        } else {
          $.log('为重定向的微信文章地址添加注入标识')
          if (!url302.indexOf('?')) {
            $response.headers['Location'] = url302 + '?k=feizao'
          } else if (url302.indexOf('?') && url302.indexOf('&')) {
            $response.headers['Location'] = url302.replace('&', `&k=feizao&`)
          } else {
            $response.headers['Location'] = url302.replace('?', `?k=feizao&`)
          }
          $.done({headers: $response.headers})
        }}}
    }
  }
})().catch((e) => $.logErr(e)).finally(() => $.done());


function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:i,...r}=t;this.got[s](i,r).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
