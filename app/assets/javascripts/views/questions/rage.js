QuizPop.Views.QuestionsRage = Backbone.View.extend({
	
	template: JST['questions/rage'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.is_win = options.is_win;
		if (this.is_win) {
			this.img_num = Math.floor(Math.random() * 16);
		} else {
			this.img_num = Math.floor(Math.random() * 23);
		}
	},
	
	render: function() {
		$(this.el).html(this.template({
			num: this.img_num,
			is_win: this.is_win
		}));
		return this;
	}
});