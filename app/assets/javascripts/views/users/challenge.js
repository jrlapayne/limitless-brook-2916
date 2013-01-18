QuizPop.Views.UsersChallenge = Backbone.View.extend({
	
	template: JST['users/challenge'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.user = options.user;
		this.subviews = [];
		
		this.attr.users.on('add', this.render, this);
	},
	
	render: function() {
		$(this.el).html(this.template({
			user: this.user
		}));
		return this;
	},
	
	onClose: function() {
		_.each(this.subviews, function(view) {
			view.remove();
			view.unbind();
			
			if (view.onClose) {
				view.onClose();
			}
		});
		
		this.attr.users.unbind('add', this.render);
	}
});