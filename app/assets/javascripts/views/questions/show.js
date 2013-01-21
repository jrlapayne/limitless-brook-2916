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
			max: this.addCommas(this.question.get('max')),
			min: this.addCommas(this.question.get('min'))
		}));
		return this;
	},
	
	setSliderEqVals: function() {
		this.draggable = false;
		this.slider_disabled = false;
		this.exponential = this.question.get('is_exponential');
		this.decimal = this.question.get('is_decimal');
		this.correct = this.question.get('correct');
		this.slider_pos = 0;
		this.values = {
			max: this.question.get('max'),
			min: this.question.get('min'),
			length: 350, //length of slider bar
			width: 25 //width of slider button
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
		var answer, score;
		if (!isNaN(this.removeCommas($('#number').val())) || this.removeCommas($('#number').val()) < this.values.min) {
			score = this.getScoreFromInput(this.removeCommas($('#number').val()));
			answer = this.removeCommas($('#number').val());
		} else {
			score = this.getScoreFromPosition();
			answer = this.getAnswerFromPosition(parseInt($('#block').css('left').split('px')[0]), this.exponential);
		}
		this.attr.tasks.create({
			challenge_id: this.challenge.get('id'),
			user_id: this.current_user.get('id'),
			issue_id: this.question.get('issue_id'),
			question_id: this.question.get('id'),
			answer: answer,
			score: score
		});
		this.setChallengeScore(score);
	},
	
	setChallengeScore: function(score) {
		if (this.current_user.get('id') === this.challenge.get('challenger_id')) {
			this.challenge.set({
				challenger_score: this.challenge.get('challenger_score') + score
			});
		} else {
			this.challenge.set({
				user_score: this.challenge.get('user_score') + score
			});
		}
		this.challenge.save();
	},
	
	getScoreFromInput: function(answer) {
		var score = 100 * ((this.getInputPosition(answer, this.exponential) - this.getInputPosition(this.question.get('correct'), this.exponential)) / this.values.length);
		return Math.round(Math.abs(score));
	},
	
	getScoreFromPosition: function() {
		return Math.round(Math.abs(100 * ((parseInt($('#block').css('left').split('px')[0]) - parseInt($('#correct').css('left').split('px')[0])) / this.values.length)));
	},
	
	getAnswerFromPosition: function(slider_pos, expo) {
		var answer
		if (expo) {
			if (this.values.min === 0) {
				answer = Math.pow(Math.pow(this.values.max, (1 / 3)), (3 * ((slider_pos + (0.5 * this.values.width)) / this.values.length)));
			} else {
				answer = this.values.min * Math.pow(Math.pow((this.values.max / this.values.min), (1 / 3)), (3 * ((slider_pos + (0.5 * this.values.width)) / this.values.length)));
			}
		} else {
			answer = ((slider_pos + (0.5 * this.values.width)) * ((this.values.max - this.values.min) / this.values.length)) + this.values.min;
		}
		return answer;
	},
	
	moveSlider: function(event, expo) {
		var slider_pos = this.getDraggedPosition(event, expo);
		if (this.checkSliderRange(slider_pos)) {
			this.adjustSliderPosition(event);
			this.setInput(slider_pos);
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
		$('#number').val(this.roundIntOrDecimal(slider_pos));
	},
	
	unbindMouseMove: function(event) {
		$(document).off('mousemove');
	},
	
	bindMouseMove: function() {
	var self = this;
		$(document).on('mousemove', function(event) {
			self.moveSlider(event, self.exponential);
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
		var input;
		if (!this.slider_disabled) {
			$(document).on('keyup', function(e) {
				if (self.decimal) {
					input = parseFloat($('#number').val());
					if (!isNaN(input) && self.checkSliderRange(input)) {
						self.setSliderFromInput(input, self.exponential);
					}
				} else {
					if (parseInt(self.removeCommas($('#number').val())) > 999) {
						$('#number').val(self.addCommas(self.removeCommas($('#number').val())));
					} else {
						if (!isNaN(parseInt(self.removeCommas($('#number').val())))) {
							$('#number').val(self.removeCommas($('#number').val()));
						}
					}
					input = self.removeCommas($('#number').val());
					if (!isNaN(input) && self.checkSliderRange(input)) {
						self.setSliderFromInput(input, self.exponential);
					}
				}
			});
		}
	},
	
	getDraggedPosition: function(event, expo) {
		var slider_pos
		if (expo) {
			if (this.values.min === 0) {
				slider_pos = Math.pow(Math.pow(this.values.max, (1 / 3)), (3 * ((event.pageX - (0.5 * this.values.width)) / this.values.length)));
			} else {
				slider_pos = this.values.min * Math.pow(Math.pow((this.values.max / this.values.min), (1 / 3)), (3 * ((event.pageX - (0.5 * this.values.width)) / this.values.length)));
			}
		} else {
			slider_pos = ((event.pageX - (0.5 * this.values.width)) * ((this.values.max - this.values.min) / this.values.length)) + this.values.min;
		}
		return slider_pos;
	},
	
	getInputPosition: function(input, expo) {
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
		return slider_pos;
	},
	
	setSliderFromInput: function(input, expo) {
		$('#block').css('left', Math.round(this.getInputPosition(input, expo)));
	},
	
	unbindKeyPress: function() {
		$(document).off('keyup');
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
		$('#correct').css('left', Math.round(this.getInputPosition(this.question.get('correct'), this.exponential)));
	},
	
	roundIntOrDecimal: function(val) {
		if (this.decimal) {
			if (((this.correct % 1) * 10) % 1 === 0) {
				return Math.floor(val * 10) / 10;
			} else {
				return Math.floor(val * 100) / 100;
			}
			return 
		} else {
			return this.addCommas(Math.round(val));
		}
	},
	
	addCommas: function(val){
		while (/(\d+)(\d{3})/.test(val.toString())){
			val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
		}
		return val;
	},
	
	removeCommas: function(val) {
		return parseInt(val.replace(/\,/g,''));
	}
});
