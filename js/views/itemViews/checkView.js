window.CheckView = Backbone.View.extend({
	initialize: function () {
		
	},

	render: function () {
		var question = this.model;
		var questionList = question.get('questions');
		var optionNum = questionList.length;
		var qId = this.attributes.qId;
		$(this.el).append("<p>" + question.get('content') + '</p></br>');
		for(var i = 0; i < optionNum; i++){
			$(this.el).append(questionList[i]+"<input type='checkbox' value='" + questionList[i] + "'>");
		}
		
		if(parseInt(qId) + 1 == localStorage.getItem("count")){
			$(this.el).append("</br><button class='finish'>Finish</button>");
		}
		else{
			$(this.el).append("</br><button class='next'>Next</button>");
		}
		
		return this;
	},
})