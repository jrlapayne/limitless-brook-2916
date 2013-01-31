QuizPop.Views.UserChallengeBar = Backbone.View.extend({
	
	template: JST['users/challenge_bar'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
	},
	
	render: function() {
		$(this.el).html(this.template({
			
		}));
		return this;
	}
});