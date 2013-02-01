QuizPop.Views.UsersResult = Backbone.View.extend({
	
	template: JST['users/result'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.task = options.task;
		this.user = options.user;
		this.question = this.attr.questions.where({id: this.task.get('question_id')})[0];
		this.winner = options.winner;
		
		if (this.question.get('is_slider')) {
			this.slider = this.attr.sliders.where({question_id: this.question.get('id')})[0];
			this.correct = this.addUnits(this.roundIntOrDecimal(this.slider.get('correct')));
			this.user_answer = this.addUnits(this.roundIntOrDecimal(this.task.get('answer')));
		} else {
			this.answer = this.attr.answers.where({question_id: this.question.get('id'), is_correct: true})[0];
			this.correct = this.answer.get('content');
			this.user_answer = this.attr.answers.where({id: this.task.get('answer_id')})[0].get('content');
		}
		if (this.winner) {
			if (this.winner.get('id') === this.user.get('id')) {
				this.is_winner = true;
			} else {
				this.is_winner = false;
			}
		} else {
			this.is_winner = null;
		}
	},
	
	render: function() {
		alert(this.correct + '    ' + this.user_answer);
		$(this.el).html(this.template({
			user: this.user,
			correct: this.correct,
			user_answer: this.user_answer,
			is_winner: this.is_winner,
			winner: this.winner
		}));
		return this;
	},
	
	roundIntOrDecimal: function(val) {
		if (this.slider.get('correct') % 1 !== 0 || this.slider.get('min') % 1 !== 0) {
			if (((this.correct % 1) * 10) % 1 === 0) {
				return Math.floor(val * 10) / 10;
			} else {
				return Math.floor(val * 100) / 100;
			}
		} else {
			return this.addCommas(Math.round(val));
		}
	},
	
	addCommas: function(val){
		while (/(\d+)(\d{3})/.test(val.toString())){
			val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
		}
		return val;
	},
	
	addUnits: function(val) {
		var units = this.slider.get('units');
		var index = units.indexOf('/');
		if (index === 0) {
			return val.toString() + units.substring(index + 1);
		} else {
			return units.substring(0, index) + val.toString();
		}
	}
});