QuizPop.Views.AnswersIndex = Backbone.View.extend({

	template: JST['answers/index'],
	
	events: {
		'click .answer' : 'submitAnswer'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.question = options.question;
		this.answers = this.attr.answers.where({question_id: this.question.get('id')});
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template());
		setTimeout(function() {
			_.each(self.answers, function(a) {
				self.renderAnswer(a);
			});
		}, 0);
		return this;
	},
	
	renderAnswer: function(answer) {
		var view = new QuizPop.Views.AnswersShow({
			attr: this.attr,
			answer: answer
		});
		$(this.el).append(view.render().el);
	},
	
	revealCorrectAnswer: function() {
		_.each(this.answers, function(a) {
			if (a.get('is_correct')) {
				$('#slider_or_multiple_choice').find('#' + a.get('id')).addClass('correct_answer');
			}
		});
	},
	
	showChallengerAnswer: function() {
		var challenger_answer = this.attr.answers.where({id: this.attr.tasks.where({challenge_id: this.challenge.get('id'), question_id: this.question.get('id')})[0].get('answer_id')})[0];
		
		$('#slider_or_multiple_choice').find('#' + a.get('id')).addClass('challenger_answer');
	},
	
	showRageComic: function() {
		var is_win;

		if (Math.abs(user_answer - this.correct) < Math.abs(this.challenger_task.get('answer') - this.correct)) {
			is_win = true;
		} else {
			is_win = false;
		}
		var view = new QuizPop.Views.QuestionsRage({
			is_win: is_win
		});
		$('#rage_comic').html(view.render().el);
	},
	
	submitAnswer: function(event) {
		var answer,
			score;
			
		event.preventDefault();
		if (!window.slider_defaults.disabled) {
			window.slider_defaults.disabled = true;
			this.revealCorrectAnswer();
			$('#slider_or_multiple_choice').find('#' + event.target.closest('.answer').attr('id')).addClass('user_answer');
			answer = this.attr.answers.where({id: parseInt($(event.target).closest('.answer').attr('id'))})[0];
			if (answer.get('is_correct')) {
				score = 0;
			} else {
				score = 10;
			}
			$('#url').removeClass('hide');
		
			this.attr.tasks.create({
				challenge_id: this.challenge.get('id'),
				user_id: this.user.get('id'),
				issue_id: this.question.get('issue_id'),
				question_id: this.question.get('id'),
				answer_id: answer.get('id'),
				score: score
			});
		
			if (this.challenge.get('challenger') === this.user.get('id')) {
				this.challenge.set({
					challenger_score: this.challenge.get('challenger_score') + score
				});
			} else {
				this.showChallengerAnswer();
				this.showRageComic();
				this.challenge.set({
					user_score: this.challenge.get('user_score') + score
				});
			}
			this.challenge.save();
			this.setNextQuestion();
		}
	},
	
	setNextQuestion: function() {
		var question_ids = this.challenge.get('question_ids'); 
		switch(question_ids.split('/').indexOf(String(this.question.get('id')))) {
			case 0:
				window.next_question = this.attr.questions.where({id: parseInt(question_ids.split('/')[1])})[0];
				break;
			case 1:
				window.next_question = this.attr.questions.where({id: parseInt(question_ids.split('/')[2])})[0];
				break;
			case 2:
				if (this.current_user.get('id') === this.challenge.get('challenger_id')) {
					this.challenge.set({is_sent: true});
				} else {
					var winner_id;
					if  (this.challenge.get('challenger_score') < this.challenge.get('user_score')) {
						winner_id = this.challenge.get('challenger_id');
					} else {
						winner_id = this.challenge.get('user_id');
					}
					this.challenge.set({
						is_finished: true,
						winner_id: winner_id
					});
				}
				this.challenge.save();
				window.next_question = null;
				break;
		};
	}
});
