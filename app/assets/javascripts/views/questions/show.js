QuizPop.Views.QuestionsShow = Backbone.View.extend({
	
	template: JST['questions/show'],
	
	events: {
		'submit #answer' : 'submitAnswer',
		'mousedown #block' : 'mouseDown',
		'mouseup' : 'mouseUp',
		'focus #number' : 'bindKeyPress',
		'blur #number' : 'unbindKeyPress'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.challenge = options.challenge;
		this.question = options.question;
		this.current_user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		this.draggable = false;
		var max = this.question.get('max');
		var min = this.question.get('min');
		this.values = {
			max: max,
			min: min,
			range: max- min,
			mid: (max - min) / 2,
			step: (max - min) / 200,
			offset: 10
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
		var question_ids = this.challenge.get('question_ids').split('/');
		var next_question = null;
		
		//check score and set task
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
		}
		
		if (next_question) {
			Backbone.history.navigate('challenge' + this.challenge.get('id') + '/question' + next_question.get('id'), true);
		} else {
			Backbone.history.navigate('challenge' + this.challenge.get('id'), true);
		}
	},
	
	dragBlock: function(event) {
		//var loc = (event.pageX * this.values.step) + this.values.min;
		//if (loc <= this.values.max && loc >= this.values.min) {
			$('#block').css('left', event.pageX + 'px');
		//}
	},
	
	displayX: function(event) {
		$('#number').val(event.pageX);
	},
	
	unbindMouseMove: function(event) {
		$(document).off('mousemove');
	},
	
	bindMouseMove: function() {
	var self = this;
		$(document).on('mousemove', function(e){
			self.dragBlock(e);
			self.displayX(e);
		}); 
	},
	
	mouseDown: function() {
		if (!this.draggable) {
			this.draggable = true;
			$('#block').removeClass('off');
			$('#block').addClass('on');
			this.bindMouseMove();
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
		$(document).on('keyup', function(e) {
			if (!isNaN(parseInt($('#number').val()))) {
				self.setSliderPosition();
			}
		});
	},
	
	unbindKeyPress: function() {
		$(document).off('keyup');
	},
	
	setSliderPosition: function() {
		var loc = parseInt($('#number').val());
		if (loc <= this.values.max && loc >= this.values.min) {
			$('#block').css('left', (loc / this.values.step) - this.values.offset + 'px');
		}
	}
});
