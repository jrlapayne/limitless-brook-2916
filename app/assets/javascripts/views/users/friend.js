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
		var self = this;
		$(this.el).addClass('friend');
		$(this.el).attr('id', this.friends.indexOf(this.friend));
		$(this.el).html(this.template({
			friend: this.friend
		}));
		setTimeout(function() {
			self.renderThemStarsFucker();
		}, 0);
		return this;
	},
	
	renderThemStarsFucker: function() {
		var view = new QuizPop.Views.UsersGlobalStarsLeft({
			attr: this.attr,
			user: this.friend
		});
		$(this.el).find('#left_global_stars').html(view.render().el);
	}
});