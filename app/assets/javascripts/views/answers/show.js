QuizPop.Views.AnswersShow = Backbone.View.extend({
	
	template: JST['answers/show'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.answer = options.answer;
	},
	
	render: function() {
		$(this.el).addClass('answer');
		$(this.el).attr('id', this.answer.get('id'));
		$(this.el).html(this.template({
			answer: this.answer
		}));
		return this;
	}
});