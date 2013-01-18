window.QuizPop = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	initialize: function(data) {
		this.current_user = new QuizPop.Models.User(data.current_user);
		this.issues = new QuizPop.Collections.Issues(data.issues);
		this.questions = new QuizPop.Collections.Issues(data.questions);
		this.challenges = new QuizPop.Collections.Challenges(data.challenges);
		this.tasks = new QuizPop.Collections.Tasks(data.tasks);
		this.users = new QuizPop.Collections.Users(data.users);
		
		new QuizPop.Routers.Router({
			current_user: this.current_user,
			users: this.users,
			issues: this.issues,
			questions: this.questions,
			challenges: this.challenges,
			tasks: this.challenges
		});
		
		Backbone.history.start();
	}
};
