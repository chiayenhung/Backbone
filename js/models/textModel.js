window.TextModel = QuestionModel.extend({
	defaults: {
    	type:  "text",    
  	},

	initialize: function(){
		this.unset('questions');
	}
});