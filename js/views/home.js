window.HomeView = Backbone.View.extend({
	
	initialize: function () {
		this.template = _.template(tpl.get("home"));
		$(window).on('resize', this.resize);
		
	},

	render: function (eventName) {
		$(this.el).html(this.template());
		return this;
	},

	events: {
		"click .addQBtn": "addQBtn",
		"click .surveyBtn" : "startSurvey",
		"click .resultBtn" : "resultBtn",
	},

	resultBtn: function(){
		$(this.el).remove();
		return window.location.replace("#viewResult");
	},

	addQBtn: function(){
		$(this.el).remove();
		return window.location.replace("#addQuestion");
	},

	startSurvey: function(){
		$(this.el).remove();
		return window.location.replace("#startSurvey");
	},

});