<?php
error_reporting(0);
include('pas.php');
$passwd = $aik['passwd'];
if(isset($_POST['pass'])==1){
	$pass = $_POST['pass'];
}else{
	$pass = '';
}
$act=isset($_GET['act'])?$_GET['act']:'';
if($act==1){
	setcookie("admin", "", time()+0);
	header("location:./login.php");
}
if($pass == $passwd){
	setcookie("admin", $pass, time()+1200);
	header("location:./");
	if (isset($_COOKIE["admin"])){
  		$pass = $_COOKIE["admin"];
	}
}else{
	if (isset($_COOKIE["admin"])){
  		$pass = $_COOKIE["admin"];
		
	}else{
		header("location:./login.php");
	}
}
function curl($url){ 
    $ch = curl_init(); //启动会话
    $timeout = 15; 
    $ua = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36';
    curl_setopt($ch, CURLOPT_URL, $url); //访问地址
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);//超时
    curl_setopt($ch, CURLOPT_ENCODING, "gzip");//取消gzip压缩
    curl_setopt($ch, CURLOPT_USERAGENT, $ua);   // 伪造ua 
    curl_setopt($ch, CURLOPT_ENCODING, 'gzip,deflate'); //解释gzip内容
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); // https请求 不验证证书和hosts
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 1);// 从证书中检查SSL加密算法是否存在
    $content = trim(curl_exec($ch)); 
    curl_close($ch); //关闭会话
    return $content; //返回数据
}
function Pv($add){
	
	
	$url=$add;
	$content=curl($url);
	
	return $content;
}
?>