QuizPop.Views.UsersIssueRank = Backbone.View.extend({
	
	template: JST['users/issue_rank'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.user = options.user;
		this.issue = options.issue;
	},
	
	render: function() {
		$(this.el).html(this.template({
			challenges_won: this.getChallengesWon(),
			user: this.user
		}));
		return this;
	},
	
	getChallengesWon: function() {
		return this.attr.challenges.where({issue_id: this.issue.get('id'), winner_id: this.user.get('id')}).length;	
	}
});