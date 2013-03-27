window.HomeView = Backbone.View.extend({
	
	initialize: function () {
		this.template = _.template(tpl.get("home"));
		$(window).on('resize', this.resize);
		// $(document).ready(this.resize());

	},

	render: function (eventName) {
		// console.log($(this.model.models));
		$(this.el).html(this.template());
		
		// $(document).ready(this.resize());
		// console.log(window.app.buildingList.data);
		// for(var item in window.app.buildingList.data){
		// 	$('ul').append('<li>' + item + '</li>');
		// }
		// this.listView = new BuildingListView({el: $('#list', this.el), model: this.model});
        // this.listView.render();
        // console.log($(this.el));
        // $('.left_column').append('<ul></ul>');
        // console.log($('ul'));
		return this;
	},

	events: {
		// "onready document" : "resize",
		"click .addQBtn": "addQBtn",
		"click .surveyBtn" : "startSurvey",
		// "click li" : "darkPanelAction",
		// "click #searchContainer": "closeDarkPanel",
	},

	addQBtn: function(){
		$(this.el).remove();
		return window.location.replace("#addQuestion");
	},

	startSurvey: function(){
		$(this.el).remove();
		return window.location.replace("#startSurvey");
	},

	// closeDarkPanel: function(){
	// 	$('.right_column').hide();
	// 	$('li').removeClass('push_down');
	// 	var browser_width = $(window).width();
	// 	$('.left_column').width(browser_width);
	// },

	// darkPanelAction: function(event){
		
	// 	$('.right_column').show();
	// 	$('li').removeClass('push_down');
	// 	$(event.target).addClass('push_down');
	// 	this.resize();
	// },

	

	// test: function(){
	// 	alert($(".container").height());
	// },

	// resize: function(){
	// 	var browser_width = $(window).width();
	// 	var browser_height = $(window).height();
		
	// 	$(".container").height(browser_height);
	// 	$(".container").width(browser_width);

	// 	var searchBar_height = $("#searchContainer").height();
	
	// 	$('.left_column').height(browser_height - searchBar_height);
	// 	$('.right_column').height(browser_height - searchBar_height);

	// 	var right_column_width = $('.right_column').width();
	// 	$('.left_column').width(browser_width - right_column_width);
	// }


});

window.QuestionListView = Backbone.View.extend({

	initialize:function () {
		// this.bind("reset", this.render, this);
    },

    render:function () {
    	console.log(this.model.models.length);
       // $(this.el).empty();
       // $(this.el).append("<li data-role=list-divider id='chooseCategory'></li>");     
        _.each(this.model.models, function (building) {
        	console.log(this.model.models.length());
            $(this.el).append(new BuildingListItemView({model:building}).render().el);
        }, this);
        // $('#categoryList').listview('refresh');
       // $(this.el).attr('id', 'gamelistItem');
       console.log($(this.el).append('<li>1</li>'));
        return this;
    }
});

window.BuildingListItemView = Backbone.View.extend({

	tagName:"li",

    initialize:function () {
        this.template = _.template('<li> <%= id %> </li>');
        // this.model.bind("change", this.render, this);
        // this.model.bind("destroy", this.close, this);
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        // $(this.el).attr('data-icon','false');
        return this;
    }
});