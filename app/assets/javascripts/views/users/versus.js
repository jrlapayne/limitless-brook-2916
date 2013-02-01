QuizPop.Views.UsersVersus = Backbone.View.extend({
	
	template: JST['users/versus'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.challenge = options.challenge;
		this.issue = this.attr.issues.where({id: this.challenge.get('issue_id')})[0];
		this.challenger = this.attr.users.where({id: this.challenge.get('challenger_id')})[0];
		this.user = this.attr.users.where({id: this.challenge.get('user_id')})[0];
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template({
			issue: this.issue,
			challenger: this.challenger,
			user: this.user
		}));
		setTimeout(function() {
			self.renderLeftStars();
			self.renderRightStars();
		}, 0);
		return this;
	},
	
	renderLeftStars: function() {
		var view = new QuizPop.Views.UsersQuestionStarsLeft({
			attr: this.attr,
			issue: this.issue,
			user: this.user
		});
		$(this.el).find('#question_left_stars').html(view.render().el);
	},
	
	renderRightStars: function() {
		var view = new QuizPop.Views.UsersQuestionStarsRight({
			attr: this.attr,
			issue: this.issue,
			user: this.challenger
		});
		$(this.el).find('#question_right_stars').html(view.render().el);
	}
});