QuizPop.Views.QuestionsShow = Backbone.View.extend({
	
	template: JST['questions/show'],
	
	events: {
		'submit #answer' : 'submitAnswer',
		'mousedown #block' : 'mouseDown',
		'mouseup' : 'mouseUp',
		'focus #number' : 'bindKeyPress',
		'blur #number' : 'unbindKeyPress',
		'click #slider' : 'moveSliderOnClick',
		'touchstart' : 'touchEventHandler',
		'touchend' : 'touchEventHandler',
		'touchmove' : 'touchEventHandler'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.challenge = options.challenge;
		this.question = options.question;
		this.current_user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		
		this.displayNums = this.formatNumbersForDisplay();
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template({
			question: this.question,
			max: this.displayNums.max,
			min: this.displayNums.min,
			correct: this.displayNums.correct,
			challenger: this.attr.users.where({id: this.challenge.get('challenger_id')})[0],
			user: this.attr.users.where({id: this.challenge.get('user_id')})[0],
			current_user: this.current_user
		}));
		setTimeout(function() {
			self.setSliderEqVals();
			self.setDefaultSlider();
		}, 0);
		return this;
	},
	
	formatNumbersForDisplay: function() {
		var nums;
		if (this.question.get('is_decimal')) {
			nums = {
				max: this.addUnits(String(this.question.get('max'))),
				min: this.addUnits(String(this.question.get('min'))),
				correct: this.addUnits(String(this.question.get('correct'))) 
			};
		} else {
			nums = {
				max: this.addUnits(this.addCommas(this.question.get('max'))),
				min: this.addUnits(this.addCommas(this.question.get('min'))),
				correct: this.addUnits(this.addCommas(this.question.get('correct')))
			};
		}
		return nums;
	},
	
	setSliderEqVals: function() {
		if (this.current_user.get('id') === this.challenge.get('challenger_id')) {
			this.challenger_task = null;
		} else {
			this.challenger_task = this.attr.tasks.where({user_id: this.challenge.get('challenger_id'), challenge_id: this.challenge.get('id'), question_id: this.question.get('id')})[0];
		}
		this.draggable = false;
		this.slider_disabled = false;
		this.exponential = this.question.get('is_exponential');
		this.decimal = this.question.get('is_decimal');
		this.correct = this.question.get('correct');
		this.slider_pos = 0;
		this.values = {
			max: this.question.get('max'),
			min: this.question.get('min'),
			length: parseInt($('#slider').css('width')), //length of slider bar
			width: 25 //width of slider button
		};
	},
	
	setDefaultSlider: function() {
		$('#block').css('left', Math.round((this.values.length / 2) - (this.values.width * 0.5)) + 'px');
		
		var slider_pos;
		if (this.exponential) {
			if (this.values.min === 0) {
				slider_pos = Math.pow(Math.pow(this.values.max, (1 / 3)), (3 * ((this.values.length / 2) / this.values.length)));
			} else {
				slider_pos = this.values.min * Math.pow(Math.pow((this.values.max / this.values.min), (1 / 3)), (3 * ((this.values.length / 2) / this.values.length)));
			}
		} else {
			slider_pos = ((this.values.length / 2) * ((this.values.max - this.values.min) / this.values.length)) + this.values.min;
		}
		$('#number').val(this.roundIntOrDecimal(slider_pos));
	},
	
	submitAnswer: function(event) {
		event.preventDefault();
		this.slider_disabled = true;
		var self = this;
		var question_ids = this.challenge.get('question_ids').split('/');
		var next_question = null;
		
		$('#number').attr('disabled', 'true');
		$('#url').removeClass('hide');
		$('#user_pic').removeClass('hide');
		this.revealCorrectAnswer();
		this.createTask();
		
		if (this.challenger_task) {
			this.showChallengerAnswer();
			this.showRageComic(this.answer);
		}
	
		switch(question_ids.indexOf(String(this.question.get('id')))) {
			case 0:
				next_question = this.attr.questions.where({id: parseInt(question_ids[1])})[0];
				break;
			case 1:
				next_question = this.attr.questions.where({id: parseInt(question_ids[2])})[0];
				break;
			case 2:
				if (this.current_user.get('id') === this.challenge.get('challenger_id')) {
					this.challenge.set({is_sent: true});
				} else {
					var winner_id;
					if  (this.challenge.get('challenger_score') < this.challenge.get('user_score')) {
						winner_id = this.challenge.get('challenger_id');
					} else {
						winner_id = this.challenge.get('user_id');
					}
					this.challenge.set({
						is_finished: true,
						winner_id: winner_id
					});
				}
				this.challenge.save();
				next_question = null;
				break;
		};
		
		setTimeout(function() {
			if (next_question) {
				Backbone.history.navigate('challenge' + self.challenge.get('id') + '/question' + next_question.get('id'), true);
			} else {
				Backbone.history.navigate('challenge' + self.challenge.get('id'), true);
			}
		}, 2667);
	},
	
	createTask: function() {
		var score;
		if (!isNaN(this.removeCommas($('#number').val())) && this.removeCommas($('#number').val()) < this.values.min) {
			score = this.getScoreFromInput(this.removeCommas($('#number').val()));
			this.answer = this.removeCommas($('#number').val());
		} else {
			score = this.getScoreFromPosition();
			this.answer = this.getAnswerFromPosition(parseInt($('#block').css('left').split('px')[0]), this.exponential);
		}
		this.attr.tasks.create({
			challenge_id: this.challenge.get('id'),
			user_id: this.current_user.get('id'),
			issue_id: this.question.get('issue_id'),
			question_id: this.question.get('id'),
			answer: this.answer,
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
		$('#block').css('left', (event.pageX - this.values.width) + 'px');
	},
	
	setInput: function(slider_pos) {
		$('#number').val(this.roundIntOrDecimal(slider_pos));
	},
	
	unbindMouseMove: function(event) {
		$(document).off('mousemove');
		//$(document).off('touchmove');
	},
	
	bindMouseMove: function() {
	var self = this;
		$(document).on('mousemove', function(event) {
			self.moveSlider(event, self.exponential);
		});
		//$(document).on('touchmove', function(event) {
			//self.moveSlider(event, self.exponential);
		//});
		//(typeof Touch == "object");
	},
	
	mouseDown: function(event) {
		alert('you clicked');
		if (!this.slider_disabled) {
			if (!this.draggable) {
				event.preventDefault();
				this.draggable = true;
				$('#block').removeClass('off');
				$('#block').addClass('on');
				this.bindMouseMove();
			}
		}
	},
	
	mouseUp: function() {
		alert('you unclicked');
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
		var slider_pos;
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
				var slider_pos = this.getDraggedPosition(event, this.exponential);
				if (this.checkSliderRange(slider_pos)) {
					this.adjustSliderPosition(event);
					this.setInput(slider_pos);
				}
			}
		}
	},
	
	revealCorrectAnswer: function() {
		$('#correct').removeClass('hide');
		$('#correct').css('left', Math.round(this.getInputPosition(this.question.get('correct'), this.exponential)));
	},
	
	showChallengerAnswer: function() {
		$('#challenger_answer').removeClass('hide');
		$('#challenger_answer').css('left', Math.round(this.getInputPosition(this.challenger_task.get('answer'), this.exponential)));
	},
	
	showRageComic: function(user_answer) {
		var rage_int, is_win;

		if (Math.abs(user_answer - this.correct) < Math.abs(this.challenger_task.get('answer') - this.correct)) {
			is_win = true;
		} else {
			is_win = false;
		}
		var view = new QuizPop.Views.QuestionsRage({
			is_win: is_win
		});
		$('#rage_comic').html(view.render().el);
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
	},
	
	addUnits: function(val) {
		var units = this.question.get('units');
		var index = units.indexOf('/');
		if (index === 0) {
			return val.toString() + units.substring(index + 1);
		} else {
			return units.substring(0, index) + val.toString();
		}
	},
	
	touchEventHandler: function(event) {
		var touches = event.touches,
	        first = touches[0],
	        type = "";
		$('#number').val(event.type);
		switch(event.type) {
	        case "touchstart": type = "mousedown"; break;
	        case "touchmove":  type = "mousemove"; break;        
	        case "touchend":   type = "mouseup"; break;
	        default: return;
	    }

	             //initMouseEvent(type, canBubble, cancelable, view, clickCount, 
	    //           screenX, screenY, clientX, clientY, ctrlKey, 
	    //           altKey, shiftKey, metaKey, button, relatedTarget);

	    var simulatedEvent = document.createEvent("MouseEvent");
	    simulatedEvent.initMouseEvent(type, true, true, window, 1, 
	                              first.screenX, first.screenY, 
	                              first.clientX, first.clientY, false, 
	                              false, false, false, 0/*left*/, event.target);

		first.target.dispatchEvent(simulatedEvent);
		event.preventDefault();
	}
});
