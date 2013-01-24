QuizPop.Views.ChallengesCreate = Backbone.View.extend({
	
	template: JST['challenges/create'],
	
	events: {
		'click .friend' : 'checkUser',
		'click .letter' : 'goToLetter'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.current_user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		this.friends = this.filterAndAlphabetize(options.friends);
		this.subviews = [];
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
	
	goToLetter: function(event) {
		var letter = $(event.target).closest('.letter').attr('id'),
			loc;
		$('.alphabet').children().removeClass('active');
		$(event.target).closest('.letter').addClass('active');
		 
		while (!this.isUserAtLoc(letter)) {
			if (letter === 'a') {
				break;
			}
			letter = this.nextLetter(letter);
		};
		loc = this.getUserLoc(letter);
		if (loc === 0) {
			window.scrollTo(0, 1);
		} else {
			window.scrollTo(0, parseInt((loc + 1) * 46));
		}
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