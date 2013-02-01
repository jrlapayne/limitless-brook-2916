QuizPop.Views.ChallengesIndex = Backbone.View.extend({
	
	template: JST['challenges/index'],
	
	events: {
		'click .active.challenge' : 'acceptChallenge',
		'click #create' : 'createChallenge'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.current_user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		this.recieved_challenges = this.attr.challenges.where({user_id: this.current_user.get('id'), is_sent: true, is_finished: false});
		this.sent_challenges = this.attr.challenges.where({challenger_id: this.current_user.get('id'), is_sent: true, is_finished: false});
		this.subviews = [];
	},
	
	render: function() {
		var counter = 0;
		var self = this;
		$(this.el).html(this.template({
			challenges: this.recieved_challenges.length
		}));
		setTimeout(function() {
			_.each(self.recieved_challenges, function(c) {
				self.renderChallenge(c, counter);
				counter = counter + 1;
			});
			_.each(self.sent_challenges, function(c) {
				self.renderChallenged(c, counter);
				counter = counter + 1;
			});
			if (self.recieved_challenges.length === 0) {
				$('#hide_if_empty').addClass('hide');
			}
			if (self.sent_challenges.length === 0) {
				$('#unanswered_challenges').addClass('hide');
				$('.challenges_bottom_container').addClass('hide');
			}
		}, 0);
		setTimeout(function() {
			window.scrollTo(0, 1);
		}, 1000);
		return this;
	},
	
	renderChallenge: function(challenge, counter) {
		var view = new QuizPop.Views.ChallengesShow({
			attr: this.attr,
			challenge: challenge,
			is_user_challenger: false,
			counter: counter
		});
		this.subviews.push(view);
		$('#available_challenges').append(view.render().el);
	},
	
	renderChallenged: function(challenge, counter) {
		var view = new QuizPop.Views.ChallengesShow({
			attr: this.attr,
			challenge: challenge,
			is_user_challenger: true,
			counter: counter
		});
		this.subviews.push(view);
		$('#unanswered_challenges').append(view.render().el);
	},
	
	acceptChallenge: function(event) {
		var challenge = this.attr.challenges.where({id: parseInt($(event.target).closest('.challenge').attr('id'))})[0];
		Backbone.history.navigate('challenge' + challenge.get('id') + '/question' + challenge.get('question_ids').split('/')[0], true);
	},
	
	createChallenge: function() {
		Backbone.history.navigate('new', true);
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
	},
	
	onClose: function() {
		_.each(this.subviews, function(view) {
			view.remove();
			view.unbind();
			
			if (view.onClose) {
				view.onClose();
			}
		});
	}
});
