QuizPop.Views.ChallengesCreate = Backbone.View.extend({
	
	template: JST['challenges/create'],
	
	events: {
		'click .friend' : 'checkUser',
		'click .letter' : 'scrollToLetter',
		
		'mousedown .letter' : 'mouseDown',
		'mouseup' : 'mouseUp',
		
		'touchstart .letter' : 'touchDown',
		'touchend' : 'touchUp'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.current_user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		this.friends = this.filterAndAlphabetize(options.friends);
		this.user_height = 41;
		this.obj = this.getLetterLocationObject();
		this.current_location = null;
		this.scrollable = false;
		this.subviews = [];
	},
	
	render: function() {
		var self = this;
		$(this.el).addClass('friends-list');
		$(this.el).html(this.template());
		setTimeout(function() {
			for (i = 0; i < self.friends.length; i++) {
				self.renderFriend(self.friends[i]);
			}
		}, 0);
		setTimeout(function() {
			window.scrollTo(0, 1);
		}, 1000);
		return this;
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
	
	isUserAtLoc: function(letter) {
		var loc = null;
		for (f = 0; f < this.friends.length; f++) {
			if (letter === this.friends[f]['name'].split(' ')[this.friends[f]['name'].split(' ').length - 1].substring(0, 1).toLowerCase()) {
				loc = f;
				break;
			}
		}
		if (!loc) {
			return false;
		} else {
			return true;
		}
	},
	
	getUserLoc: function(letter) {
		var loc = null;
		
		if (letter !== 'a') {
			for (f = 0; f < this.friends.length; f++) {
				if (letter === this.friends[f]['name'].split(' ')[this.friends[f]['name'].split(' ').length - 1].substring(0, 1).toLowerCase()) {
					loc = (f + 1) * this.user_height;
					break;
				}
			}
		} else {
			loc = 1;
		}
		
		return loc;
	},
	
	nextLetter: function(letter) {
		var alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
		
		for (l = 0; l < alph.length; l++) {
			if (letter === alph[l]) {
				letter = alph[l - 1];
				break;
			}
		}
		
		return letter;
	},
	
	scrollToLetter: function(event) {
		$('.alphabet').children().removeClass('active');
		$(event.target).closest('.letter').addClass('active');
		window.scrollTo(0, this.obj[parseInt($(event.target).closest('.letter').attr('id'))].location);
		this.current_location = parseInt($(event.target).closest('.letter').attr('id')); 
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
	
	endLoading: function() {
		$('#loading').removeClass('active');
		$('#loading').addClass('inactive');
		$('#loading').children().remove();
	},
	
	mouseDown: function(event) {
		if (!this.scrollable) {
			event.preventDefault();
			this.scrollable = true;
			this.bindMouseMove();
		}
	},
	
	mouseUp: function() {
		if (this.scrollable) {
			this.scrollable = false;
			$(document).off('mousemove');
		}
	},
	
	touchDown: function(event) {
		if (!this.scrollable) {
			event.preventDefault();
			this.scrollable = true;
			this.bindTouchMove();
		}
	},
	
	touchUp: function() {
		if (this.scrollable) {
			this.scrollable = false;
			$(document).off('touchmove');
		}
	},
	
	bindMouseMove: function() {
		var self = this;
		$(document).on('mousemove', function(event) {
			self.scrollAlphabet(event);
		});
	},
	
	bindTouchMove: function() {
		var self = this;
		$(document).on('touchmove', function(event) {
			alert($(event.originalEvent.target).attr('id'));
			self.scrollAlphabet(event.originalEvent.touches[0]);
		});
	},
	
	scrollAlphabet: function(event) {
		if (this.current_location !== parseInt($(event.target).closest('.letter').attr('id'))) {
			this.scrollToLetter(event);
		}
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