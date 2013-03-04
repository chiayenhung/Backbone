window.HomeView = Backbone.View.extend({
	
	initialize: function () {
		this.template = _.template(tpl.get("home"));
	},

	render: function () {
		$(this.el).html(this.template());
		return this;
	},

	events: {
		"click #test": "test",
	},

	test: function(){
		alert("open test");
		$(this.el).remove();
		return window.location.replace("#test");
	}
})