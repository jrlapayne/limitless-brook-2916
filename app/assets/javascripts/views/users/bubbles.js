QuizPop.Views.UsersBubbles = Backbone.View.extend({
	
	template: JST['users/bubbles'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.challenges_won = options.challenges_won;
		
		this.attr.challenges.on('change:[winner_id]', this.setNewUserScore, this);
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template());
		setTimeout(function() {
			$(".dial1").knob();
			$(".dial2").knob();
			$(".dial3").knob();
			$(".dial4").knob();
			$(".dial5").knob();
			self.setBubbles();
		}, 0);
		return this;
	},
	
	setBubbles: function() {
		var static_bubbles = this.getStaticBubbles();
		
		for (i = 0; i < 5; i++) {
			if (static_bubbles > i) {
				this.setStaticBubble($('#dial' + (i + 1)));
			} else {
				this.setVariableBubble($('#dial') + (i + 1));
				break;
			}
		}	
	},
	
	getStaticBubbles: function() {
		return parseInt((this.challenges_won * 10) / 100);
	},
	
	convertNumberToWord: function(num) {
		switch (num) {
			case 1: 
				return 'one';
				break;
			case 2:
				return 'two';
				break;
			case 3:
				return 'three';
				break;
			case 4:
				return 'four';
				break;
			case 5: 
				return 'five';
				break;
			default: 
				return null;
				break;
		}
	},
	
	setStaticBubble: function(element) {
		$(element).removeClass('hide');
		$(element).addClass('static');
		$(element).val('100');
	},
	
	setVariableBubble: function(element) {
		$(element).removeClass('hide');
		$(element).addClass('active');
		$(element).val((this.challenges_won * 10) % 100);
	},
	
	setNewUserScore: function(model) {
		if (model.get('winner_id') === this.user.get('id')) {
			var val = 1;
			var inter = setInterval(function() {
				if (val > 10) {
					clearInterval(inter);
				}
				$('.active').val(val).trigger('change');
				if (parseInt($('.active').val()) === 100 && !$('.active').attr('id', 'dial5')) {
					this.startNewBubble(val, $('.active'));
					clearInterval(inter);
				}
				val = val + 1;
			}, 50);
		}
	},
	
	startNewBubble: function(num, element) {
		var new_bubble = $('#dial' + (parseInt($(element).attr('id').split('dial')[1]) + 1)),
		 	val = 0;
		
		$(element).removeClass('active');
		$(element).addClass('static');
		
		$(new_bubble).removeClass('hide');
		$(new_bubble).addClass('.active');
		
		var inter = setInterval(function() {
			if (val > num) {
				clearInterval(inter);
			}
			$(new_bubble).val(val).trigger('change');
			val = val + 1;
		}, 50);
	}
});