window.StartSurveyView = Backbone.View.extend({
	
	initialize: function () {
		this.template = _.template(tpl.get("startSurvey"));
		this.count = 0;
	},

	render: function () {
		$(this.el).html(this.template());
		return this;
	},

	events:{
		
	},
});