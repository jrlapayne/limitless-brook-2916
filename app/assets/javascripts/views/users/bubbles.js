QuizPop.Views.UsersBubbles = Backbone.View.extend({
	
	template: JST['users/bubbles'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.user = options.user;
		this.tasks = this.attr.tasks.where({user_id: this.user.get('id')});
				
		this.attr.tasks.on('add', this.increaseSmallStar, this);
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template({
			
		}));
		setTimeout(function() {
			$(self.el).find(".global-dial").knob();
			$(self.el).find('.global-dial').removeClass('hide');
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
			big_stars = parseInt(score / 1000),
			remainder = score % 1000;
	
		if (big_stars >= 5) {
			big_stars = 5;
			$(this.el).find('#static_stars').css('margin', '0 0 0 0');
			$(this.el).find('.global-dial').parent().parent().parent().addClass('hide');
		}
		if (big_stars === 0) {
			this.fillSmallStar(Math.round(remainder / 10));
		} else {
			this.fillSmallStar(Math.round(remainder / 10));
			for (i = 0; i < big_stars; i++) {
				$(this.el).find('#static_stars').append(JST['users/global_star']);
			}
		}
	},
	
	fillSmallStar: function(num) {
		$(this.el).find('.global-dial').val(num).trigger('change');
	},
	
	increaseSmallStar: function(model) {
		var score = Math.round(model.get('score') / 10),
			value = parseInt($(this.el).find('.global-dial').val()),
			self = this,
			inter;
		
		if (this.user && model.get('user_id') === this.user.get('id')) {
			inter = setInterval(function() {
				if (score <= 0) {
					clearInterval(inter);
				}
				if (value >= 100) {
					clearInterval(inter);
					self.createNewBigStar(score);
				}
				$(self.el).find('.global-dial').val(value).trigger('change');
				value = value + 1;
				score = score - 1;
			}, 50);
		}
	},
	
	createNewBigStar: function(num) {
		var inter,
			value = 0,
			self = this;
			
		if ($(this.el).find('#static_stars').children().length > 4) {
			$(this.el).find('#static_stars').css('margin', '0 0 0 0');
			$(this.el).find('.global-dial').parent().parent().parent().addClass('hide');
		} else {
			$(this.el).find('#static_stars').append(JST['users/global_star']);
			
			inter = setInterval(function() {
				if (num < 0) {
					clearInterval(inter);
				}
				$(self.el).find('.global-dial').val(value).trigger('change');
				value = value + 1;
				num = num - 1;
			}, 50);
		}
	}
});