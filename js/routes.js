(function(app,Router){
	'use strict'
	var router = new Router();
	['all','active','completed'].forEach(function(status){ // status代表着all、active、completed
		// 当匹配成功的时候执行的,将status
		router.on(status,function(){ //status代表当前的路由参数
			app.status = status; // 改变前台的status
		});
	});
	// 没有匹配任何路由信息
	router.configure({
		notfound:function(){
			window.location.hash = "";
			app.status = 'all';
		}
	});
	router.init();
})(app,Router);
