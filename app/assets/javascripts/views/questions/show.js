QuizPop.Views.QuestionsShow = Backbone.View.extend({
	
	template: JST['questions/show'],
	
	events: {
		'submit #answer' : 'submitAnswer',
		'mousedown #block' : 'mouseDown',
		'mouseup' : 'mouseUp',
		'focus #number' : 'bindKeyPress',
		'blur #number' : 'unbindKeyPress',
		'click #slider' : 'moveSliderOnClick'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.challenge = options.challenge;
		this.question = options.question;
		this.current_user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		this.draggable = false;
		this.slider_disabled = false;
		var max = this.question.get('max');
		var min = this.question.get('min');
		this.values = {
			max: max,
			min: min,
			range: max- min,
			mid: (max - min) / 2,
			step: (max - min) / 200,
			offset: 10, //half the width of the slider box or circle
			coef: Math.pow(100, 0.01) //2nd argument is 1 / (1/2 length of slider in px)
		};
	},
	
	render: function() {
		$(this.el).html(this.template({
			question: this.question,
			values: this.values
		}));
		return this;
	},
	
	submitAnswer: function(event) {
		event.preventDefault();
		this.sliderdisabled = true;
		var self = this;
		var question_ids = this.challenge.get('question_ids').split('/');
		var next_question = null;
		
		this.createTask();
		this.revealCorrectAnswer();
		switch(question_ids.indexOf(String(this.question.get('id')))) {
			case 0:
				next_question = this.attr.questions.where({id: parseInt(question_ids[1])})[0];
				break;
			case 1:
				next_question = this.attr.questions.where({id: parseInt(question_ids[2])})[0];
				break;
			case 2:
				next_question = null;
				break;
		};
		setTimeout(function() {
			if (next_question) {
				Backbone.history.navigate('challenge' + self.challenge.get('id') + '/question' + next_question.get('id'), true);
			} else {
				Backbone.history.navigate('challenge' + self.challenge.get('id'), true);
			}
		}, 5000);
	},
	
	createTask: function() {
		this.attr.tasks.create({
			challenge_id: this.challenge.get('id'),
			user_id: this.current_user.get('id'),
			issue_id: this.question.get('issue_id'),
			question_id: this.question.get('id'),
			answer: parseInt($('#number').val()),
			score: this.getScore(parseInt($('#number').val()))
		});
	},
	
	getScore: function(answer) {
		if (this.question.get('is_exponential')) {
			if (this.values.min !== 0) {
				return Math.round(((Math.log(answer / this.values.min) / Math.log(this.values.coef)) - this.values.offset) / 2);
			} else {
				return Math.round(((Math.log(answer) / Math.log(this.values.coef)) - this.values.offset) / 2);
			}
		} else {
			return Math.round(((answer / this.values.step) - this.values.offset) / 2);
		}
	},
	
	dragBlock: function(event) {
		var loc = ((event.pageX - this.values.offset) * this.values.step) + this.values.min;
		if (loc <= this.values.max && loc >= this.values.min) {
			$('#block').css('left', event.pageX - (this.values.offset * 2) + 'px');
			this.displayX(event, loc);
		}
	},
	
	dragBlockExp: function(event) {
		var loc;
		if (this.values.min !== 0) {
			loc = this.values.min * Math.pow(this.values.coef, (event.pageX - this.values.offset));
		} else {
			loc = Math.pow(this.values.coef, (event.pageX - this.values.offset));
		}
		if (loc <= this.values.max && loc >= this.values.min) {
			$('#block').css('left', event.pageX - (this.values.offset * 2) + 'px');
			this.displayXExp(event, loc);
		}
	},
	
	displayX: function(event, loc) {
		$('#number').val(Math.round(loc));
	},
	
	displayXExp: function(event, loc) {
		$('#number').val(Math.round(loc));
	},
	
	unbindMouseMove: function(event) {
		$(document).off('mousemove');
	},
	
	bindMouseMove: function() {
	var self = this;
		$(document).on('mousemove', function(e) {
			if (self.question.get('is_exponential')) {
				self.dragBlockExp(e);
			} else {
				self.dragBlock(e);
			}
		}); 
	},
	
	mouseDown: function() {
		if (!this.slider_disabled) {
			if (!this.draggable) {
				this.draggable = true;
				$('#block').removeClass('off');
				$('#block').addClass('on');
				this.bindMouseMove();
			}
		}
	},
	
	mouseUp: function() {
		if (this.draggable) {
			this.draggable = false;
			$('#block').removeClass('on');
			$('#block').addClass('off');
			this.unbindMouseMove();
		}
	},
	
	bindKeyPress: function() {
		var self = this;
		if (!this.slider_disabled) {
			$(document).on('keyup', function(e) {
				var loc = parseInt($('#number').val());
				if (!isNaN(loc) && (loc <= self.values.max && loc >= self.values.min)) {
					if (self.question.get('is_exponential')) {
						self.setSliderPositionExp(loc);
					} else {
						self.setSliderPosition(loc);
					}
				}
			});
		}
	},
	
	unbindKeyPress: function() {
		$(document).off('keyup');
	},
	
	setSliderPosition: function(loc) {
		$('#block').css('left', (loc / this.values.step) - this.values.offset + 'px');
	},
	
	setSliderPositionExp: function(loc) {
		if (this.values.min !== 0) {
			$('#block').css('left', Math.round(Math.log(loc / this.values.min) / Math.log(this.values.coef)) - this.values.offset);
		} else {
			$('#block').css('left', Math.round(Math.log(loc) / Math.log(this.values.coef)) - this.values.offset);
		}
	},
	
	moveSliderOnClick: function(event) {
		var loc;
		if (!this.slider_disabled) {
			if (!this.draggable) {
				if (this.question.get('is_exponential')) {
					if (this.values.min !== 0) {
						loc = this.values.min * Math.pow(this.values.coef, (event.pageX - this.values.offset));
					} else {
						loc = Math.pow(this.values.coef, (event.pageX - this.values.offset));
					}
					if (loc <= this.values.max && loc >= this.values.min) {
						$('#block').css('left', event.pageX - (this.values.offset * 2) + 'px');
						this.displayXExp(event, loc);
					}
				} else {
					loc = ((event.pageX - this.values.offset) * this.values.step) + this.values.min;
					$('#block').css('left', event.pageX - (this.values.offset * 2) + 'px');
					this.displayX(event, loc);
				}
			}
		}
	},
	
	revealCorrectAnswer: function() {
		$('#correct').removeClass('hide');
		var correct = this.question.get('correct');
		if (this.question.get('is_exponential')) {
			if (this.values.min !== 0) {
				$('#correct').css('left', Math.round(Math.log(correct / this.values.min) / Math.log(this.values.coef)) - this.values.offset);
			} else {
				$('#correct').css('left', Math.round(Math.log(correct) / Math.log(this.values.coef)) - this.values.offset);
			}
		} else {
			$('#correct').css('left', (correct / this.values.step) - this.values.offset + 'px');
		}
	}
});
