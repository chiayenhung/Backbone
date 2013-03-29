window.QuestionModel = Backbone.Model.extend({
  urlRoot: '/question',
  initialize: function() {

  }
});

window.QuestionCollection = Backbone.Collection.extend({

model: QuestionModel,


});