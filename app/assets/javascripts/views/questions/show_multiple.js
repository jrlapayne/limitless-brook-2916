QuizPop.Views.QuestionsShowMultiple = Backbone.View.extend({
	
	template: JST['questions/show_multiple'],
	
	events: {
		'click .answer' : 'submitAnswer',
		'click #next' : 'nextQuestion'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.question = options.question;
		this.challenge = options.challenge;
		this.user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		this.submitted = false;
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template({
			question: this.question
		}));
		setTimeout(function() {
			self.renderAnswers();
		}, 0);
		return this;
	},
	
	renderAnswers: function() {
		var view = new QuizPop.Views.AnswersIndex({
			attr: this.attr,
			question: this.question
		});
		$('#answers').html(view.render().el);
	},
	
	submitAnswer: function(event) {
		var answer = this.attr.answers.where({id: parseInt($(event.target).attr('id'))})[0],
			score;
		$('#url').removeClass('hide');
		
		if (answer.get('is_correct')) {
			score = 0;
		} else {
			score = 10;
		}
		
		this.attr.tasks.create({
			challenge_id: this.challenge.get('id'),
			user_id: this.user.get('id'),
			issue_id: this.question.get('issue_id'),
			question_id: this.question.get('id'),
			answer: answer,
			score: score
		});
		
		if (this.challenge.get('challenger') === this.user.get('id')) {
			this.challenge.set({
				challenger_score: this.challenge.get('challenger_score') + score
			});
		} else {
			this.challenge.set({
				user_score: this.challenge.get('user_score') + score
			});
		}
		this.challenge.save();
	},
	
	nextQuestion: function() {
		if (this.next_question) {
			Backbone.history.navigate('challenge' + this.challenge.get('id') + '/question' + this.next_question.get('id'), true);
		} else {
			Backbone.history.navigate('challenge' + this.challenge.get('id'), true);
		}
	},
});