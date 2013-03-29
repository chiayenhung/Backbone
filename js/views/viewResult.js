window.ViewResultView = Backbone.View.extend({

	initialize: function () {
		this.template = _.template(tpl.get("viewResult"));
	},

	render: function () {
		$(this.el).html(this.template());
		this.genAnswers();
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
		_.each(questions.models, function(question){
			this.populate(question);
		}, this);
	},

	//load template and populate via json
	populate: function(model){
		$(this.el).find('.answerField').append(new AnswerView({model: model}).render().el);
	},

});