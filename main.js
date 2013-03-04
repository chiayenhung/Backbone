var AppRouter = Backbone.Router.extend({
	routes: {
		"home" : "home",
		"test" : "test",
	},

	initialize: function(){

	},

	home: function(){
		this.changePage(new HomeView());
	},

	test: function(){
		this.changePage(new TestView());
	},

	changePage:function (page,viewName) {
    $(page.el).attr('data-role', 'page');
    $(page.el).attr('data-type', 'view');
    $(page.el).attr('id', viewName);
    page.render();
    $('body').append($(page.el));
    },
})