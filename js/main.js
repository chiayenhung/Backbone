var AppRouter = Backbone.Router.extend({
	routes: {
		"home" : "home",
		"addQuestion" : "addQuestion",
		"startSurvey" : "startSurvey",
		"viewResult"  : "viewResult",
	},

	initialize: function(){
		
		this.questions = new QuestionCollection();
		this.answers = new AnswerCollection();
	},

	viewResult: function(){
		this.changePage(new ViewResultView());
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
    // $(this.el).remove();
    $(page.el).attr('id', viewName);
    page.render();
    $('body').append($(page.el));
    },
})