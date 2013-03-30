window.StartSurveyView = Backbone.View.extend({
	
	initialize: function () {
		this.template = _.template(tpl.get("startSurvey"));
		this.count = 0;
		this.currentQuestion = app.questions.get(0).get('checkbox');
	},

	render: function () {

		$(this.el).html(this.template());
		this.genQuestion();
		console.log(this.el);
		$(this.el).find('.questionContent').hide();
		$(this.el).find('.questionContent').first().show();
		return this;
	},

	events:{

		'click .next': 'next',
		'click .finish' : 'finish',
		'change .switchQuestion' : 'changeOptions',
	},

	finish: function(){
		if(!this.submitt()){
			return;
		}
		this.currentQuestion.set('id', this.count);
		console.log(this.currentQuestion.toJSON());
		app.answers.push(this.currentQuestion);
		$(this.el).remove();
		return window.location.replace('#home');
	},

	next: function(){

		if(!this.submitt()){
			return;
		}
		this.currentQuestion.set('id', this.count);
		app.answers.push(this.currentQuestion);
		this.count++;
		this.currentQuestion = app.questions.get(this.count).get('checkbox');
		var target = "#option" + this.count;
		$('.questionContent').hide();
		$(target).show();
	},
	//submit the answer with validate function
	submitt: function(){
		var target = "#option" + this.count;
		if($(target).find('select').length != 0){
			var answers = $(target).find('select').val();
			this.currentQuestion.set('answers', answers);
			return true;
		}

		var type = $(target).find('input').attr('type');
		console.log(type);
		if(type == 'text'){
			var answers = $(target).find('input').val();
			if(answers.length == 0 || answers.length > 255){
				alert("the answer length must be less then 255 or not empty!");
				return false;
			}
			this.currentQuestion.set('answers', answers);
			return true;
		}

		var check = 'input[type=' + type + ']:checked';
		var tmp = $(target).find(check);
		answers = [];
		
		for(var i = 0; i < tmp.length; i++){
			answers.push(tmp[i].value);
		}
		console.log(answers);
		this.currentQuestion.set('answers', answers);
		return true;
	},

	genQuestion: function(){
		var questions = window.app.questions;
		_.each(questions.models, function(questionSet){
			this.produceOptions(questionSet);
		}, this);
	},

	genOptionContent: function(question, qId){
		var type = question.get('type');
		var questionList = question.get('questions');
		var idName = "option" + qId;
		var page = null;
		var tmp = {id: idName, class: "questionContent", qId: qId};
		if(type == 'checkbox'){
			page = new CheckView({model: question, attributes: tmp});
		}
		else if(type == 'radio'){
			page = new RadioView({model: question, attributes: tmp});
		}
		else if(type == 'dropdown'){
			page = new DropdownView({model: question, attributes: tmp});
		}
		else{
			page = new TextView({model: question, attributes: tmp});
		}

		return page;
	},

	changeOptions: function(){
		var target = $('.switchQuestion').val().toLowerCase();
		var question = app.questions.get(this.count).get(target);
		console.log(question.get('type'));
		var html = this.genOptionContent(question, this.count).render().el;
		var divId = "#option" + this.count;
		$(divId).empty();
		$(divId).append(html);
	},

	produceOptions: function(questionSet){
		var target = $(this.el).find('option').first().val().toLowerCase();
		console.log(target);
		var question = questionSet.get(target);
		console.log(question.toJSON());
		var html = this.genOptionContent(question, questionSet.get('id')).render().el;
		$(this.el).find('.question_field').append(html);
	},

});