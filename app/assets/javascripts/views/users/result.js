QuizPop.Views.UsersResult = Backbone.View.extend({
	
	template: JST['users/result'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.task = options.task;
		this.user = options.user;
	},
	
	render: function() {
		$(this.el).html(this.template({
			user: this.user,
			task: this.task
		}));
		return this;
	}
});