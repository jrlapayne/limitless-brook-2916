QuizPop.Views.ChallengesShow = Backbone.View.extend({
	
	template: JST['challenges/show'],
	
	events: {

	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.challenge = options.challenge;
		this.current_user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		this.is_user_challenger = options.is_user_challenger;
		this.can_drag = false;
		this.subviews = [];
	},
	
	render: function() {
		var self = this;
		$(this.el).attr('id', this.challenge.get('id'));
		$(this.el).addClass('active challenge');
		$(this.el).html(this.template({
			
		}));
		setTimeout(function() {
			self.renderUserInfo();
		}, 0);
		return this;
	},
	
	renderUserInfo: function() {
		var user;
		if (this.is_user_challenger) {
			user = this.attr.users.where({id: this.challenge.get('user_id')})[0];
		} else {
			user = this.attr.users.where({id: this.challenge.get('challenger_id')})[0];
		}
		
		var view = new QuizPop.Views.UsersChallenge({
			attr: this.attr,
			user: user,
			challenge: this.challenge
		});
		this.subviews.push(view);
		$(this.el).find('#user_info').html(view.render().el);
	},
	
	onClose: function() {
		_.each(this.subviews, function(view) {
			view.remove();
			view.unbind();
			
			if (view.onClose) {
				view.onClose();
			}
		});
	}
});