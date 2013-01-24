QuizPop.Views.PagesLoading = Backbone.View.extend({
	template: JST['pages/loading'],
	
	initialize: function() {
		this.speed = 0.25;
		this.width = parseInt($(window).width()) - 100;
		this.height = parseInt($(window).height()) - 99;
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template());
		setTimeout(function() {
			self.checkMultipliers();
		}, 0);
		return this;
	},
	
	getBallX: function() {
		return parseInt($('#logo_ball').css('left').split('px')[0]);
	},
	
	getBallY: function() {
		return parseInt($('#logo_ball').css('top').split('px')[0]);
	},
	
	getXMultiplier: function(slope_x) {
		if (slope_x > 0) {
			return Math.round((this.width - this.getBallX()) / slope_x);
		} else {
			return Math.round((-1 * this.getBallX()) / slope_x);
		}
	},
	
	getYMultiplier: function(slope_y) {
		if (slope_y > 0) {
			return Math.round((this.height - this.getBallY()) / slope_y);
		} else {
			return Math.round((-1 * this.getBallY()) / slope_y);
		}
	},
	
	getSlope: function() {
		var angle = Math.floor(Math.random() * 360),
			x,
			y;

		if (angle > 90 && angle < 270) {
			x = -1;
			y = Math.tan((Math.PI * angle) / 180);
		} else if (angle < 90 || angle > 270) {
			x = 1;
			y = Math.tan((Math.PI * angle) / 180);
		} else if (angle === 90 || angle === 270) {
			x = 0;
			y = 1;
		} else if (angle === 0 || angle === 180) {
			x = 1;
			y = 0;
		}
		return {x: x, y: y};
	},
	
	checkDims: function(slope_x, slope_y, ball_x, ball_y) {
		var con1 = ball_x + slope_x >= 0,
			con2 = ball_x + slope_x <= this.width,
			con3 = ball_y + slope_y >= 0,
			con4 = ball_y + slope_y <= this.height;
			
		return (con1 && con2 && con3 && con4);
	},
	
	checkMultipliers: function() {
		var slope = this.getSlope(),
			x = this.getXMultiplier(slope.x),
			y = this.getYMultiplier(slope.y);
		
		if (y > x) {
			this.moveBall(x, slope);
		} else {
			this.moveBall(y, slope);
		}
	},
	
	getDistance: function(new_x, new_y, current_x, current_y) {
		return Math.sqrt(Math.pow(new_y - current_y, 2) + Math.pow(new_x - current_x, 2));
	},
	
	moveBall: function(mult, slope) {
		var self = this,
			x = (mult * slope.x) + this.getBallX(),
			y = (mult * slope.y) + this.getBallY(),
			dist = this.getDistance(x, y, this.getBallX(), this.getBallY()),
			time = Math.round(dist / this.speed);
			
		$('#logo_ball').animate({
			left: Math.round(x) + 'px',
			top: Math.round(y) + 'px'
		}, time);
		setTimeout(function() {
			self.checkMultipliers();
		}, time + 100)
	}
});