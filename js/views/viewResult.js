window.ViewResultView = Backbone.View.extend({

	initialize: function () {
		this.template = _.template(tpl.get("viewResult"));
	},

	render: function () {
		$(this.el).html(this.template());
		this.genAnswers();
		// $(this.el).find(".option_content").append(page.render().el);
		// $(this.el).find('.status').append(localStorage.getItem("count"));
		return this;
	},

	events:{
		'click .back' : 'back',
	},

	back: function(){
		$(this.el).remove();
		return window.location.replace('#home');
	},

	genAnswers: function(){
		var questions = window.app.questions;
		console.log(questions);
		_.each(questions.models, function(question){
			this.genContent(question);
		}, this);
	},

	genContent: function(question){
		var html = "";
		html += '<div><p>' + question.get('content') + '</p></br>';
		html += '<p>' + question.get('answers') + '</p></br>';
		console.log(html);
		$(this.el).find('.answerField').append(html);
	},
});