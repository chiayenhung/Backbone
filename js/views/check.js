window.CheckView = Backbone.View.extend({
	
	initialize: function () {
		this.template = _.template(tpl.get("check"));
	},

	render: function () {
		$(this.el).html(this.template());
		return this;
	},
});