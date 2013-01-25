QuizPop.Views.QuestionsResult = Backbone.View.extend({
	
	template: JST['questions/result'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.challenge = options.challenge;
		this.question = options.question;
		this.current_user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		this.question_winner = null;
		this.setChallengerUser();
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template({
			question: this.question,
			winner: this.winner
		}));
		setTimeout(function() {
			if (self.is_complete) {
				self.renderUser(self.user, false);
				self.renderUser(self.challenger, true);
			} else {
				self.renderUser(self.challenger, false);
			}
		}, 0);
		return this;
	},
	
	renderUser: function(user, is_challenger) {
		var view = new QuizPop.Views.UsersResult({
			attr: this.attr,
			task: this.getTask(user),
			user: user,
			winner: this.question_winner
		});
		if (is_challenger) {
			$(this.el).find('#challenger_info').html(view.render().el);
		} else {
			$(this.el).find('#user_info').html(view.render().el);
		}
	},
	
	setChallengerUser: function() {
		if (this.challenge.get('challenger_id') === this.current_user.get('id')) {
			this.challenger = this.current_user;
			this.user = this.attr.users.where({id: this.challenge.get('user_id')})[0];
			this.is_complete = false;
		} else {
			this.challenger = this.attr.users.where({id: this.challenge.get('challenger_id')})[0];
			this.user = this.current_user;
			this.is_complete = true;
			this.findQuestionWinner(this.user, this.challenger);
		}
		
		if (this.is_complete) {
			if (this.challenge.get('challenger_score') < this.challenge.get('user_score')) {
				this.winner = this.challenger;
			} else {
				this.winner = this.user;
			}
		} else {
			this.winner = null;
		}
	},
	
	getTask: function(user) {
		 return this.attr.tasks.where({
			user_id: user.get('id'), 
			challenge_id: this.challenge.get('id'), 
			question_id: this.question.get('id')
		})[0];
	},
	
	findQuestionWinner: function(user1, user2) {
		var task1 = this.getTask(user1),
			task2 = this.getTask(user2);
			
		if (task1.get('score') < task2.get('score')) {
			this.question_winner = user1;
		} else {
			this.question_winner = user2;
		}
	}
});