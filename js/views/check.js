window.CheckView = Backbone.View.extend({
	
	initialize: function () {
		this.template = _.template(tpl.get("check"));
	},

	render: function () {
		// console.log(this.template);
		$(this.el).html(this.template());
		return this;
	},
});