QuizPop.Views.QuestionsResult = Backbone.View.extend({
	
	template: JST['questions/result'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.challenge = options.challenge;
		this.question = options.question;
		this.current_user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];

		this.setChallengerUser();
	},
	
	render: function() {
		$(this.el).html(this.template({
			question: this.question,
			task: this.attr.tasks.where({
				user_id: this.current_user.get('id'), 
				challenge_id: this.challenge.get('id'), 
				question_id: this.question.get('id')
			})[0]
		}));
		return this;
	},
	
	setChallengerUser: function() {
		if (this.challenge.get('challenger_id') === this.current_user.get('id')) {
			this.challenger = this.current_user;
			this.user = this.attr.users.where({id: this.challenge.get('user_id')})[0];
		} else {
			this.challenger = this.attr.users.where({id: this.challenge.get('challenger_id')})[0];
			this.user = this.current_user;
		}
	}
});