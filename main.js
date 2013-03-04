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
    // var transition = $.mobile.defaultPageTransition;
    //     // We don't want to slide the first page
    //     if (this.firstPage) {
    //         transition = 'none';
    //         this.firstPage = false;
    //     }
    //     $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
    },
})