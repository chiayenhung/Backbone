window.AddQuestionView = Backbone.View.extend({
	
	initialize: function () {
		this.template = _.template(tpl.get("addQuestion"));
		this.count = 0;
	},

	render: function () {
		$(this.el).html(this.template());
		var page = new CheckView();

		$(this.el).find(".option_content").append(page.render().el);
		$(this.el).find('.status').append(localStorage.getItem("count"));
		return this;
	},

	events:{
		'change .typeSelect' : "change",
		'click #genOptions' : "genOptions",
		'click #addQuestion' : 'addQuestion',
		'click #addFinish' : 'addFinish',
	},

	validate: function(){
		if($('#q_content').val().length == 0 ){
				alert('Question should not be empty');
				return false;
		}
		if($('#q_content').val().length > 255){
			alert('Question content too much!');
			return false;
		}

		var type = $("select").val();

		if(type == 'Check' || type == 'Radio'){
			var str = $('#numberField').val();
			var regex = new RegExp('\\d+');
			var match = regex.exec(str);
			if(match == null){
				alert('number must be numbers!');
				return false;
			}
			try{
				var options = $('.option');
				console.log(options);
				console.log(options[0]);
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
		}
		return true;
	},

	addQuestion: function() {
		if(!this.validate()){
			return;
		}
		var content = $('#q_content').val();
		// console.log(content);
		var type = $('select').val();
		// console.log(type);
		var options = $('.option');
		var questions = [];
		for(var i = 0; i < options.length; i++){
			console.log(options[i].value);
			questions.push(options[i].value);
		}

		var id = localStorage.getItem("count");
		window.app.questions.create({id: id, content: content, type: type, questions: questions});
		// console.log(window.app.questions);
		id++;
		localStorage.setItem("count", id);
		$('.status').text(id);
		this.genOptions();
	},

	addFinish: function(){
		// alert(window.app.questions.models);
		$(this.el).remove();
	 	return window.location.replace("#home");
	},

	change: function(event){
		$('.option_content').empty();
		var type = $("select").val();
		// console.log(type);
		// $(".option_content").hide();
		// $("#"+type).show();
		if(type != 'Text'){
			var page = new CheckView();
		// console.log(page.render().html());
			$(".option_content").append(page.render().el);
		}
	},

	genOptions: function(){
		$('#optionsDiv').empty();
		var content = $("#numberField").val();
		// console.log(content);
		for(var i = 1; i <= content; i++){
			$('#optionsDiv').append("<div class='big_font'>" + i + ": " + "<input type='text' class='option'></div>");
		}

	},
});