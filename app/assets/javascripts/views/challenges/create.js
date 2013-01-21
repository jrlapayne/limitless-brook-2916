QuizPop.Views.ChallengesCreate = Backbone.View.extend({
	
	template: JST['challenges/create'],
	id: 'friends',
	
	events: {
		'click .friend' : 'checkUser'
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.current_user = this.attr.users.where({id: this.attr.current_user.get('id')})[0];
		this.friends = options.friends;
		this.subviews = [];
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template({
			
		}));
		setTimeout(function() {
			for (i = 0; i < self.friends.length; i++) {
				self.renderFriend(self.friends[i]);
			}
		}, 0);
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
	
	
	checkUser: function(event) {
		var self = this;
		var friend = this.friends[parseInt($(event.target).closest('.friend').attr('id'))];
		if (this.attr.users.where({uid: friend['id']})[0]) {
			this.createChallenge(this.attr.users.where({uid: friend['id']})[0]);
		} else {
			//start loading
			user = this.attr.users.create({
				name: friend['name'],
				uid: friend['id'],
				provider: 'facebook'
			}, {
				success: function(user, response) {
					self.createChallenge(user);
				},
				error: function(user, response) {
					alert('something went wrong!')
					//stop loading
				}
			});
		}
	},
	
	createChallenge: function(user) {
		this.attr.challenges.create({
			challenger_id: this.current_user.get('id'),
			user_id: user.get('id'),
			is_finished: false,
			is_sent: false,
			challenger_score: 0,
			user_score: 0
		}, {
			success: function(challenge, response) {
				//stop loading
				Backbone.history.navigate('issue' + challenge.get('id'), true);
			},
			error: function(challenge, response) {
				//stop loading
				alert('shit son, that ain\'t right!');
			}
		});
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