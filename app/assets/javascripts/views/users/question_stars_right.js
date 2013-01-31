QuizPop.Views.UsersQuestionStarsRight = Backbone.View.extend({
	
	template: JST['users/question_stars_right'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.issue = options.issue;
		this.user = options.user;
		if (this.issue) {
			this.tasks = this.attr.tasks.where({user_id: this.user.get('id'), issue_id: this.issue.get('id')});
		} else {
			this.tasks = this.attr.tasks.where({user_id: this.user.get('id')});
		}
		
		this.attr.tasks.on('add', this.increaseSmallStar, this);
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template({
			
		}));
		setTimeout(function() {
			$(self.el).find(".right-question").knob();
			self.renderBigStars();
		}, 0);
		return this;
	},
	
	getScoreFromTasks: function() {
		var score = 0;
		
		_.each(this.tasks, function(t) {
			score = score + t.get('score');
		});

		return score;
	},
	
	renderBigStars: function() {
		var score = this.getScoreFromTasks(),
			big_stars = parseInt(score / 100),
			remainder = score % 100;
	
		if (big_stars >= 5) {
			big_stars = 5;
			$(this.el).find('.right-question').parent().parent().parent().addClass('hide');
		}
		if (big_stars === 0) {
			this.fillSmallStar(remainder);
		} else {
			this.fillSmallStar(remainder);
			for (i = 0; i < big_stars; i++) {
				$(this.el).find('#static_stars').append(JST['users/question_star_right']);
			}
		}
	},
	
	fillSmallStar: function(num) {
		$(this.el).find('.right-question').val(num).trigger('change');
	},
	
	increaseSmallStar: function(model) {
		var score = model.get('score'),
			value = parseInt($('.right-question').val()),
			self = this,
			inter;
		
		if (this.user && model.get('user_id') === this.user.get('id')) {
			inter = setInterval(function() {
				if (value > 100 || score < 0) {
					clearInterval(inter);
					self.createNewBigStar(score);
				}
				$(this.el).find('.right-question').val(value).trigger('change');
				value = value + 1;
				score = score - 1;
			}, 50);
		}
	},
	
	createNewBigStar: function(num) {
		var inter,
			value = 0;
			
		if ($(this.el).find('#static_stars').children().length > 4) {
			$(this.el).find('.right-question').parent().parent().parent().addClass('hide');
		} else {
			$(this.el).find('#static_stars').append(JST['users/question_star_right']);
			
			inter = setInterval(function() {
				if (num < 0) {
					clearInterval(inter);
				}
				$(this.el).find('.right-question').val(value).trigger('change');
				value = value + 1;
				num = num - 1;
			}, 50);
		}
	}
});