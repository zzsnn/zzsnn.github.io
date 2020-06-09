<?php
error_reporting(0);
include('./admin/data.php');
include('./style/clog.php');
include('./style/pv.php');
$datas = array(date("md") =>$ack[(date("md"))]+1,(date("md")-1) =>$ack[(date("md")-1)],'qb' =>$ack[('qb')]+1,'pv' =>$users_online);
$arr = '<?php
 $ack =  '.var_export($datas,true).';
?>';
file_put_contents("./style/clog.php",$arr);
 function is_mobile(){
        $user_agent = $_SERVER['HTTP_USER_AGENT'];
        $mobile_agents = Array("240x320","acer","acoon","acs-","abacho","ahong","airness","alcatel","amoi","android","anywhereyougo.com","applewebkit/525","applewebkit/532","asus","audio","au-mic","avantogo","becker","benq","bilbo","bird","blackberry","blazer","bleu","cdm-","compal","coolpad","danger","dbtel","dopod","elaine","eric","etouch","fly ","fly_","fly-","go.web","goodaccess","gradiente","grundig","haier","hedy","hitachi","htc","huawei","hutchison","inno","ipad","ipaq","ipod","jbrowser","kddi","kgt","kwc","lenovo","lg ","lg2","lg3","lg4","lg5","lg7","lg8","lg9","lg-","lge-","lge9","longcos","maemo","mercator","meridian","micromax","midp","mini","mitsu","mmm","mmp","mobi","mot-","moto","nec-","netfront","newgen","nexian","nf-browser","nintendo","nitro","nokia","nook","novarra","obigo","palm","panasonic","pantech","philips","phone","pg-","playstation","pocket","pt-","qc-","qtek","rover","sagem","sama","samu","sanyo","samsung","sch-","scooter","sec-","sendo","sgh-","sharp","siemens","sie-","softbank","sony","spice","sprint","spv","symbian","tablet","talkabout","tcl-","teleca","telit","tianyu","tim-","toshiba","tsm","up.browser","utec","utstar","verykool","virgin","vk-","voda","voxtel","vx","wap","wellco","wig browser","wii","windows ce","wireless","xda","xde","zte");
        $is_mobile = false;
        foreach ($mobile_agents as $device) {
            if (stristr($user_agent, $device)) {
                $is_mobile = true;
                break;
            }
        }
        return $is_mobile;
    }
    if(empty($_GET['url'])){
    	$player = '';
    }else{
    	$player = substr($_GET['url'],-4);
    }
    if($player=='.mp4'){
    	$dz='mp4.php?url='.$_GET['url'];
		$ps = '<img id="del" src="http://wx2.sinaimg.cn/mw690/0060lm7Tly1fvv6g78614j310z0krtjk.jpg" width="100%" height="100%">';
    }else if($player=='m3u8'){
    	$dz='m3u8.php?url='.$_GET['url'];
		$ps = '<img id="del" src="http://wx2.sinaimg.cn/mw690/0060lm7Tly1fvv6g78614j310z0krtjk.jpg" width="100%" height="100%">';
    }else if(empty($_GET['url'])){
 		$url=isset($_GET['url'])?$_GET['url']:'';
 		$dz='time.html';
		$ps='';
	}else{
		if(is_mobile()){
        $jx = $aik['mobile'];//shouji
		$style = '	#box{
		width: 100%;
		height: 100%;
		position: relative; 
		left:0px;
		top:0px;
		background: #000000;
	}
	#top{
		width: 100%;
		height: 200px;
		position:absolute;
		left: 0px;
		top:0px;
		background: #000000;
	}
	#bot{
		width: 100%;
		height: 200px;
		position: absolute;
		left: 0px;
		bottom:0px;
		background: #000000;
	}
	#rig{
		width: 120px;
		height: 100%;
		position: absolute;
		right: 0px;
		top: 0px;
		background: #000000;
	}';
    	}else{
        	$jx = $aik['pc'];
    	}
		$dz = $jx.$_GET['url'];
		$ps = '<img id="del" src="http://wx2.sinaimg.cn/mw690/0060lm7Tly1fvv6g78614j310z0krtjk.jpg" width="100%" height="100%">';
	}
   
?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport"/>
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=11" />
<title><?php echo $aik['title']?><?php echo $aik['subtitle']?></title>
<meta name="keywords" content="<?php echo $aik['keyword']?>">
<meta name="description" content="<?php echo $aik['description']?>">
<?php echo $aik['tj'];?>
<style>
	body{
		background: #000000;
	}
<?php echo $style; ?>
	#btm{
		position: absolute;
		left: 0px;
		top: 0px;
    	/*background: #e9337c;
    	-webkit-border-radius: 100px / 50px;
    	-moz-border-radius: 100px / 50px;
    	border-radius: 100px / 50px;
		background: #F01014;*/
		color: #FFFFFF;
	}
</style>
<script>
	function $(nodeId) { 
		return document.getElementById(nodeId); 
	} 

	function removeMsg() { 
		var node = $("del");
		var nodeBtn = $("remove");
		document.body.removeChild(node);
		document.body.removeChild(nodeBtn);
	} 
	//document.getElementById("video").src="";
	function Play(){
		
		console.log('sdasdad');
		removeMsg();
	}
	setTimeout("Play()","3000");
</script>

</head>
<body  style="overflow-x:hidden;overflow-y:hidden;padding: 0;margin: 0;" >
<?php echo $ps; ?>
<div id="box">
<div id="top"></div>
<iframe id="video" width="100%" height="100%" src="<?php echo $dz;?>" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="no" ></iframe>
<div id="bot"></div>
<div id="rig"></div>
<div id="btm"></div>
</div>
<?php 
//
echo $aik['fooer'];
//
echo $aik['icp'];
?>
</body>
</html>