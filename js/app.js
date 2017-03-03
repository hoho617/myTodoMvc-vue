
(function(exports){
	'use strict';
	// filter函数根据返回值是否为真来判断是否保留该值
	var filters ={
		 all:function(todos){
		 	return todos;
		 },
		 // 得到未完成的数组
		 active:function(todos){ // return todos.filter()的值为active函数的值
		 	return todos.filter(function(todo){ // return !todos.completed的值作为function(todo)的值
		 		return !todo.completed;
		 	})
		 },
		 // 得到已完成数组
		 completed:function(todos){
		 	return todos.filter(function(todo){
		 		return todo.completed;
		 	})
		 }
	};
	exports.app = new Vue({
		el:'.todoapp',
		data:{
			input : '',			
            currentEditingId:-1,
			todos:todoStorage.fetch(),
            flag:true,
            status:'all', // 显示状态
		},
		computed:{ // 计算属性
			remainingItem:function(){
				return filters.active(this.todos).length;
			},
			filteredTodos:function(){
				return filters[this.status](this.todos);
			}
			
		},
		watch:{
			todos:{
				handler:todoStorage.save,
				deep:true
			}
		},
		methods:{
			// 添加todo
			addTodo:function(){
				if(!this.input){
					return;
				}
				this.todos.push({
					id:Math.random(),
					text:this.input,
					completed:false
				});
				this.input = '';
			},
			// 删除todo
			removeTodo:function(id){
				for(var i = 0;i < this.todos.length;i++){
					if(this.todos[i].id === id) {
						this.todos.splice(i,1);
					}
				}
			},
			// 清空已完成
			clearCompleted:function(){
				var newTodos = [];
				for(var i = 0; i < this.todos.length;i++) {
					if(!this.todos[i].completed) {
						newTodos.push(this.todos[i]);
					}
				}
				this.todos = newTodos;
			},
			// 显示clearCompleted
			hasCompleted:function(){
				for(var i = 0;i < this.todos.length;i++) {
					if(this.todos[i].completed) {
						return true;
					}
				}
				return false;
			},
			// 双击编辑
			editing:function(id){
				this.currentEditingId = id;
			},
			// 保存
			save:function(){
				this.currentEditingId = -1;
			},
			// 全选或取消全选
			selectAll:function(){
				for(var i = 0;i < this.todos.length;i++) {
					this.todos[i].completed = this.flag;
				}
				this.flag = !this.flag;
			},
		}
	});
})(window);
