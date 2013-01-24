QuizPop.Views.PagesLoading = Backbone.View.extend({
	template: JST['pages/loading'],
	
	initialize: function() {
		this.time = 2000;
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template());
		setTimeout(function() {
			self.resetLoading();
		}, 0);
		return this;
	},
	
	loading: function() {
		var time = this.time,
			self = this;
			
		setTimeout(function() {
			$('#ball1').animate({
				opacity: "0"
			}, time);
		}, 0);
		setTimeout(function() {
			$('#ball2').animate({
				opacity: "0"
			}, time);
		}, parseInt(Math.round(time / 8)));
		setTimeout(function() {
			$('#ball3').animate({
				opacity: "0"
			}, time);
		}, parseInt(Math.round((time / 8) * 2)));
		setTimeout(function() {
			$('#ball4').animate({
				opacity: "0"
			}, time);
		}, parseInt(Math.round((time / 8) * 3)));
		setTimeout(function() {
			$('#ball5').animate({
				opacity: "0"
			}, time);
		}, parseInt(Math.round((time / 8) * 4)));
		setTimeout(function() {
			$('#ball6').animate({
				opacity: "0"
			}, time);
		}, parseInt(Math.round((time / 8) * 5)));
		setTimeout(function() {
			$('#ball7').animate({
				opacity: "0"
			}, time);
		}, parseInt(Math.round((time / 8) * 6)));
		setTimeout(function() {
			$('#ball8').animate({
				opacity: "0"
			}, time);
		}, parseInt(Math.round((time / 8) * 7)));

		setTimeout(function() {
			self.resetLoading();
		}, time);
	},
	
	resetLoading: function() {
		var time = this.time;
		
		setTimeout(function() {
			$('#ball1').animate({
				opacity: "1"
			}, 0);
		}, 0);
		setTimeout(function() {
			$('#ball2').animate({
				opacity: "1"
			}, 0);
		}, parseInt(Math.round(time / 8)));
		setTimeout(function() {
			$('#ball3').animate({
				opacity: "1"
			}, 0);
		}, parseInt(Math.round((time / 8) * 2)));
		setTimeout(function() {
			$('#ball4').animate({
				opacity: "1"
			}, 0);
		}, parseInt(Math.round((time / 8) * 3)));
		setTimeout(function() {
			$('#ball5').animate({
				opacity: "1"
			}, 0);
		}, parseInt(Math.round((time / 8) * 4)));
		setTimeout(function() {
			$('#ball6').animate({
				opacity: "1"
			}, 0);
		}, parseInt(Math.round((time / 8) * 5)));
		setTimeout(function() {
			$('#ball7').animate({
				opacity: "1"
			}, 0);
		}, parseInt(Math.round((time / 8) * 6)));
		setTimeout(function() {
			$('#ball8').animate({
				opacity: "1"
			}, 0);
		}, parseInt(Math.round((time / 8) * 7)));
		
		this.loading();
	}
});