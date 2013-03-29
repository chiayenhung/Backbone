window.QuestionModel = Backbone.Model.extend({
  urlRoot: '/question',

  defaults: {
    type:  "question",
    content:     "raw question",
    questions:    [],
  },

  initialize: function() {

  },
});

window.QuestionSet = Backbone.Model.extend({

// model: QuestionModel,
});

window.QuestionCollection = Backbone.Collection.extend({

model: QuestionSet,


});



window.AnswerCollection = Backbone.Collection.extend({

model: QuestionModel,
});