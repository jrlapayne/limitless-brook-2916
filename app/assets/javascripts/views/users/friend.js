QuizPop.Views.UsersFriend = Backbone.View.extend({
	
	template: JST['users/friend'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.friends = options.friends;
		this.friend = options.friend;
	},
	
	render: function() {
		$(this.el).addClass('friend');
		$(this.el).attr('id', this.friends.indexOf(this.friend));
		$(this.el).html(this.template({
			friend: this.friend
		}));
		return this;
	}
});