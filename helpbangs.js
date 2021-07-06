/*
脚本说明
本脚本为测试版本(TF),如果你还未取得测试资格,请先关注https://t.me/CbScript,不定时会放出测试资格邀请链接。

信息
【BOXJS】: https://raw.githubusercontent.com/CenBoMin/GithubSync/main/cenbomin.test.box.json
【脚本定时cron】: 每8小时运行一次
【脚本JS】:https://raw.githubusercontent.com/CenBoMin/GithubSync/main/HELPBANG/helpbang.js
【重写引用】:https://raw.githubusercontent.com/CenBoMin/GithubSync/main/HELPBANG/cookie.conf

//食用方法：

温馨提示1:启动重写引用获取cookie时务必要确认重写引用是不是生效(圈x左上角有红色数字圈圈)，通常会因为raw连接需要代理而出错，所以启用更新的时候不要用直连模式！

温馨提示2:视频加载出错,采用全部直连模式,圈x右下角圈圈,改成黄色的就是直连模式了！

非常重要！非常重要！非常重要！:
 * 获取完cookie,务必关闭当前重写引用conf！！不然可能cookie会重置。
 * 看广告视频需要开直连。
 * 可能WiFi获取不到cookie，请用流量获取。

【基础数据】:登录App-点击下方【我的】- 即可获取UID成功(务必第一个获取,用来验证！！)

【签到】:登录App-点击下方【赚钱】- 点击【签到】 - 看视频翻倍- 广告结束后,即可获取成功
【分享微信群】:登录App-点击下方【赚钱】- 点击【分享微信群】 - 分享返回APP领取奖励,即可获取成功
【看福利视频】:登录App-点击下方【赚钱】- 点击【看福利视频】 - 看完广告APP领取奖励,即可获取成功
【分享朋友圈】:登录App-点击下方【赚钱】- 点击【分享朋友圈】 - 分享返回APP领取奖励,即可获取成功
【发布互助任务】:登录App-点击下方中间【+】- 随便选择一个任务类型-选择最低的参数(10人/500金币/30min),随便打几个字发布,即可获取发布任务cookie,在点击下方【赚钱】- 点击【发布互助任务】 - 领取奖励,即可获取成功
任务没有5000金币请跳过，等有金币的时候在做任务获取cookie（大约两天）
【步数金币】:登录App-点击下方【走路】- “可兑换?金币”的时候,点击【步数换金币】 - 即可获取成功
【气泡金币】:登录App-点击下方【走路】- 点击4个其中一个 - 即可获取成功【气泡金币】
【提现】:点右上角-去提现,提现1元,即可获取成功！（此功能尚未测试成功！！！）

*/



// TODO:

//++++++++++++++++++++++++++++++++++++
const $ = new Env("HELPBANG");
const host = "https://hlxcx.renmaibangvip.cn";
const logs = true;
const notifyInterval = 1;
const tgmarkcode = "/submitactivitycodes helpbang@"
const stepnumber = Random(22000, 26000);
const coinct = Random(13, 20);
const githubkeyUrl = 'https://ghproxy.com/https://raw.githubusercontent.com/zzsnn/zzsnn.github.io/master/helpbang.js'
let tz = "";
let sumstepcoin = 0,
  sumcollectcoin = 0,
  sumcollectcoin2 = 0;
let dosteptime = 0,
  docollecttime = 0,
  docollecttime2 = 0;
