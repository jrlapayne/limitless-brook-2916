QuizPop.Views.UsersRank = Backbone.View.extend({
	
	template: JST['users/rank'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.user = options.user;
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template({
			challenges_won: this.getChallengesWon(),
			user: this.user
		}));
		setTimeout(function() {
			//self.renderBubbles();
		}, 0);
		return this;
	},
	
	getChallengesWon: function() {
		return this.attr.challenges.where({winner_id: this.user.get('id')}).length;	
	},
	
	renderBubbles: function() {
		var view = new QuizPop.Views.UsersBubbles({
			attr: this.attr,
			user: this.user,
			challenges_won: this.getChallengesWon()
		});
		$('#bubbles').html(view.render().el);
	}
});