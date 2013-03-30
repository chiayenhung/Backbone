window.TextView = Backbone.View.extend({
	initialize: function () {
		
	},

	render: function () {
		
		var question = this.model;
		var questionList = question.get('questions');
		var optionNum = questionList.length;
		var qId = this.attributes.qId;
		var divId = "option" + qId;

		$(this.el).append("<p>" + question.get('content') + '</p></br>');
		$(this.el).append("<input type='text'>");
		
		if(parseInt(qId) + 1 == localStorage.getItem("count")){
			$(this.el).append("</br><button class='finish'>Finish</button>");
		}
		else{
			$(this.el).append("</br><button class='next'>Next</button>");
		}
		return this;
	},
})