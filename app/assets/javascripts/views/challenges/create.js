QuizPop.Views.ChallengesCreate = Backbone.View.extend({
	
	template: JST['challenges/create'],
	
	events: {
		'click .friend' : 'checkUser',
		'click .letter' : 'goToLetter'
		//'mousedown .alphabet' : 'mouseDown',
		//'mouseUp' : 'mouseUp'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.current_user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		this.friends = this.filterAndAlphabetize(options.friends);
		this.subviews = [];
		this.letter = 'a';
	},
	
	render: function() {
		var self = this;
		$(this.el).addClass('friends-list');
		$(this.el).html(this.template({
			
		}));
		setTimeout(function() {
			for (i = 0; i < self.friends.length; i++) {
				self.renderFriend(self.friends[i]);
			}
		}, 0);
		setTimeout(function() {
			self.endLoading();
		}, 500);
		setTimeout(function() {
			window.scrollTo(0, 1);
		}, 1000);
		return this;
	},
	
	getLetterLocationObject: function() {
		var alphabet = 'abcdefghijklmnopqrstuvwxyz',
			obj = [],
			letter;
		
		for (i = 0; i < 26; i++) {
			letter = alphabet.substring(i, i + 1)
			obj.push({letter: letter, location: this.getLetterLocation(letter)});
		}
		
		return obj;
	},
	
	getLetterLocation: function(letter) {
		while (!this.isUserAtLoc(letter) && letter !== 'a') {
			letter = this.nextLetter(letter);
		};
		
		return this.getUserLoc(letter); 
	},
	
	filterAndAlphabetize: function(array) {
		var self = this;
		var friends = [], user;
		_.each(array, function(f) {
			user = self.attr.users.where({uid: f['id']})[0]; 
			if (!(user && 
				(self.attr.challenges.where({user_id: user.get('id'), challenger_id: self.current_user.get('id'), is_finished: false, is_sent: true})[0] || 
				self.attr.challenges.where({challenger_id: user.get('id'), user_id: self.current_user.get('id'), is_finished: false, is_sent: true})[0]))) 
			{
				friends.push(f);
			}
		});
		friends.sort(function(a,b) {
			var nameA = a['name'].split(' ')[a['name'].split(' ').length - 1].toLowerCase();
			var nameB = b['name'].split(' ')[b['name'].split(' ').length - 1].toLowerCase();
			if (nameA < nameB) {
				return -1;
			}
			if (nameB < nameA) {
				return 1;
			}
			return 0;
		});
		
		return friends;
	},
	
	renderFriend: function(friend) {
		var view = new QuizPop.Views.UsersFriend({
			attr: this.attr,
			friends: this.friends,
			friend: friend
		});
		this.subviews.push(view);
		$('#friends').append(view.render().el);
	},
	
	
	checkUser: function(event) {
		var self = this;
		var friend = this.friends[parseInt($(event.target).closest('.friend').attr('id'))];
		if (this.attr.users.where({uid: friend['id']})[0]) {
			this.createChallenge(this.attr.users.where({uid: friend['id']})[0]);
		} else {
			user = this.attr.users.create({
				name: friend['name'],
				uid: friend['id'],
				provider: 'facebook'
			}, {
				success: function(user, response) {
					self.createChallenge(user);
				},
				error: function(user, response) {

				}
			});
		}
	},
	
	createChallenge: function(user) {
		var self = this;
		this.attr.challenges.create({
			challenger_id: this.current_user.get('id'),
			user_id: user.get('id')
		}, {
			success: function(challenge, response) {
				Backbone.history.navigate('issue' + challenge.get('id'), true);
			},
			error: function(challenge, response) {

			}
		});
	},
	
	goToLetter: function(letter) {
		var	alphabet = 'abcdefghijklmnopqrstuvwxyz',
			loc;
		$('.alphabet').children().removeClass('active');
		$(event.target).closest('.letter').addClass('active');
		 
		for (i = 0; i < 26; i++) {
			if (letter === alphabet.substring(i, i + 1)) {
				loc = this.obj[i].location;
				break;
			}
		}
		
		window.scrollTo(0, parseInt(loc));
	},
	
	getUserLoc: function(letter) {
		var loc = null;
		for (i = 0; i < this.friends.length; i++) {
			if (letter === this.friends[i]['name'].split(' ')[this.friends[i]['name'].split(' ').length - 1].substring(0, 1).toLowerCase()) {
				loc = i;
				break;
			}
		}
		
		return loc;
	},
	
	isUserAtLoc: function(letter) {
		var loc = null;
		for (i = 0; i < this.friends.length; i++) {
			if (letter === this.friends[i]['name'].split(' ')[this.friends[i]['name'].split(' ').length - 1].substring(0, 1).toLowerCase()) {
				loc = i;
				break;
			}
		}
		if (!loc) {
			return false;
		} else {
			return true;
		}
	},
	
	nextLetter: function(letter) {
		var alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
		
		for (i = 0; i < alph.length; i++) {
			if (letter === alph[i]) {
				letter = alph[i - 1];
				break;
			}
		}
		
		return letter;
	},
	
	mouseDown: function(event) {
		this.bindMouseMove();
	},
	
	mouseUp: function(event) {
		event.preventDefault();
		this.unbindMouseMove();
	},
	
	bindMouseMove: function() {
		var self = this;
		$(document).on('mousemove', function(event) {
			var letter = $(event.target).closest('.letter').attr('id');
			if (self.letter !== letter) {
				self.letter = letter;
				self.goToLetter(letter);
			}
		});
	},
	
	unbindMouseMove: function() {
		$(document).off('mousemove');
	},
	
	alphabetSlider: function(event) {
		$('#test').html($(event.target).closest('.letter').attr('id'));
		this.goToLetter($(event.target).closest('.letter').attr('id'));
	},
	
	startLoading: function() {
		var view = new QuizPop.Views.PagesLoading();
		$('#loading').removeClass('inactive');
		$('#loading').addClass('active');
		$('#loading').html(view.render().el);
	},
	
	 endLoading: function() {
		$('#loading').removeClass('active');
		$('#loading').addClass('inactive');
		$('#loading').children().remove();
	},
	
	onClose: function() {
		_.each(this.subviews, function(view) {
			view.remove();
			view.unbind();
			
			if (view.onClose) {
				view.onClose();
			}
		});
	}
});