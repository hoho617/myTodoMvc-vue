(function(exports){
	'use strict';
	var STORAGE_KEY = 'todos';
	exports.todoStorage = {
		fetch:function(){ // 取
			return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
		},
		save:function(item){
			localStorage.setItem(STORAGE_KEY,JSON.stringify(item));
		}
	}
})(window);
