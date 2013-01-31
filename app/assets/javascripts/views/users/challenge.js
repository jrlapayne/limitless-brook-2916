QuizPop.Views.UsersChallenge = Backbone.View.extend({
	
	template: JST['users/challenge'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.challenge = options.challenge;
		this.issue = this.attr.issues.where({id: this.challenge.get('issue_id')})[0];
		this.user = this.attr.users.where({id: this.challenge.get('user_id')})[0];
		this.challenger = this.attr.users.where({id: this.challenge.get('challenger_id')})[0];
		this.counter = options.counter;
		this.subviews = [];
		
		this.attr.users.on('add', this.render, this);
	},
	
	render: function() {
		var self = this;
		if (this.counter % 2 === 0) {
			$(this.el).addClass('challenge_container challenge_container_even');
		} else {
			$(this.el).addClass('challenge_container challenge_container_odd');
		}
		$(this.el).html(this.template({
			user: this.user,
			issue: this.issue,
			challenger: this.challenger
		}));
		setTimeout(function() {
			self.renderStarsLeft();
			self.renderStarsRight();
		}, 0);
		return this;
	},
	
	renderStarsLeft: function() {
		var view = new QuizPop.Views.UsersStarsLeft({
			attr: this.attr,
			issue: this.issue,
			user: this.user
		});
		$(this.el).find('#left_stars').html(view.render().el);
	},
	
	renderStarsRight: function() {
		var view = new QuizPop.Views.UsersStarsRight({
			attr: this.attr,
			issue: this.issue,
			user: this.challenger
		});
		$(this.el).find('#right_stars').html(view.render().el);
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