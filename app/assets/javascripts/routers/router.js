QuizPop.Routers.Router = Backbone.Router.extend({
	
	routes: {
		'' 								: 'challengeIndex',
		'challenge:id' 					: 'challengeResults',
		'challenge:id/question:q_id' 	: 'questionShow',
		'new' 							: 'getFriends',
		'issue:id' 						: 'issueSelect'
	},
	
	initialize: function(options) {
		this.current_view = null;
		this.current_user = options.current_user;
		this.users = options.users;
		this.issues = options.issues;
		this.questions = options.questions;
		this.challenges = options.challenges;
		this.tasks = options.tasks;
		
		this.attr = {
			current_user: this.current_user,
			users: this.users,
			issues: this.issues,
			questions: this.questions,
			challenges: this.challenges,
			tasks: this.tasks
		};
	},
	
	setCurrentView: function(view) {
		if (this.current_view) {
			this.current_view.remove();
			this.current_view.unbind();
			
			if (this.current_view.onClose) {
				this.current_view.onClose();
			}
		}
		
		this.current_view = view;
	},
	
	getFriends: function(user) {
		var self = this;
		//start loading
		FB.api('/me/friends?access_token=' + this.current_user.get("token"), function(response) {
			self.challengeCreate(response["data"]);
		});
	},
	
	challengeIndex: function() {
		var view = new QuizPop.Views.ChallengesIndex({
			attr: this.attr
		});
		this.setCurrentView(view);
		$('#page').html(view.render().el);
	},
	
	challengeCreate: function(friends) {
		//end loading
		this.friends = friends;
		var view = new QuizPop.Views.ChallengesCreate({
			attr: this.attr,
			friends: this.friends
		});
		this.setCurrentView(view);
		$('#page').html(view.render().el);
	},
	
	issueSelect: function(id) {
		var view = new QuizPop.Views.IssuesIndex({
			attr: this.attr,
			challenge: this.challenges.where({id: parseInt(id)})[0]
		});
		this.setCurrentView(view);
		$('#page').html(view.render().el);
	},
	
	questionShow: function(id, q_id) {
		var view = new QuizPop.Views.QuestionsShow({
			attr: this.attr,
			challenge: this.challenges.where({id: parseInt(id)})[0],
			question: this.questions.where({id: parseInt(q_id)})[0]
		});
		this.setCurrentView(view);
		$('#page').html(view.render().el);
	},
	
	challengeResults: function(id) {
		var view = new QuizPop.Views.ChallengesResults({
			attr: this.attr,
			challenge: this.challenges.where({id: parseInt(id)})[0]
		});
		this.setCurrentView(view);
		$('#page').html(view.render().el);
	}
});