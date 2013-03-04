window.TestView = Backbone.View.extend({
	
	initialize: function () {
		this.template = _.template(tpl.get("test"));
		this.count = 0;
	},

	render: function () {
		$(this.el).html(this.template());
		return this;
	},

	events:{
		"click #clone" : "clone",
		"click #back": "back",
	},

	clone : function(){
		$(this.el).append("<div class='big_font'>Count: " + this.count + "</div></br>");
		this.count++;
	},

	back : function(){
		$(this.el).remove();
		return window.location.replace("#home");
	},
});