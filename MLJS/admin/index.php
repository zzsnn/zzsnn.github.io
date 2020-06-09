<?php
include('inc.php');
include('head.php');
include('../style/clog.php');
$edit='';
if(empty($_GET['t'])){
	$ps = '';
}else{
	if($_POST['passwd']!=''&&strlen($_POST['passwd'])>=5){
		$datas = array('passwd' =>$_POST['passwd']);
		$data = '<?php
 $aik =  '.var_export($datas,true).';
?>';
		file_put_contents("pas.php",$data);
		//exit('<meta http-equiv="refresh" content="2;url=./webset.php">保存完成，若不能正常跳转<a href="./webset.php">请点我</a>');
		$ps = '修改成功，请牢记新密码！';
		$edit = '<div class="overlay">
    <div class="m-loader mr-4">
        <svg class="m-circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10" />
        </svg>
    </div>
	<meta http-equiv="refresh" content="1;url=./">
    <h3 class="l-text">Loadings</h3>
</div>';
		//echo '<script>alert("保存成功");document.location="admin.php";</script>';
	}else{
		$ps = '修改失败，请输入至少五位数密码！';
		$edit = '<meta http-equiv="refresh" content="1;url=./">';
		}
	}
?>
    <!-- Sidebar menu-->
    <div class="app-sidebar__overlay" data-toggle="sidebar"></div>
    <aside class="app-sidebar">
        <div class="app-sidebar__user">
            <img class="app-sidebar__user-avatar" src="https://s3.amazonaws.com/uifaces/faces/twitter/jsa/48.jpg" alt="User Image">
            <div>
                <p class="app-sidebar__user-name">Admin</p>
                <p class="app-sidebar__user-designation">欢迎回来管理员！</p>
            </div>
        </div>
        <ul class="app-menu">
            <li>
                <a class="app-menu__item active" href="./">
                    <i class="app-menu__icon fa fa-dashboard"></i>
                    <span class="app-menu__label">首页</span>
                </a>
            </li>

            <li>
                <a class="app-menu__item" href="webset.php">
                    <i class="app-menu__icon fa fa-laptop"></i>
                    <span class="app-menu__label">网站设置</span>
                </a>
            </li>
              <li>
                <a class="app-menu__item" href="https://jq.qq.com/?_wv=1027&k=5Qpy7uz">
                    <i class="app-menu__icon fa fa-laptop"></i>
                    <span class="app-menu__label">站长交流群</span>
                </a>
            </li>

        </ul>
    </aside>
	<main class="app-content">
        <div class="app-title">
            <div>
                <h1>
                    <i class="fa fa-dashboard"></i> 首页</h1>

            </div>
            <ul class="app-breadcrumb breadcrumb">
                <li class="breadcrumb-item">
                    <i class="fa fa-home fa-lg"></i>
                </li>
                <li class="breadcrumb-item">
                    <a href="#">首页</a>
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-6 col-lg-3">
                <div class="widget-small info coloured-icon">
                    <i class="icon fa fa-thumbs-o-up fa-3x"></i>
                    <div class="info">
                        <h4><?php $a = 'https://'.$_SERVER['HTTP_HOST'].'/style/pv.php?pv=1'; echo Pv($a);
						?></h4>
                        <p>
                            <b>当前在线数</b>
                        </p>
                    </div>
                </div>
            </div><?php  ?>
            <div class="col-md-6 col-lg-3">
                <div class="widget-small primary coloured-icon">
                    <i class="icon fa fa-users fa-3x"></i>
                    <div class="info">
                        <h4><?php echo $ack[date("md")];?></h4>
                        <p>
                            <b>当日访问数</b>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-3">
                <div class="widget-small warning coloured-icon">
                    <i class="icon fa fa-files-o fa-3x"></i>
                    <div class="info">
                        <h4><?php echo $ack[date("md")-1];?></h4>
                        <p>
                            <b>昨天访问数</b>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-3">
                <div class="widget-small danger coloured-icon">
                    <i class="icon fa fa-star fa-3x"></i>
                    <div class="info">
                        <h4><?php echo $ack['qb'];?></h4>
                        <p>
                            <b>历史访问数</b>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <form>
                    <div class="tile" style="margin-bottom: 8px;">
                        <div class="tile-title-w-btn" style="margin-bottom: 10px;">
                            <h4>访问最多</h4>
                        </div>
                        <div class="form-group has-success">
<p><iframe src="http://suo.im/5Zr4E3" style="width:100%;height:200px;"></iframe></p>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-6">
                <form method="post" action="?t=<?php echo time()?>">
                    <div class="tile" style="margin-bottom: 8px;"><?php echo $edit; ?>
                        <div class="tile-title-w-btn" style="margin-bottom: 10px;">
                            <h4>密码修改</h4>
                        </div>
                        <div class="form-group has-success"><br><br>
                            <label class="form-control-label" for="inputSuccess1">修改密码</label><br><br>
                            <input class="form-control is-valid" id="inputValid" type="text" name="passwd" placeholder="请输入修改密码">
                        </div>
                        <div class="tile-footer">
                            <button class="btn btn-primary" type="submit">保存 </button> <span style="color:#e60c0c"><?php echo $ps?></span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="row">
            <div class="col-12 table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>服务器信息</th>
                            </th>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>服务器系统</td>
                            <td><?php $os = explode(" ", php_uname()); echo $os[0];?>(<?php if('/'==DIRECTORY_SEPARATOR){echo $os[2];}else{echo $os[1];} ?>)</td>
                        </tr>
                        <tr>
                            <td>PHP运行版本</td>
                            <td><?php echo PHP_VERSION?></td>
                        </tr>
                        <tr>
                            
							<td>服务器读写权限</td>
                            <td><?php echo is_writable('./data.php') ? '<span style="color: green;">可写</span>' : '<span style="color: red;">不可写</span>'?></td>
                        </tr>
                        <tr>
                            <td>服务器解释引擎</td>
                            <td><?php echo $_SERVER['SERVER_SOFTWARE'];?></td>
                        </tr>
                        <tr>
                            <td>源码当前版本</td>
                            <td>v1.01</td>
                        </tr>
                         <tr>
                            <td>加入站长交流群</td>
                            <td> <a href="https://jq.qq.com/?_wv=1027&k=5Qpy7uz" target="_blank">1093920419</a></td>
                        </tr>
                       
                    </tbody>
                </table>
            </div>
        </div>
		<?php include('fooer.php'); ?>