let helpbang = $.getjson('helpbang', [])
let helpbangkey = $.getval('helpbangkey')
  //++++++++++++++++++++++++++++++++++++
  !(async () => {
    cc = (`${$.name}任务执行通知🔔`);
    console.log("\n* Author:CenBoMin\n* Github:github.com/CenBoMin/GithubSync\n* Telegram:https://t.me/CbScript\n* Updatetime:2021.04.28\n");
    console.log(`Now login(UTC+8):${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}`)
    if (typeof $request !== "undefined") {
      $.log('【提示】请先前往获取cookie📲')
    } else if (!helpbangkey) {
      $.log(`\n🤖[${$.name}]:开始下载脚本使用权限秘钥...`)
      await githubkey();
    } else {
      let ckList = helpbang.filter(ck => ck.hd).map((ck) => ({
        uid: ck.uid,
        body: ck.bd,
        headers: JSON.parse(ck.hd),
        gold: ck.gold,
        tkinfosum: ck.tkinfosum,
        tkinfonon: ck.tkinfonon,
        signsum: ck.signsum,
        signnon: ck.signnon,
        signtt: ck.signtt,
        gotasksum: ck.gotasksum,
        gotasknon: ck.gotasknon,
        gotasktt: ck.gotasktt,
        gotaskbody: ck.gotaskbody,
        fintasksum: ck.fintasksum,
        fintasknon: ck.fintasknon,
        fintasktt: ck.fintasktt,
        wxsharesum: ck.wxsharesum,
        wxsharenon: ck.wxsharenon,
        wxsharett: ck.wxsharett,
        sharesum: ck.sharesum,
        sharenon: ck.sharenon,
        sharett: ck.sharett,
        kanvideohd: ck.kanvideohd,
        stepcoinhd: ck.stepcoinhd,
        collectcoinsum: ck.collectcoinsum,
        collectcoinnon: ck.collectcoinnon,
        collectcointt: ck.collectcointt,
        txsum: ck.txsum,
        txnon: ck.txnon,
        txtt: ck.txtt

        //===================================
      }));
      console.log(`\n🤖[${$.name}]:~ System💲/脚本账号数量 `)
      console.log(`本次执行共${ckList.length}个账号`)
      for (let i = 0; i < ckList.length; i++) {
        tkList = ckList[i];
        $.log(`\n🗝[${$.name}]:开始验证~用户${i+1}-脚本使用权限...`)
        if (z(i)) {
          $.log(`用户${i+1}(ID:${tkList.uid}):~ 秘钥验证成功！🎉`);
          $.log(`\n🤖[${$.name}]:~ System💲/执行脚本\n开始执行 👤User${i+1},UID:${tkList.uid}的脚本任务`)
          await main(i);
        } else {
          $.log(`用户${i+1}(ID:${tkList.uid}):~ 秘钥验证失败！`);
          $.log(`\n🗝[${$.name}]:~ System💲/尝试更新~脚本使用权限秘钥... `)
          await githubkey("again");
          $.log(`\n🗝[${$.name}]:再次验证~用户${i+1}-脚本使用权限...`)
          if (z()) {
            $.log(`用户${i+1}(ID:${tkList.uid}):~ 秘钥验证成功！🎉`);
            $.log(`\n🤖[${$.name}]:~ System💲/执行脚本\n开始执行 User${i+1},UID:${tkList.uid}的脚本任务`)
            await main(i);
          } else {
            $.log(`❌用户${i+1}(ID:${tkList.uid}):~ 秘钥验证失败！`);
            $.log(`\n⚠️用户${i+1}:~ 请在群内提交验证码,如果已提交请稍后再试试。\n🔺验证码提交格式:${tgmarkcode}${tkList.uid}`);
            $.msg($.name, '', `⚠️用户${i+1}:~ 请在群内提交验证码,如果已提交请稍后再试试。\n🔺验证码提交格式:${tgmarkcode}${tkList.uid}`);
          }
        }
      }
    }
  })()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })

//++++++++++++++++++++++++++++++++++++
function initTaskOptions(url, body, nonce, sum, time) {
  let inithd = tkList.headers
  let noncehd = inithd['nonce'].replace(/\w+/, `${nonce}`)
  let sumcehd = inithd['checkSum'].replace(/\w+/, `${sum}`)
  let timehd = inithd['curTime'].replace(/\w+/, `${time}`)
  let initbd = tkList.body
  let ckbd = initbd.replace(/.*/, `${body}`)
  inithd.nonce = noncehd
  inithd.checkSum = sumcehd
  inithd.curTime = timehd
  return {
    url: `${host}/${url}`,
    headers: inithd,
    body: ckbd
  };
}

function TaskOptions(url, body, hd) {
  let inithd = JSON.parse(hd)
  let initbd = tkList.body
  let ckbd = initbd.replace(/.*/, `${body}`)
  return {
    url: `${host}/${url}`,
    headers: inithd,
    body: ckbd
  };
}

