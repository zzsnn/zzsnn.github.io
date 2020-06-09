<?php
error_reporting(0);
include('pas.php');
$passwd = $aik['passwd'];
$ps='';
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
	if($pass!=''){
		$ps = '密码错误,请从新输入！';
	}
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Main CSS-->
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <!-- Font-icon css-->
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <title>Login - 管理中心登录</title>
</head>
<body>
    <section class="material-half-bg">
        <div class="cover"></div>
    </section>
    <section class="login-content">
        <div class="logo">
            <h1>Zero Art</h1>
        </div>
        <div class="login-box">
            <form class="login-form" action="" method="post">
                <h3 class="login-head">
                    <i class="fa fa-lg fa-fw fa-user"></i>管理员登录</h3>
                <div class="form-group">
                    <label class="control-label">验证密码</label>
                    <input class="form-control" type="password" name="pass" placeholder="密码">
                </div>
                <div class="form-group">
                    <div class="utility">
                        <div class="animated-checkbox">
                            <label>
                                <input type="checkbox">
                                <span class="label-text">记住密码</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group btn-container">
                    <button class="btn btn-primary btn-block">
                        <i class="fa fa-sign-in fa-lg fa-fw"></i>登录</button>
                </div><span style="color:#e60c0c"><?php echo $ps ?></span>
            </form>
        </div>
    </section>
    <!-- Essential javascripts for application to work-->
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
    <!-- The javascript plugin to display page loading on top-->
    <script src="js/plugins/pace.min.js"></script>
    <script type="text/javascript">
        // Login Page Flipbox control
        $('.login-content [data-toggle="flip"]').click(function () {
            $('.login-box').toggleClass('flipped');
            return false;
        });
    </script>
</body>
</html>