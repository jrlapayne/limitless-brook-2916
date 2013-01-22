QuizPop.Views.ChallengesIndex = Backbone.View.extend({
	
	template: JST['challenges/index'],
	
	events: {
		'click .active.challenge' : 'acceptChallenge',
		'click #create' : 'createChallenge'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.current_user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		this.subviews = [];
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template({
			challenges: this.attr.challenges.where({user_id: this.current_user.get('id'), is_sent: true, is_finished: false}).length
		}));
		setTimeout(function() {
			_.each(self.attr.challenges.where({user_id: self.current_user.get('id'), is_sent: true, is_finished: false}), function(c) {
				self.renderChallenge(c);
			});
			_.each(self.attr.challenges.where({challenger_id: self.current_user.get('id'), is_sent: true, is_finished: false}), function(c) {
				self.renderChallenged(c);
			});
		}, 0);
		return this;
	},
	
	renderChallenge: function(challenge) {
		var view = new QuizPop.Views.ChallengesShow({
			attr: this.attr,
			challenge: challenge,
			is_user_challenger: false
		});
		this.subviews.push(view);
		$('#available_challenges').append(view.render().el);
	},
	
	renderChallenged: function(challenge) {
		var view = new QuizPop.Views.ChallengesShow({
			attr: this.attr,
			challenge: challenge,
			is_user_challenger: true
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
