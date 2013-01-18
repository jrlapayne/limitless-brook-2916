QuizPop.Views.IssuesShow = Backbone.View.extend({
	
	template: JST['issues/show'],
	
	events: {
		
	},
	
	initialize: function(options) {
		this.attr = options.attr;
		this.issue = options.issue;
	},
	
	render: function() {
		$(this.el).addClass('issue');
		$(this.el).attr('id', this.issue.get('id'));
		$(this.el).html(this.template({
			issue: this.issue
		}));
		return this;
	}
});