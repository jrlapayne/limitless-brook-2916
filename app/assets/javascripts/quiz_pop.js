window.QuizPop = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	initialize: function(data) {
		this.current_user = new QuizPop.Models.User(data.current_user);
		this.issues = new QuizPop.Collections.Issues(data.issues);
		this.questions = new QuizPop.Collections.Questions(data.questions);
		this.answers = new QuizPop.Collections.Answers(data.answers);
		this.sliders = new QuizPop.Collections.Sliders(data.sliders);
		this.challenges = new QuizPop.Collections.Challenges(data.challenges);
		this.tasks = new QuizPop.Collections.Tasks(data.tasks);
		this.users = new QuizPop.Collections.Users(data.users);
		
		new QuizPop.Routers.Router({
			current_user: this.current_user,
			users: this.users,
			issues: this.issues,
			questions: this.questions,
			answers: this.answers,
			sliders: this.sliders,
			challenges: this.challenges,
			tasks: this.tasks
		});
		
		Backbone.history.start();
	},
	
	preLoad: function() {
		$('<img />').attr('src', 'assets/logos/white.png');
		$('<img />').attr('src', 'assets/logos/blue.png');
		$('<img />').attr('src', 'assets/logos/black.png');
		
		this.issues.each(function(i) {
			$('<img />').attr('src', 'assets/issues/' + i.get('thumbnail') + '.png');
		});
		
		setTimeout(function() {
			for (w = 0; w < 16; w++) {
				$('<img />').attr('src', 'assets/rage/win/' + (w + 1) + '.png');
			}
			for (f = 0; f < 23; f++) {
				$('<img />').attr('src', 'assets/rage/fail/' + (f + 1) + '.png');
			}
		}, 0);
	}
};
