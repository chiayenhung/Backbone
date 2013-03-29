window.StartSurveyView = Backbone.View.extend({
	
	initialize: function () {
		this.template = _.template(tpl.get("startSurvey"));
		this.count = 0;
	},

	render: function () {

		$(this.el).html(this.template());
		this.genQuestion();
		$(this.el).find('.questionContent').hide();
		$(this.el).find('.questionContent').first().show();
		return this;
	},

	events:{

		'click .next': 'next',
		'click .finish' : 'finish',
	},

	finish: function(){
		if(!this.submitt()){
			return;
		}
		$(this.el).remove();
		return window.location.replace('#home');
	},

	next: function(){

		if(!this.submitt()){
			return;
		}
		var tmp = window.app.questions.get(this.count);
		this.count++;
		var target = "#option" + this.count;
		$('.questionContent').hide();
		$(target).show();
	},
	//submit the answer with validate function
	submitt: function(){
		var target = "#option" + this.count;
		if($(target).find('select').length != 0){
			var answers = $(target).find('select').val();
			window.app.questions.get(this.count).set('answers', answers);
			return true;
		}

		var type = $(target).find('input').attr('type');

		if(type == 'text'){
			var answers = $(target).find('input').val();
			if(answers.length == 0 || answers.length > 255){
				alert("the answer length must be less then 255 or not empty!");
				return false;
			}
			window.app.questions.get(this.count).set('answers', answers);
			return true;
		}

		var check = 'input[type=' + type + ']:checked';
		var tmp = $(target).find(check);
		answers = [];
		
		for(var i = 0; i < tmp.length; i++){
			answers.push(tmp[i].value);
		}
		
		window.app.questions.get(this.count).set('answers', answers);
		return true;
	},

	genQuestion: function(){
		var questions = window.app.questions;
		_.each(questions.models, function(question){
			this.switchQuestionType(question);
		}, this);
	},

	//dynamically add question type
	switchQuestionType: function(question){
		var type = question.get('type');
		var questionList = question.get('questions');
		var optionNum = questionList.length;
		var qId = question.get('id');
		var divId = "option" + qId;
		var html = "<div class='questionContent' id='"+ divId + "'>";
		html += "<p>" + question.get('content') + '</p></br>';
		// html += "<form>";
		if(type == "Check"){
			for(var i = 0; i < optionNum; i++){
				html += questionList[i]+"<input type='checkbox' value='" + questionList[i] + "'>";
			}
		}
		if(type == 'Radio'){
			for(var i = 0; i < optionNum; i++){
				html += questionList[i]+"<input type='radio' name='group1' value='" + questionList[i] + "'>";
			}
		}
		if(type == 'DropDown'){
			html += "<select style='width: 100px;'>";
			for(var i = 0; i < optionNum; i++){
				html +="<option>"+questionList[i]+"</option>";
			}
			html += "</select>";
		}
		if(type == 'Text'){
			html += "<input type='text'>";
		}
		
		if(parseInt(qId) + 1 == localStorage.getItem("count")){
			html += "</br><button class='finish'>Finish</button>";
		}
		else{
			html += "</br><button class='next'>Next</button>";
		}
		// html += "</form>";
		html += "</div>";
		$(this.el).find('.question_field').append(html);
	},

});