async function main(i) {
  console.log(`\n🤖[${$.name}]:~ User${i+1}💲/查询 用户资讯&任务`)
  await userinfo2();
  await taskinfo();
  console.log(`\n🤖[${$.name}]:~ User${i+1}💲/执行 签到任务`)
  await signtask();
  console.log(`\n🤖[${$.name}]:~ User${i+1}💲/执行 看视频+分享朋友圈+发布互助任务+分享微信群`)
  for (let m = 0; m < 4; m++) {
    switch (m) {
      case 1:
        if (!tkList.kanvideohd) {
          $.log('【提示】请先前往获取[看视频]cookie📲')
        } else {
          if (taskinfoList[m].completeCount != 6) {
            for (let i = 0; i < 6; i++) {
              await WatchVideo(i)
              await $.wait(5000)
            }
          } else {
            console.log(`\n☑️[${$.name}]:~今天[看视频]任务已完成🎉`)
          }
        }
        break;
      case 2:
        taskinfoList[m].completeCount == 0 ? await sharewx() : console.log(`\n☑️[${$.name}]:~今天[分享朋友圈]任务已完成🎉`);
        break;
      case 3:
        taskinfoList[m].completeCount == 0 ? await completetask() : console.log(`\n☑️[${$.name}]:~今天[发布互助任务]任务已完成🎉`);
        break;
      default:
        taskinfoList[m].completeCount == 0 ? await sharewxgroup() : console.log(`\n☑️[${$.name}]:~今天[分享微信群]任务已完成🎉`);
        break;
    }
  };
  console.log(`\n🤖[${$.name}]:~ User${i+1}💲/执行 刷步数金币`)
  if (!tkList.stepcoinhd) {
    $.log('【提示】请先前往获取[步数金币]cookie📲')
  } else {
    await steptocoin();
    if (sumstepcoin > 0) {
      console.log(`\n🧮[本次步数金币小计]:共获取${sumstepcoin}金币`)
    } else {}
  }

  console.log(`\n🤖[${$.name}]:~ User${i+1}💲/执行 刷气泡金币`)
  await collectCoin1();
  // if (sumcollectcoin > 0) {
  //   console.log(`\n🧮[本次气泡金币小计]:共获取${sumcollectcoin}金币`)
  // } else {}
  await $.wait(5000);
  await collectCoin2();
  // if (sumcollectcoin2 > 0) {
  //   console.log(`\n🧮[本次气泡金币翻倍小计]:共获取${sumcollectcoin2}金币`)
  // } else {}
  console.log(`\n🤖[${$.name}]:~ User${i+1}💲/执行 提现任务`)
  console.log(`【提示】提现任务未测试,目前禁止使用🚫。首次提现1元只能一次,务必获取提现Cookie,否则..请等待5元提现获取❗️。`)
  //await applyWithdraw();

  // await showmsg1();
}
//===================================
//++++++++++++++++++++++++++++++++++++
//applyWithdraw
async function applyWithdraw() {
  return new Promise((resolve) => {
    const options = initTaskOptions("user/applyWithdraw", `{"applyAmount":500,"uniqueId":"${tkList.uid}"}`, tkList.txnon, tkList.txsum, tkList.txtt);
    $.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败，请检查自身设备网络情况");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == false) $.log(data)
            $.log(data)
            data = JSON.parse(data);
            txcode = data.head.code
            txmsg = data.head.msg
            switch (txcode) {
              case 112:
                console.log(`🤖[${$.name}]:⚠️${txmsg}`);
                break;
              default:
                $.log(`\n‼️${resp.statusCode}[提现]:${resp.body}`);

            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
//collectCoin
async function collectCoin1() {
  return new Promise((resolve) => {
    const options = initTaskOptions("user/collectCoin", `{"coinCount":${coinct},"collectCoinType":1,"uniqueId":"${tkList.uid}"}`, tkList.collectcoinnon, tkList.collectcoinsum, tkList.collectcointt);
    $.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败，请检查自身设备网络情况");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == false) $.log(data)
            data = JSON.parse(data);
            collectckcode = data.head.code
            coint = Random(15, 20)
            switch (collectckcode) {
              case 200:
                // if (typeof addtaskcoin == "undefined") {
                  // docollecttime++;
                  console.log(`✔️[气泡金币]执行成功！你的奖励:${coint}金币,已入账。`)
                  // console.log(`✔️[气泡金币${docollecttime}]执行成功！你的奖励:${coint}金币,已入账。`)
                  // sumcollectcoin += coint
                  // await $.wait(5000);
                  // await collectCoin1();
                // } else {
                //   coin7 = data.data.coinInfo.coinBalance + addtaskcoin
                //   console.log(`✔️[气泡金币]执行成功！你的奖励:${coin7-coin5}金币,已入账。`)
                // }
                break;
              case 110:
                $.log('【提示】请先前往获取[气泡金币]cookie📲')
                break;
              default:
                $.log(`\n‼️${resp.statusCode}[气泡金币]:${resp.body}`);
              case 115:
                console.log(`\n☑️[${$.name}]:~今天[气泡金币]任务已完成🎉`)
                break;
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
async function collectCoin2() {
  return new Promise((resolve) => {
    const options = initTaskOptions("user/collectCoin", `{"coinCount":${coinct},"collectCoinType":2,"uniqueId":"${tkList.uid}"}`, tkList.collectcoinnon, tkList.collectcoinsum, tkList.collectcointt);
    $.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败，请检查自身设备网络情况");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == false) $.log(data)
            data = JSON.parse(data);
            stepcode = data.head.code
            coint = Random(13, 20)
            switch (stepcode) {
              case 200:
                if (typeof addtaskcoin == "undefined") {
                  // docollecttime2++
                  console.log(`✔️[气泡金币翻倍]执行成功！你的奖励:${coint}金币,已入账。`)
                  // console.log(`✔️[气泡金币翻倍${docollecttime2}]执行成功！你的奖励:${coint}金币,已入账。`)
                  // sumcollectcoin2 += coint
                  // await $.wait(3000);
                  // await collectCoin2();
                } else {
                  coin9 = data.data.coinInfo.coinBalance + addtaskcoin
                  console.log(`✔️[气泡金币翻倍]执行成功！你的奖励:20金币,已入账。`)
                }
                break;
              default:
                $.log(`\n‼️${resp.statusCode}[气泡金币翻倍]:${resp.body}`);
                break;
              case 115:
                console.log(`\n☑️[${$.name}]:~今天[气泡金币翻倍]任务已完成🎉`)
                break;
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
//steptocoin
async function steptocoin() {
  let stepcoin = Random(13, 20)
  return new Promise((resolve) => {
    const options = TaskOptions("user/exchangeStepToCoin", `{"curStepCount":${stepnumber},"exchangeCoin":${stepcoin},"uniqueId":"${tkList.uid}"}`, tkList.stepcoinhd);
    $.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败，请检查自身设备网络情况");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == false) $.log(data)
            data = JSON.parse(data);
            steprpcode = data.head.code
            switch (steprpcode) {
              case 200:
                dosteptime++
                console.log(`✔️[步数金币${dosteptime}]执行成功！你的奖励:${stepcoin}金币,已入账。`)
                sumstepcoin += stepcoin
                await $.wait(5000);
                await steptocoin();
                break;
              case 110:
                $.log('【提示】请先前往获取[步数金币]cookie📲')
                break;
              default:
                $.log(`\n‼️${resp.statusCode}[步数金币]:${resp.body}`);
              case 114:
                console.log(`\n☑️[${$.name}]:~今天[步数金币]任务已完成🎉`)
                break;
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
//WatchVideo
async function WatchVideo(i) {
  return new Promise((resolve) => {
    const options = TaskOptions("user/completeWatchVideoTask", `{"uniqueId":"${tkList.uid}"}`, tkList.kanvideohd);
    $.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败，请检查自身设备网络情况");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == false) $.log(data)
            data = JSON.parse(data);
            rpcode = data.head.code
            switch (rpcode) {
              case 200:
                if (typeof addtaskcoin == "undefined") {
                  const coinvideo = data.data.coinInfo.coinBalance - nowgold
                  console.log(`✔️[看视频${i+1}]执行成功！你的奖励:60金币,已入账。`)
                } else {
                  console.log(`✔️[看视频${i+1}]执行成功！你的奖励:60金币,已入账。`);
                }
                break;
              default:
                $.log(`\n‼️${resp.statusCode}[看视频]:${resp.body}`);
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
//sharewxgroup
async function sharewxgroup() {
  return new Promise((resolve) => {
    const options = initTaskOptions("user/completeShareWxGroupTask", `{"uniqueId":"${tkList.uid}"}`, tkList.sharenon, tkList.sharesum, tkList.sharett);
    $.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败，请检查自身设备网络情况");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == false) $.log(data)
            data = JSON.parse(data);
            rpcode = data.head.code
            switch (rpcode) {
              case 200:
                if (typeof addtaskcoin == "undefined") {
                  const coinwxgroup = data.data.coinInfo.coinBalance - nowgold
                  console.log(`✔️[分享微信群]执行成功！你的奖励:${coinwxgroup}金币,已入账。`)
                } else {
                  coin3 = data.data.coinInfo.coinBalance + addtaskcoin
                  console.log(`✔️今天[分享微信群]任务完成！你的奖励:${coin3-coin2}金币,已入账。`);
                }
                break;
              case 110:
                $.log('【提示】请先前往获取[分享微信群]cookie📲')
                break;
              default:
                $.log(`\n‼️${resp.statusCode}[分享微信群]:${resp.body}`);
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
//sharewx
async function sharewx() {
  return new Promise((resolve) => {
    const options = initTaskOptions("user/completeShareWxCircleTask", `{"uniqueId":"${tkList.uid}"}`, tkList.wxsharenon, tkList.wxsharesum, tkList.wxsharett);
    $.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败，请检查自身设备网络情况");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == false) $.log(data)
            data = JSON.parse(data);
            switch (rpcode) {
              case 200:
                if (typeof addtaskcoin == "undefined") {
                  const coinwxgroup = data.data.coinInfo.coinBalance - nowgold
                  console.log(`✔️[分享朋友圈]执行成功！你的奖励:100金币,已入账。`)
                } else {
                  coin2 = data.data.coinInfo.coinBalance + addtaskcoin
                  console.log(`✔️[分享朋友圈]任务完成！你的奖励:100金币,已入账。`);
                }
                break;
              default:
                $.log(`\n‼️${resp.statusCode}[分享朋友圈]:${resp.body}`);
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
//completetask
async function completetask() {
  return new Promise((resolve) => {
    const options = initTaskOptions("user/completeMutualAidTask", `{"uniqueId":"${tkList.uid}"}`, tkList.fintasknon, tkList.fintasksum, tkList.fintasktt);
    $.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败，请检查自身设备网络情况");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == false) $.log(data)
            data = JSON.parse(data);
            taskcode = data.head.code
            switch (taskcode) {
              case 200:
                if (typeof addtaskcoin == "undefined") {
                  const coin = data.data.coinInfo.coinBalance - nowgold
                  console.log(`✔️[发布互助1单]执行成功！你的奖励:${coin}金币,已入账。`)
                } else {
                  coin1 = data.data.coinInfo.coinBalance + addtaskcoin
                  console.log(`✔️[发布互助1单]任务完成！你的奖励:110金币,已入账。`);
                }
                break;
              default:
                $.log(`\n‼️${resp.statusCode}[发布互助1单]:${resp.body}`);
              case 119:
                console.log(`\n☑️[${$.name}]:~今天[发布互助1单]任务已完成🎉`);
                break;
              case 110:
                $.log('【提示】请先前往获取[发布互助1单]cookie📲')
                break;
              case 120:
                console.log(`❗️今天尚未发布1单互助任务...尝试发布5000金币任务。`);
                await addtask();
                break;
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
//addTask
async function addtask() {
  return new Promise((resolve) => {
    const options = initTaskOptions("benefit/addTask", tkList.gotaskbody, tkList.gotasknon, tkList.gotasksum, tkList.gotasktt);
    $.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败，请检查自身设备网络情况");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == false) $.log(data)
            data = JSON.parse(data);
            addtaskcode = data.head.code
            switch (addtaskcode) {
              case 110:
                $.log('【提示】请先发布任务获取cookie📲')
                break;
              default:
                taskid = data.data.taskId
                addtaskcoin = data.data.coinBalance
                console.log(`发布ID${taskid}互助任务,花费5000金币,发布任务结束后返回金币。`);
                await $.wait(1000)
                await completetask();
            }

          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
//signInWatchVideo
async function signtask() {
  return new Promise((resolve) => {
    const options = initTaskOptions("user/signInWatchVideo", `{"coinCount":100,"uniqueId":"${tkList.uid}"}`, tkList.signnon, tkList.signsum, tkList.signtt);
    $.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败，请检查自身设备网络情况");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == false) $.log(data)
            data = JSON.parse(data);
            signtaskcode = data.head.code
            switch (signtaskcode) {
              case 200:
                signcoin = data.data.coinInfo.coinBalance - nowgold
                console.log(`✔️[签到]任务完成!你的奖励:${signcoin}金币,已入账。`);
                break;
              default:
                $.log(`\n‼️${resp.statusCode}[签到]:${resp.body}`);
              case 107:
                console.log(`\n☑️[${$.name}]:~今天[签到]任务已完成🎉`);
                break;
              case 110:
                $.log('【提示】请先前往获取[签到]cookie📲')
                break;
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
//TaskConfigInfo
async function taskinfo() {
  return new Promise((resolve) => {
    const options = initTaskOptions("reward/getRewardTaskConfigInfo_V5", `{"uniqueId":"${tkList.uid}"}`, tkList.tkinfonon, tkList.tkinfosum);
    $.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败，请检查自身设备网络情况");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            if (logs == false) $.log(data)
            data = JSON.parse(data);
            taskinfoList = data.data.rewardTaskInfo
            taskinfoList.forEach(tk => console.log(`[${tk.taskTitle}]:每日执行${tk.taskCompleteNum}次,领取${tk.taskRewardInitAmount * tk.taskCompleteNum}金币`))
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
//getUserInfo
async function userinfo2() {
  return new Promise((resolve) => {
    let options = {
      url: `https://hlxcx.renmaibangvip.cn/user/getUserInfo`,
      body: `${tkList.body}`,
      headers: tkList.headers,
    }
    $.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`⛔️API查询请求失败,请检查网络设置‼️‼️ \n ${JSON.stringify(err)}`);
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            userinfoList = data.data.userInfo
            nowgold = userinfoList.coinBalance
            goldbalance = userinfoList.curDayCoinBalance
            userinfocode = data.head.code
            console.log(`今天用户[${userinfoList.nickName}]获取${userinfoList.curDayCoinBalance}金币(包含发布任务返回金币,实际收益可能为${userinfoList.curDayCoinBalance-5000}金币),目前账户金币为${userinfoList.coinBalance},约${Math.round(userinfoList.coinBalance/1000)/10}元,截止到今日共获取${Math.round(userinfoList.historyCoin/1000)/10}元`)

          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}

function userinfo(userbody, userkey) {
  return new Promise((resolve) => {
    let options = {
      url: `https://hlxcx.renmaibangvip.cn/user/getUserInfo`,
      body: userbody,
      headers: JSON.parse(userkey),
    }
    $.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`⛔️API查询请求失败,请检查网络设置‼️‼️ \n ${JSON.stringify(err)}`);
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            userId = data.data.userInfo.uniqueId
            gold = data.data.userInfo.coinBalance
          }
        }
      } catch (e) {
        $.log(`=================\nurl: ${options.url}\ndata: ${resp && resp.body}`);
        $.logErr(e, resp);
      } finally {
        resolve([userId, gold])
      }
    })
  })
}

//++++++++++++++++++++++++++++++++++++
async function showmsg1() {
  if (notifyInterval != 1) {
    console.log(cc + '\n' + tz);
  }

  if (notifyInterval == 1) {
    $.msg(cc, '\n', tz);
  }
}

function calarrno(l, n) {
  let status = 1;
  let no = l;
  for (let i = 0, len = no; i < len; i++) {
    let ac = helpbang[i] || {};
    if (ac.uid) {
      if (ac.uid == n) {
        no = i;
        status = 0;
        break;
      }
    } else if (no == len) {
      no = i;
    }
  }
  let valarr = [no, status]
  return no
}

function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`⛔️服务器访问数据为空，请检查自身设备网络情况`);
    return false;
  }
}

function unique(arr) {
  return Array.from(new Set(arr))
}

//base64
let Base64 = {
  encode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
      }));
  },
  decode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
};

async function githubkey(keystate) {
  return new Promise((resolve) => {
    let url = {
      url: `${githubkeyUrl}`,
    };
    $.get(url, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (logs == false) $.log(data)
          switch (keystate) {
            case "again":
              helpbangkey = Base64.encode(data);
              $.log(helpbangkey);
              if (helpbangkey) $.setdata(helpbangkey, 'helpbangkey');
              $.log(`\n🤖[${$.name}]:下载完成!~脚本使用权限秘钥已更新`);
              break;
            default:
              helpbangkey = Base64.encode(data);
              console.log(helpbangkey);
              if (helpbangkey) $.setdata(helpbangkey, 'helpbangkey');
              $.log(`\n🤖[${$.name}]:请重新执行脚本进行秘钥验证`);
              $.msg($.name, '', `🤖请重新执行脚本进行秘钥验证`);
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

function z() {
  const ll = decodeURIComponent(atob(helpbangkey))

  function f(id) {
    try {
      if (ll.indexOf(id) > -1) {
        return true;
      }
    } catch (e) {
      $.log(e);
      return false;
    }
  }
  if (f(tkList.uid)) {
    return true;
  } else {
    return false;
  }
}

function Random(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function Env(name, opts) {
  class Http {
    constructor(env) {
      this.env = env
    }

    send(opts, method = 'GET') {
      opts = typeof opts === 'string' ? {
        url: opts
      } : opts
      let sender = this.get
      if (method === 'POST') {
        sender = this.post
      }
      return new Promise((resolve, reject) => {
        sender.call(this, opts, (err, resp, body) => {
          if (err) reject(err)
          else resolve(resp)
        })
      })
    }

    get(opts) {
      return this.send.call(this.env, opts)
    }

    post(opts) {
      return this.send.call(this.env, opts, 'POST')
    }
  }

  return new(class {
    constructor(name, opts) {
      this.name = name
      this.http = new Http(this)
      this.data = null
      this.dataFile = 'box.dat'
      this.logs = []
      this.isMute = false
      this.isNeedRewrite = false
      this.logSeparator = '\n'
      this.startTime = new Date().getTime()
      Object.assign(this, opts)
      this.log('', `🔔${this.name}, 开始!`)
    }

    isNode() {
      return 'undefined' !== typeof module && !!module.exports
    }

    isQuanX() {
      return 'undefined' !== typeof $task
    }

    isSurge() {
      return 'undefined' !== typeof $httpClient && 'undefined' === typeof $loon
    }

    isLoon() {
      return 'undefined' !== typeof $loon
    }

    isShadowrocket() {
      return 'undefined' !== typeof $rocket
    }

    toObj(str, defaultValue = null) {
      try {
        return JSON.parse(str)
      } catch {
        return defaultValue
      }
    }

    toStr(obj, defaultValue = null) {
      try {
        return JSON.stringify(obj)
      } catch {
        return defaultValue
      }
    }

    getjson(key, defaultValue) {
      let json = defaultValue
      const val = this.getdata(key)
      if (val) {
        try {
          json = JSON.parse(this.getdata(key))
        } catch {}
      }
      return json
    }

    setjson(val, key) {
      try {
        return this.setdata(JSON.stringify(val), key)
      } catch {
        return false
      }
    }

    getScript(url) {
      return new Promise((resolve) => {
        this.get({
          url
        }, (err, resp, body) => resolve(body))
      })
    }

    runScript(script, runOpts) {
      return new Promise((resolve) => {
        let httpapi = this.getdata('@chavy_boxjs_userCfgs.httpapi')
        httpapi = httpapi ? httpapi.replace(/\n/g, '').trim() : httpapi
        let httpapi_timeout = this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout')
        httpapi_timeout = httpapi_timeout ? httpapi_timeout * 1 : 20
        httpapi_timeout = runOpts && runOpts.timeout ? runOpts.timeout : httpapi_timeout
        const [key, addr] = httpapi.split('@')
        const opts = {
          url: `http://${addr}/v1/scripting/evaluate`,
          body: {
            script_text: script,
            mock_type: 'cron',
            timeout: httpapi_timeout
          },
          headers: {
            'X-Key': key,
            'Accept': '*/*'
          }
        }
        this.post(opts, (err, resp, body) => resolve(body))
      }).catch((e) => this.logErr(e))
    }

    loaddata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require('fs')
        this.path = this.path ? this.path : require('path')
        const curDirDataFilePath = this.path.resolve(this.dataFile)
        const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
        const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
        const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
        if (isCurDirDataFile || isRootDirDataFile) {
          const datPath = isCurDirDataFile ? curDirDataFilePath : rootDirDataFilePath
          try {
            return JSON.parse(this.fs.readFileSync(datPath))
          } catch (e) {
            return {}
          }
        } else return {}
      } else return {}
    }

    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require('fs')
        this.path = this.path ? this.path : require('path')
        const curDirDataFilePath = this.path.resolve(this.dataFile)
        const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
        const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
        const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
        const jsondata = JSON.stringify(this.data)
        if (isCurDirDataFile) {
          this.fs.writeFileSync(curDirDataFilePath, jsondata)
        } else if (isRootDirDataFile) {
          this.fs.writeFileSync(rootDirDataFilePath, jsondata)
        } else {
          this.fs.writeFileSync(curDirDataFilePath, jsondata)
        }
      }
    }

    lodash_get(source, path, defaultValue = undefined) {
      const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
      let result = source
      for (const p of paths) {
        result = Object(result)[p]
        if (result === undefined) {
          return defaultValue
        }
      }
      return result
    }

    lodash_set(obj, path, value) {
      if (Object(obj) !== obj) return obj
      if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || []
      path
        .slice(0, -1)
        .reduce((a, c, i) => (Object(a[c]) === a[c] ? a[c] : (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {})), obj)[
          path[path.length - 1]
        ] = value
      return obj
    }

    getdata(key) {
      let val = this.getval(key)
      // 如果以 @
      if (/^@/.test(key)) {
        const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
        const objval = objkey ? this.getval(objkey) : ''
        if (objval) {
          try {
            const objedval = JSON.parse(objval)
            val = objedval ? this.lodash_get(objedval, paths, '') : val
          } catch (e) {
            val = ''
          }
        }
      }
      return val
    }

    setdata(val, key) {
      let issuc = false
      if (/^@/.test(key)) {
        const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
        const objdat = this.getval(objkey)
        const objval = objkey ? (objdat === 'null' ? null : objdat || '{}') : '{}'
        try {
          const objedval = JSON.parse(objval)
          this.lodash_set(objedval, paths, val)
          issuc = this.setval(JSON.stringify(objedval), objkey)
        } catch (e) {
          const objedval = {}
          this.lodash_set(objedval, paths, val)
          issuc = this.setval(JSON.stringify(objedval), objkey)
        }
      } else {
        issuc = this.setval(val, key)
      }
      return issuc
    }

    getval(key) {
      if (this.isSurge() || this.isLoon()) {
        return $persistentStore.read(key)
      } else if (this.isQuanX()) {
        return $prefs.valueForKey(key)
      } else if (this.isNode()) {
        this.data = this.loaddata()
        return this.data[key]
      } else {
        return (this.data && this.data[key]) || null
      }
    }

    setval(val, key) {
      if (this.isSurge() || this.isLoon()) {
        return $persistentStore.write(val, key)
      } else if (this.isQuanX()) {
        return $prefs.setValueForKey(val, key)
      } else if (this.isNode()) {
        this.data = this.loaddata()
        this.data[key] = val
        this.writedata()
        return true
      } else {
        return (this.data && this.data[key]) || null
      }
    }

    initGotEnv(opts) {
      this.got = this.got ? this.got : require('got')
      this.cktough = this.cktough ? this.cktough : require('tough-cookie')
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()
      if (opts) {
        opts.headers = opts.headers ? opts.headers : {}
        if (undefined === opts.headers.Cookie && undefined === opts.cookieJar) {
          opts.cookieJar = this.ckjar
        }
      }
    }

    get(opts, callback = () => {}) {
      if (opts.headers) {
        delete opts.headers['Content-Type']
        delete opts.headers['Content-Length']
      }
      if (this.isSurge() || this.isLoon()) {
        if (this.isSurge() && this.isNeedRewrite) {
          opts.headers = opts.headers || {}
          Object.assign(opts.headers, {
            'X-Surge-Skip-Scripting': false
          })
        }
        $httpClient.get(opts, (err, resp, body) => {
          if (!err && resp) {
            resp.body = body
            resp.statusCode = resp.status
          }
          callback(err, resp, body)
        })
      } else if (this.isQuanX()) {
        if (this.isNeedRewrite) {
          opts.opts = opts.opts || {}
          Object.assign(opts.opts, {
            hints: false
          })
        }
        $task.fetch(opts).then(
          (resp) => {
            const {
              statusCode: status,
              statusCode,
              headers,
              body
            } = resp
            callback(null, {
              status,
              statusCode,
              headers,
              body
            }, body)
          },
          (err) => callback(err)
        )
      } else if (this.isNode()) {
        this.initGotEnv(opts)
        this.got(opts)
          .on('redirect', (resp, nextOpts) => {
            try {
              if (resp.headers['set-cookie']) {
                const ck = resp.headers['set-cookie'].map(this.cktough.Cookie.parse).toString()
                if (ck) {
                  this.ckjar.setCookieSync(ck, null)
                }
                nextOpts.cookieJar = this.ckjar
              }
            } catch (e) {
              this.logErr(e)
            }
            // this.ckjar.setCookieSync(resp.headers['set-cookie'].map(Cookie.parse).toString())
          })
          .then(
            (resp) => {
              const {
                statusCode: status,
                statusCode,
                headers,
                body
              } = resp
              callback(null, {
                status,
                statusCode,
                headers,
                body
              }, body)
            },
            (err) => {
              const {
                message: error,
                response: resp
              } = err
              callback(error, resp, resp && resp.body)
            }
          )
      }
    }

    post(opts, callback = () => {}) {
      const method = opts.method ? opts.method.toLocaleLowerCase() : 'post'
      // 如果指定了请求体, 但没指定`Content-Type`, 则自动生成
      if (opts.body && opts.headers && !opts.headers['Content-Type']) {
        opts.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      }
      if (opts.headers) delete opts.headers['Content-Length']
      if (this.isSurge() || this.isLoon()) {
        if (this.isSurge() && this.isNeedRewrite) {
          opts.headers = opts.headers || {}
          Object.assign(opts.headers, {
            'X-Surge-Skip-Scripting': false
          })
        }
        $httpClient[method](opts, (err, resp, body) => {
          if (!err && resp) {
            resp.body = body
            resp.statusCode = resp.status
          }
          callback(err, resp, body)
        })
      } else if (this.isQuanX()) {
        opts.method = method
        if (this.isNeedRewrite) {
          opts.opts = opts.opts || {}
          Object.assign(opts.opts, {
            hints: false
          })
        }
        $task.fetch(opts).then(
          (resp) => {
            const {
              statusCode: status,
              statusCode,
              headers,
              body
            } = resp
            callback(null, {
              status,
              statusCode,
              headers,
              body
            }, body)
          },
          (err) => callback(err)
        )
      } else if (this.isNode()) {
        this.initGotEnv(opts)
        const {
          url,
          ..._opts
        } = opts
        this.got[method](url, _opts).then(
          (resp) => {
            const {
              statusCode: status,
              statusCode,
              headers,
              body
            } = resp
            callback(null, {
              status,
              statusCode,
              headers,
              body
            }, body)
          },
          (err) => {
            const {
              message: error,
              response: resp
            } = err
            callback(error, resp, resp && resp.body)
          }
        )
      }
    }
    /**
     *
     * 示例:$.time('yyyy-MM-dd qq HH:mm:ss.S')
     *    :$.time('yyyyMMddHHmmssS')
     *    y:年 M:月 d:日 q:季 H:时 m:分 s:秒 S:毫秒
     *    其中y可选0-4位占位符、S可选0-1位占位符，其余可选0-2位占位符
     * @param {string} fmt 格式化参数
     * @param {number} 可选: 根据指定时间戳返回格式化日期
     *
     */
    time(fmt, ts = null) {
      const date = ts ? new Date(ts) : new Date()
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
      }
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (let k in o)
        if (new RegExp('(' + k + ')').test(fmt))
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      return fmt
    }

    /**
     * 系统通知
     *
     * > 通知参数: 同时支持 QuanX 和 Loon 两种格式, EnvJs根据运行环境自动转换, Surge 环境不支持多媒体通知
     *
     * 示例:
     * $.msg(title, subt, desc, 'twitter://')
     * $.msg(title, subt, desc, { 'open-url': 'twitter://', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
     * $.msg(title, subt, desc, { 'open-url': 'https://bing.com', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
     *
     * @param {*} title 标题
     * @param {*} subt 副标题
     * @param {*} desc 通知详情
     * @param {*} opts 通知参数
     *
     */
    msg(title = name, subt = '', desc = '', opts) {
      const toEnvOpts = (rawopts) => {
        if (!rawopts) return rawopts
        if (typeof rawopts === 'string') {
          if (this.isLoon()) return rawopts
          else if (this.isQuanX()) return {
            'open-url': rawopts
          }
          else if (this.isSurge()) return {
            url: rawopts
          }
          else return undefined
        } else if (typeof rawopts === 'object') {
          if (this.isLoon()) {
            let openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url']
            let mediaUrl = rawopts.mediaUrl || rawopts['media-url']
            return {
              openUrl,
              mediaUrl
            }
          } else if (this.isQuanX()) {
            let openUrl = rawopts['open-url'] || rawopts.url || rawopts.openUrl
            let mediaUrl = rawopts['media-url'] || rawopts.mediaUrl
            return {
              'open-url': openUrl,
              'media-url': mediaUrl
            }
          } else if (this.isSurge()) {
            let openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url']
            return {
              url: openUrl
            }
          }
        } else {
          return undefined
        }
      }
      if (!this.isMute) {
        if (this.isSurge() || this.isLoon()) {
          $notification.post(title, subt, desc, toEnvOpts(opts))
        } else if (this.isQuanX()) {
          $notify(title, subt, desc, toEnvOpts(opts))
        }
      }
      if (!this.isMuteLog) {
        let logs = ['', '==============📣系统通知📣==============']
        logs.push(title)
        subt ? logs.push(subt) : ''
        desc ? logs.push(desc) : ''
        console.log(logs.join('\n'))
        this.logs = this.logs.concat(logs)
      }
    }

    log(...logs) {
      if (logs.length > 0) {
        this.logs = [...this.logs, ...logs]
      }
      console.log(logs.join(this.logSeparator))
    }

    logErr(err, msg) {
      const isPrintSack = !this.isSurge() && !this.isQuanX() && !this.isLoon()
      if (!isPrintSack) {
        this.log('', `❗️${this.name}, 错误!`, err)
      } else {
        this.log('', `❗️${this.name}, 错误!`, err.stack)
      }
    }

    wait(time) {
      return new Promise((resolve) => setTimeout(resolve, time))
    }

    done(val = {}) {
      const endTime = new Date().getTime()
      const costTime = (endTime - this.startTime) / 1000
      this.log('', `🔔${this.name}, 结束! 🕛 ${costTime} 秒`)
      this.log()
      if (this.isSurge() || this.isQuanX() || this.isLoon()) {
        $done(val)
      }
    }
  })(name, opts)
}
