QuizPop.Views.IssuesIndex = Backbone.View.extend({
	
	template: JST['issues/index'],
	id: 'issues',
	
	events: {
		'click .issue' : 'startChallenge'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.challenge = options.challenge;
		this.current_user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		this.subviews = [];
	},
	
	render: function() {
		var self = this;
		$(this.el).addClass('main-issues-index-container');
		$(this.el).html(this.template({
			
		}));
		setTimeout(function() {
			self.attr.issues.each(function(i) {
				if (self.attr.questions.where({issue_id: i.get('id')}).length > 2) {
					self.renderIssue(i);
				}
			});
		}, 0);
		setTimeout(function() {
			window.scrollTo(0, 1);
		}, 1000);
		return this;
	},
	
	renderIssue: function(issue) {
		var view = new QuizPop.Views.IssuesShow({
			attr: this.attr,
			issue: issue
		});
		this.subviews.push(view);
		$('#issues').append(view.render().el);
	},
	
	startChallenge: function(event) {
		var issue = this.attr.issues.where({id: parseInt($(event.target).closest('.issue').attr('id'))})[0];
		var question_ids = this.getQuizQuestions(issue);
		this.challenge.set({
			issue_id: issue.get('id'),
			question_ids: question_ids
		});
		this.challenge.save();
		
		Backbone.history.navigate('challenge' + this.challenge.get('id') + '/question' + question_ids.split('/')[0], true);
	},
	
	getQuizQuestions: function(issue) {
		var questions = this.attr.questions.where({issue_id: issue.get('id')});
		questions = _.shuffle(questions);
		return questions[0].get('id') + '/' + questions[1].get('id') + '/' + questions[2].get('id');
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
