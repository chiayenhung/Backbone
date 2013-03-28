window.QuestionModel = Backbone.Model.extend({
  urlRoot: '/user',
  initialize: function() {

  }
});

window.QuestionCollection = Backbone.Collection.extend({

model: QuestionModel,


});