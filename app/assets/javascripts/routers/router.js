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
		this.answers = options.answers;
		this.sliders = options.sliders;
		this.challenges = options.challenges;
		this.tasks = options.tasks;
		
		this.attr = {
			current_user: this.current_user,
			users: this.users,
			issues: this.issues,
			questions: this.questions,
			sliders: this.sliders,
			answers: this.answers,
			challenges: this.challenges,
			tasks: this.tasks
		};
		
		this.renderGlobalRank();
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
	
	renderGlobalRank: function() {
		var view = new QuizPop.Views.UsersRank({
			attr: this.attr,
			user: this.attr.users.where({id: this.current_user.get('id')})[0]
		});
		$('.profile_container').html(view.render().el);
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
		var question = this.questions.where({id: parseInt(q_id)})[0],
			challenge = this.challenges.where({id: parseInt(id)})[0],
			view = new QuizPop.Views.QuestionsShow({
				attr: this.attr,
				challenge: challenge,
				question: question
			});
		this.setCurrentView(view);
		if (question.get('is_slider')) {
			$('#page').html(view.renderSlider().el);	
		} else {
			$('#page').html(view.renderMultipleChoice().el);
		}
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