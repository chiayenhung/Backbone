var AppRouter = Backbone.Router.extend({
	routes: {
		"home" : "home",
		"addQuestion" : "addQuestion",
		"startSurvey" : "startSurvey",
	},

	initialize: function(){
		
		this.questions = new QuestionCollection();
	},

	home: function(){
		this.changePage(new HomeView());
	},

	addQuestion: function(){
		this.changePage(new AddQuestionView());
	},

	startSurvey: function(){
		this.changePage(new StartSurveyView());
	},

	changePage:function (page,viewName) {
    // $(page.el).attr('data-role', 'page');
    // $(page.el).attr('data-type', 'view');
    $(this.el).remove();
    $(page.el).attr('id', viewName);
    page.render();
    $('body').append($(page.el));
    },
})