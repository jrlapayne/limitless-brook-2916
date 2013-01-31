QuizPop.Views.IssuesShow = Backbone.View.extend({
	
	template: JST['issues/show'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.issue = options.issue;
		this.challenge = options.challenge;
		this.user = this.attr.users.where({id: this.challenge.get('user_id')})[0];
		this.challenger = this.attr.users.where({id: this.challenge.get('challenger_id')})[0];
		this.counter = options.counter;
	},
	
	render: function() {
		var self = this;
		if (this.counter % 2 === 0) {
			$(this.el).addClass('challenge_container challenge_container_even');
		} else {
			$(this.el).addClass('challenge_container challenge_container_odd');
		}
		$(this.el).addClass('issue');
		$(this.el).attr('id', this.issue.get('id'));
		$(this.el).html(this.template({
			issue: this.issue,
			user: this.user,
			challenger: this.challenger
		}));
		setTimeout(function() {
			self.renderLeftStars();
			self.renderRightStars();
		}, 0);
		return this;
	},
	
	renderLeftStars: function() {
		var view = new QuizPop.Views.UsersStarsLeft({
			attr: this.attr,
			issue: this.issue,
			user: this.user
		});
		$(this.el).find('#issue_left_stars').html(view.render().el);
	},
	
	renderRightStars: function() {
		var view = new QuizPop.Views.UsersStarsRight({
			attr: this.attr,
			issue: this.issue,
			user: this.challenger
		});
		$(this.el).find('#issue_right_stars').html(view.render().el);
	}
});