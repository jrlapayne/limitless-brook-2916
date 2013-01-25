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
		$(this.el).html(this.template({
			user: this.user,
			task: this.task,
			correct: this.roundIntOrDecimal(this.question.get('correct')),
			is_winner: this.is_winner,
			winner: this.winner
		}));
		return this;
	},
	
	roundIntOrDecimal: function(val) {
		if (this.question.get('is_decimal')) {
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
});