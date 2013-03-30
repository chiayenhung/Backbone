window.DropdownView = Backbone.View.extend({
	initialize: function () {
		
	},

	render: function () {
		
		var question = this.model;
		var questionList = question.get('questions');
		var optionNum = questionList.length;
		var qId = this.attributes.qId;
		$(this.el).append("<p>" + question.get('content') + '</p></br>');
		var html = "<select class='selectOptions'>";
		for(var i = 0; i < optionNum; i++){
			html += "<option>" + questionList[i] + "</option>";
		}
		html += "</select>";
		$(this.el).append(html);
		
		if(parseInt(qId) + 1 == localStorage.getItem("count")){
			$(this.el).append("</br><button class='finish'>Finish</button>");
		}
		else{
			$(this.el).append("</br><button class='next'>Next</button>");
		}
		
		return this;
	},
})