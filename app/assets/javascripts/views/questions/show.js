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
		
		this.setSliderEqVals();
	},
	
	render: function() {
		$(this.el).html(this.template({
			question: this.question,
			values: this.values
		}));
		return this;
	},
	
	setSliderEqVals: function() {
		this.draggable = false;
		this.slider_disabled = false;
		this.exponential = this.question.get('is_exponential');
		this.values = {
			max: this.question.get('max'),
			min: this.question.get('min'),
			length: 200, //length of slider bar
			width: 20 //width of slider button
		};
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
	
	moveSlider: function(event, expo) {
		var slider_pos
		if (expo) {
			if (this.values.min === 0) {
				slider_pos = Math.pow(Math.pow(this.values.max, (1 / 3)), (3 * ((event.pageX - (0.5 * this.values.width)) / this.values.length)));
				if (this.checkSliderRange(slider_pos)) {
					this.adjustSliderPosition(event);
					this.setInput(slider_pos);
				}
			} else {
				slider_pos = this.values.min * Math.pow(Math.pow((this.values.max / this.values.min), (1 / 3)), (3 * ((event.pageX - (0.5 * this.values.width)) / this.values.length)));
				if (this.checkSliderRange(slider_pos)) {
					this.adjustSliderPosition(event);
					this.setInput(slider_pos);
				}
			}
		} else {
			slider_pos = ((event.pageX - (0.5 * this.values.width)) * ((this.values.max - this.values.min) / this.values.length)) + this.values.min;
			if (this.checkSliderRange(slider_pos)) {
				this.adjustSliderPosition(event);
				this.setInput(slider_pos);
			}
		}
	},
	
	checkSliderRange: function(slider_pos) {
		if (slider_pos <= this.values.max && slider_pos >= this.values.min) {
			return true;
		} else {
			return false;
		}
	},
	
	adjustSliderPosition: function(event) {
		$('#block').css('left', (event.pageX - this.values.width) + 'px')
	},
	
	setInput: function(slider_pos) {
		$('#number').val(Math.round(slider_pos));
	},
	
	unbindMouseMove: function(event) {
		$(document).off('mousemove');
	},
	
	bindMouseMove: function() {
	var self = this;
		$(document).on('mousemove', function(event) {
			self.moveSlider(event, this.exponential);
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
				var input = parseInt($('#number').val());
				if (!isNaN(input) && self.checkSliderRange(input)) {
					self.setSliderFromInput(input, self.exponential);
				}
			});
		}
	},
	
	setSliderFromInput: function(input, expo) {
		var slider_pos;
		if (expo) {
			if (this.values.min === 0) {
				slider_pos = ((Math.log(input) * this.values.length) / (Math.log(Math.pow(this.values.max, (1 / 3))) * 3)) - (0.5 * this.values.width);
			} else {
				slider_pos = ((Math.log((input / this.values.min)) * this.values.length) / (Math.log(Math.pow((this.values.max / this.values.min), (1 / 3))) * 3)) - (0.5 * this.values.width);
			}
		} else {
			slider_pos = (input / ((this.values.max - this.values.min) / this.values.length)) - (0.5 * this.values.width);
		}
		$('#block').css('left', Math.round(slider_pos));
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
