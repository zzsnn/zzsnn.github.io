<?php
include('inc.php');
include('head.php');
include('data.php');
//?title=1&keyword=2&subtitle=3&email=4&description=5&tj=6&mobile=7&pc=8&fooer=9&icp=0
$edit='';
if(empty($_GET['t'])){
	$ps = '';
}else{
	if(empty($_POST['title']||$_POST['keyword'])||$_POST['subtitle']||$_POST['email']||$_POST['description']||$_POST['tj']||$_POST['mobile']||$_POST['pc']||$_POST['fooer']||$_POST['icp']||$_POST['list']||$_POST['on']){
		
		$datas = array('title' =>$_POST['title'],'keyword' => $_POST['keyword'],'subtitle' => $_POST['subtitle'],'email' => $_POST['email'],'description' => $_POST['description'],'tj' => $_POST['tj'],'mobile' => $_POST['mobile'],'pc' => $_POST['pc'],'fooer' =>$_POST['fooer'],'icp' =>$_POST['icp'],'list' =>$_POST['list'],'on' =>$_POST['on']);
		$data = '<?php
 $aik =  '.var_export($datas,true).';
?>';
		file_put_contents("data.php",$data);
		//exit('<meta http-equiv="refresh" content="2;url=./webset.php">保存完成，若不能正常跳转<a href="./webset.php">请点我</a>');
		$edit = '<div class="overlay">
    <div class="m-loader mr-4">
        <svg class="m-circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10" />
        </svg>
    </div>
	<meta http-equiv="refresh" content="2;url=./webset.php">
    <h3 class="l-text">Loadings</h3>
</div>';
		//echo '<script>alert("保存成功");document.location="admin.php";</script>';
	}else{
		$ps = '请输入完整，切勿留空！';
		}
	}
if($aik['on']=='on'){
	$on = '开';
}else{
	$on = '关';
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
                <a class="app-menu__item" href="./">
                    <i class="app-menu__icon fa fa-dashboard"></i>
                    <span class="app-menu__label">首页</span>
                </a>
            </li>

            <li class="treeview is-expanded">
                <a class="app-menu__item" href="webset.php" data-toggle="treeview">
                    <i class="app-menu__icon fa fa-laptop"></i>
                    <span class="app-menu__label">网站设置</span>
                </a>
            </li>

        </ul>
        </li>
        </ul>
    </aside>
	
	<main class="app-content">
        <div class="app-title">
            <div>
                <h1>
                    <i class="fa fa-edit"></i> 网站设置</h1>
            </div>
            <ul class="app-breadcrumb breadcrumb">
                <li class="breadcrumb-item">
                    <i class="fa fa-home fa-lg"></i>
                </li>
                <li class="breadcrumb-item">
                    <a href="#">网站设置</a>
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="tile">
					<form method="post" action="?t=<?php echo time()?>">
						<div class="row"> 
                            <div class="col-lg-6"><?php echo $edit; ?>
                                <div class="form-group">
                                    <label for="title">网站名称</label>
                                    <input class="form-control" id="title" type="text" name="title" value="<?php echo $aik['title']?>" aria-describedby="emailHelp" placeholder="请输入网站名称">
                                </div>
                                <div class="form-group">
                                    <label for="keyword">网站关键字</label>
                                    <input class="form-control" id="keyword" type="text" name="keyword" value="<?php echo $aik['keyword']?>" aria-describedby="emailHelp" placeholder="请输入网站关键字">
                                </div>
                                <div class="form-group">
                                    <label for="subtitle">网站副标题</label>
                                    <input class="form-control" id="subtitle" type="text" name="subtitle" value="<?php echo $aik['subtitle']?>" aria-describedby="emailHelp" placeholder="请输入网站副标题">
                                </div>
                                <div class="form-group">
                                    <label for="email">网站站长邮箱</label>
                                    <input class="form-control" id="email" type="text" name="email" value="<?php echo $aik['email']?>" aria-describedby="emailHelp" placeholder="请输入网站站长邮箱">
                                </div>
                                <div class="form-group">
                                    <label for="description">网站描述信息</label>
                                    <input class="form-control" id="description" type="text" name="description" value="<?php echo $aik['description']?>" aria-describedby="emailHelp" placeholder="请输入网站描述信息">
                                </div>

                                <div class="form-group">
                                    <label for="tj">统计代码</label>
                                    <textarea class="form-control" id="tj" type="text" name="tj" placeholder="将获取到的统计代码直接复制过来就行了" rows="3"><?php echo $aik['tj']?></textarea>
                                </div>
							</div>
							<div class="col-lg-4 offset-lg-1"><?php echo $edit; ?>
                                <div class="form-group has-danger">
                                    <label class="form-control-label" for="mobile">移动端解析</label>
                                    <input class="form-control is-invalid" id="mobile" type="text" name="mobile" value="<?php echo $aik['mobile']?>">
                                </div>
                                <div class="form-group has-success">
                                    <label class="form-control-label" for="pc">P C端解析</label>
                                    <input class="form-control is-valid" id="pc" type="text" name="pc" value="<?php echo $aik['pc']?>">
                                </div>
                                <div class="form-group has-success">
                                    <label class="form-control-label" for="fooer">底部版权</label>
                                    <input class="form-control is-valid" id="fooer" type="text" name="fooer" value="<?php echo $aik['fooer']?>">
                                </div>
                                <div class="form-group has-danger">
                                    <label class="form-control-label" for="icp">网站备案号</label>
                                    <input class="form-control is-invalid" id="icp" type="text" name="icp" value="<?php echo $aik['icp']?>">
                                </div>
                                <div class="form-group">
                                    <label for="list">防盗域名白名单</label>
                                    <textarea class="form-control" id="list" name="list" placeholder="多个域名用英文逗号隔开，不用带http://" rows="3"><?php echo $aik['list']?></textarea>
                                </div>
                                <div class="col-md-6">
                                    <p>
                                        <b>是否开启防盗链</b>
                                    </p>
                                    <div class="toggle-flip">
                                        <label>
                                            <input type="checkbox" name="on">
                                            <span class="flip-indecator" data-toggle-on="<?php if($aik['on']=='on'){echo '关';}else{echo '开';} ?>" data-toggle-off="<?php echo $on?>"></span>
                                        </label>
                                    </div>
                                </div>
							</div>
						</div>
						<div class="tile-footer">
							<button class="btn btn-primary" type="submit">保存</button>
						</div>
					</form>
                </div>
            </div>
        </div>
		<?php include('fooer.php'); ?>
		