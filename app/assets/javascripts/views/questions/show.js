QuizPop.Views.QuestionsShow = Backbone.View.extend({
	
	template: JST['questions/show'],
	
	events: {
		'click #next' : 'nextQuestion'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.question = options.question;
		this.challenge = options.challenge;
		this.user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		this.submitted = false;
		
		setTimeout(function() {
			window.scrollTo(0, 1);
		}, 1000);
	},

	renderSlider: function() {
		var self = this;
		$(this.el).html(this.template({
			question: this.question
		}));
		setTimeout(function() {
			self.slidersShow();
		}, 0);
		return this;
	},
	
	renderMultipleChoice: function() {
		var self = this;
		$(this.el).html(this.template({
			question: this.question
		}));
		setTimeout(function() {
			self.answersIndex();
		}, 0);
		return this;
	},
	
	answersIndex: function() {
		var view = new QuizPop.Views.AnswersIndex({
			attr: this.attr,
			question: this.question
		});
		$('#slider_or_multiple_choice').html(view.render().el);
	},
	
	slidersShow: function() {
		var view = new QuizPop.Views.SlidersShow({
			attr: this.attr,
			slider: this.slider,
			question: this.question,
			challenge: this.challenge
		});
		$('#slider_or_multiple_choice').html(view.render().el);
	},
	
	nextQuestion: function() {
		if (window.next_question) {
			Backbone.history.navigate('challenge' + this.challenge.get('id') + '/question' + window.next_question.get('id'), true);
		} else {
			Backbone.history.navigate('challenge' + this.challenge.get('id'), true);
		}
	},
});