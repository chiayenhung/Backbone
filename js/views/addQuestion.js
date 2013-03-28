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
		'change select' : "change",
		'click #genOptions' : "genOptions",
		'click #addQuestion' : 'addQuestion',
		'click #addFinish' : 'addFinish',
	},

	addQuestion: function() {
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
		console.log(type);
		// $(".option_content").hide();
		// $("#"+type).show();
		if(type != 'Text'){
			var page = new CheckView();
		// console.log(page.render().html());
			$(".option_content").append(page.render().el);
		}
		else{
			$(".option_content").append("<input type='text'>");
		}
	},

	genOptions: function(){
		$('#optionsDiv').empty();
		var content = $("#numberField").val();
		console.log(content);
		for(var i = 1; i <= content; i++){
			$('#optionsDiv').append("<div class='big_font'>" + i + ": " + "<input type='text' class='option'></div>");
		}

	}
	// clone : function(){
	// 	$(this.el).append("<div class='big_font'>Count: " + this.count + "</div></br>");
	// 	this.count++;
	// },

	// back : function(){
	// 	$(this.el).remove();
	// 	return window.location.replace("#home");
	// },
});