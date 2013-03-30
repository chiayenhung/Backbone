window.AddQuestionView = Backbone.View.extend({
	
	initialize: function () {
		this.template = _.template(tpl.get("addQuestion"));
		this.count = 0;
		this.words = 255;
	},

	render: function () {
		$(this.el).html(this.template());
		var page = new OptionView();

		$(this.el).find(".option_content").append(page.render().el);
		$(this.el).find('.status').append(localStorage.getItem("count"));
		this.wordCount();
		return this;
	},

	events:{
		'change .typeSelect' : "change",
		'click #genOptions' : "genOptions",
		'click #addQuestion' : 'addQuestion',
		'click #addFinish' : 'addFinish',
	},

	//for count the words in question area
	//implement scope chain for javascript
	wordCount: function(){
		that = this;
		$(this.el).find('#word').text(this.words);
		$(this.el).find('#q_content').keyup(function() {
			var len = $('#q_content').val().length;
			var counts = that.words - len;
  			$('#word').text(counts);
		});
	},

	//validate add question content and option contens
	validate: function(){
		//the question shouldn't be empty or more than 255 words
		if($('#q_content').val().length == 0 ){
				alert('Question should not be empty');
				return false;
		}
		if($('#q_content').val().length > 255){
			alert('Question content too much!');
			return false;
		}
		//get the question type
		var type = $("select").val();

		var str = $('#numberField').val();
		var regex = new RegExp('\\d+');
		var match = regex.exec(str);
		if(match == null){
			alert('number must be numbers!');
			return false;
		}
		if(parseInt(str) < 0){
			alert("invalid number");
			return false;
		}

		try{
			var options = $('.option');
			if(options[0] == undefined){
				alert("Options are required!");
				return false;
			}
			for(var i = 0; i < options.length; i++){
				if(options[i].value.length == 0){
					alert("option cannot be empty!");
					return false;
				}
			}
		}
		catch(e){
			alert("Options are required!");
			return false;
		}
		//}
		return true;
	},

	//save question in collection
	addQuestion: function() {
		if(!this.validate()){
			return;
		}
		var content = $('#q_content').val();
		// var type = $('select').val();
		var options = $('.option');
		var questions = [];
		for(var i = 0; i < options.length; i++){
			questions.push(options[i].value);
		}
		
		var id = localStorage.getItem("count");
		var questionSet = this.createModel(content, questions, id);

		window.app.questions.push(questionSet);
		this.resetFields();
		id++;
		localStorage.setItem("count", id);
		$('.status').text(id);
		this.genOptions();
	},

	createModel: function(content, questions, id){
		var check = new CheckModel({content: content, questions: questions});
		var radio = new RadioModel({content: content, questions: questions});
		var dropdown = new DropdownModel({content: content, questions: questions});
		var text = new TextModel({content: content});
		return new QuestionSet({id: id, checkbox: check, radio: radio, dropdown: dropdown, text: text});

	},

	resetFields: function(){
		$("#numberField").val(0);
		$('#q_content').val("");
		this.words = 255;
		$('#word').text(this.words);
	},

	addFinish: function(){
		$(this.el).remove();
	 	return window.location.replace("#home");
	},

	change: function(event){
		$('.option_content').empty();
		var type = $("select").val();
		
		if(type != 'Text'){
			var page = new OptionView();
			$(".option_content").append(page.render().el);
		}
	},

	genOptions: function(){
		$('#optionsDiv').empty();
		var content = $("#numberField").val();
		for(var i = 1; i <= content; i++){
			$('#optionsDiv').append("<div class='big_font'>" + i + ": " + "<input type='text' class='option'></div>");
		}

	},
});