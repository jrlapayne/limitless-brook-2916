QuizPop.Views.ChallengesResults = Backbone.View.extend({
	
	template: JST['challenges/results'],
	
	events: {
		'click #send_challenge' : 'sendChallenge'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.challenge = options.challenge;
		this.current_user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		this.winner = this.attr.users.where({id: this.challenge.get('winner_id')})[0];
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template({
			challenge: this.challenge,
			user: this.current_user,
			winner: this.winner
		}));
		setTimeout(function() {
			for (i = 0; i < 3; i++) {
				self.renderResult(self.attr.questions.where({id: parseInt(self.challenge.get('question_ids').split('/')[i])})[0]);
			}
		}, 0);
		setTimeout(function() {
			window.scrollTo(0, 1);
		}, 1000);
		return this;
	},
	
	renderResult: function(question) {
		var view = new QuizPop.Views.QuestionsResult({
			attr: this.attr,
			challenge: this.challenge,
			question: question
		});
		$('#results').append(view.render().el);
	},
	
	sendChallenge: function(event) {
		$('#versus').empty();
		if (this.current_user.get('id') === this.challenge.get('user_id')) {
			this.createChallenge(this.attr.users.where({id: this.challenge.get('challenger_id')})[0]);
		} else {
			Backbone.history.navigate('', true);
		}
	},
	
	createChallenge: function(user) {
		var self = this;
		this.attr.challenges.create({
			challenger_id: this.current_user.get('id'),
			user_id: user.get('id')
		}, {
			success: function(challenge, response) {
				Backbone.history.navigate('issue' + challenge.get('id'), true);
			},
			error: function(challenge, response) {

			}
		});
	},
	
	startLoading: function() {
		var view = new QuizPop.Views.PagesLoading();
		$('#loading').removeClass('inactive');
		$('#loading').addClass('active');
		$('#loading').html(view.render().el);
	},
	
	 endLoading: function() {
		$('#loading').removeClass('active');
		$('#loading').addClass('inactive');
		$('#loading').children().remove();
	}
});