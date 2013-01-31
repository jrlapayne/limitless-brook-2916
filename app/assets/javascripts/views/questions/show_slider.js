QuizPop.Views.QuestionsShowSlider = Backbone.View.extend({
	
	template: JST['questions/show_slider'],
	
	events: {
		'submit #answer' : 'submitAnswer',
		'click #next' : 'nextQuestion',
		
		'mousedown #block' : 'mouseDown',
		'mouseup' : 'mouseUp',
		'focus #number' : 'bindKeyPress',
		'blur #number' : 'unbindKeyPress',
		'click #slider' : 'moveSliderOnClick',
		
		'touchstart #slider' : 'moveSliderOnTouch',
		'touchstart #block' : 'touchDown',
		'touchend' : 'touchUp'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.challenge = options.challenge;
		this.question = options.question;
		this.slider = this.attr.sliders.where({question_id: this.question.get('id')})[0];
		this.current_user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template({
			question: this.question
		}));
		setTimeout(function() {
			self.renderSlider();
		}, 0);
		setTimeout(function() {
			window.scrollTo(0, 1);
		}, 1000);
		return this;
	}
});
