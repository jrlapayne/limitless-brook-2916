QuizPop.Views.SlidersShow = Backbone.View.extend({
	
	template: JST['sliders/show'],
	
	events: {
		'submit #slider_form' : 'submitAnswer',
		
		//slider mouse events
		'mousedown #block' : 'mouseDown',
		'mouseup' : 'mouseUp',
		'click #slider' : 'moveSliderOnClick',
		
		//slider touch events
		'touchstart #slider' : 'moveSliderOnTouch',
		'touchstart #block' : 'touchDown',
		'touchend' : 'touchUp',
		
		//slider input field events
		'focus #number' : 'bindKeyPress',
		'blur #number' : 'unbindKeyPress'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.challenge = options.challenge;
		this.question = options.question;
		this.slider = this.attr.sliders.where({question_id: this.question.get('id')})[0];
		this.user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		
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
			current_user: this.user,
			slider: this.slider
		}));
		
		setTimeout(function() {
			self.setSliderEqVals();
		}, 0);
		return this;
	},
	
	formatNumbersForDisplay: function() {
		var nums;
		if (this.slider.get('correct') % 1 !== 0 || this.slider.get('min') % 1 !== 0) {
			nums = {
				max: this.addUnits(String(this.slider.get('max'))),
				min: this.addUnits(String(this.slider.get('min'))),
				correct: this.addUnits(String(this.slider.get('correct'))) 
			};
		} else {
			nums = {
				max: this.addUnits(addCommas(this.slider.get('max'))),
				min: this.addUnits(addCommas(this.slider.get('min'))),
				correct: this.addUnits(addCommas(this.slider.get('correct')))
			};
		}
		return nums;
	},
	
	setSliderEqVals: function() {
		var exponent = null;
		
		if (this.slider.get('is_exponential')) {
			exponent = 3;
		}
		
		if (this.user.get('id') === this.challenge.get('challenger_id')) {
			this.challenger_task = null;
		} else {
			this.challenger_task = this.attr.tasks.where({user_id: this.challenge.get('challenger_id'), challenge_id: this.challenge.get('id'), question_id: this.question.get('id')})[0];
		}
		
		this.draggable = false;
		this.decimal = (this.slider.get('correct') % 1 !== 0 || this.slider.get('min') % 1 !== 0);	
		defaults = {
			min: this.slider.get('min'),
			max: this.slider.get('max'),
			correct: this.slider.get('correct'),
			exponent: exponent,
			slider_element: $('#block'),
			input_element: $('#number'),
			correct_element: $('#correct'),
			fill_element: $('#half_slider'),
			bar_width: parseInt($('#slider').css('width')),
			slider_width: 30,
			left_margin: parseInt($('.slider_container').css('margin-left')) + parseInt($('body').css('padding-left')) + parseInt($('body').css('margin-left'))
		};
		
		setDefaults(defaults);
		defaultSliderPosition();
	},
	
	setChallengeScore: function(score) {
		if (this.user.get('id') === this.challenge.get('challenger_id')) {
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
	
	mouseDown: function(event) {
		if (!window.slider_defaults.disabled) {
			if (!this.draggable) {
				event.preventDefault();
				this.draggable = true;
				bindSliderEvent('mousemove', $('#block'));
			}
		}
	},
	
	mouseUp: function() {
		if (this.draggable) {
			this.draggable = false;
			unbindEvent('mousemove');
		}
	},
	
	bindKeyPress: function() {
		var self = this;
		var input;
		if (!this.slider_disabled) {
			bindInputEvent('keyup');
		}
	},
	
	unbindKeyPress: function() {
		unbindEvent('keyup');
	},
	
	moveSliderOnClick: function(event) {
		if (!window.slider_defaults.disabled) {
			if (!this.draggable) {
				moveSlider(event.pageX, $('#block'));
			}
		}
	},
	
	revealCorrectAnswer: function() {
		$('#correct').removeClass('hide');
		moveSliderFromInput(this.slider.get('correct'), $('#correct'));
	},
	
	showChallengerAnswer: function() {
		$('#challenger_answer').removeClass('hide');
		moveSliderFromInput(this.challenger_task.get('answer'), $('#challenger_answer'));
	},
	
	addUnits: function(val) {
		var units = this.slider.get('units');
		var index = units.indexOf('/');
		if (index === 0) {
			return val.toString() + units.substring(index + 1);
		} else {
			return units.substring(0, index) + val.toString();
		}
	},
	
	touchDown: function(event) {
		if (!window.slider_defaults.disabled) {
			if (!this.draggable) {
				event.preventDefault();
				this.draggable = true;
				bindSliderEvent('touchmove');
			}
		}
	},
	
	touchUp: function() {
		if (this.draggable) {
			this.draggable = false;
			unbindEvent('touchmove');
		}
	},
	
	moveSliderOnTouch: function(event) {
		if (!window.slider_defaults.disabled) {
			if (!this.draggable) {
				moveSlider(event.originalEvent.touches[0].pageX, $('#block'));
			}
		}
	},
	
	
	showRageComic: function(user_answer) {
		var is_win;

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
	
	submitAnswer: function(event) {
		var answer,
			score,
			input;
		
		if (!window.slider_defaults.disabled) {	
			event.preventDefault();
			window.slider_defaults.disabled = true;
			input = $('#number').val();
			this.revealCorrectAnswer();
		
			if (window.slider_defaults.min % 1 !== 0 || window.slider_defaults.correct % 1 !== 0) {
				input = parseFloat(input);
			} else {
				input = removeCommas(input);
			}
		
			if (!isNaN(input) && !outOfBounds(input)) {
				answer = input;
			} else {
				answer = getSliderPosition(parseInt($('#block').css('left')) + window.slider_defaults.left_margin + (0.5 * window.slider_defaults.slider_width));
			}
		
			if (input === this.correct) {
				score = 0;
			} else {
				score = getScore($('#block'));
			}
			$('#url').removeClass('hide');
			
			this.attr.tasks.create({
				challenge_id: this.challenge.get('id'),
				user_id: this.user.get('id'),
				issue_id: this.question.get('issue_id'),
				question_id: this.question.get('id'),
				answer: answer,
				score: score
			});

			if (this.challenge.get('challenger_id') === this.user.get('id')) {
				this.challenge.set({
					challenger_score: this.challenge.get('challenger_score') + score
				});
			} else {
				this.showChallengerAnswer();
				this.showRageComic();
				this.challenge.set({
					user_score: this.challenge.get('user_score') + score
				});
			}
			this.challenge.save();
			this.setNextQuestion();
		}
	},
	
	setNextQuestion: function() {
		var question_ids = this.challenge.get('question_ids'); 
		
		switch(question_ids.split('/').indexOf(String(this.question.get('id')))) {
			case 0:
				window.next_question = this.attr.questions.where({id: parseInt(question_ids.split('/')[1])})[0];
				break;
			case 1:
				window.next_question = this.attr.questions.where({id: parseInt(question_ids.split('/')[2])})[0];
				break;
			case 2:
				if (this.user.get('id') === this.challenge.get('challenger_id')) {
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
				window.next_question = null;
				break;
		};
	}
});