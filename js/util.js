tpl = {

    // Hash of preloaded templates for the app
    templates: {},

    // Recursively pre-load all the templates for the app.
    // This implementation should be changed in a production environment. All the template files should be
    // concatenated in a single file.
    loadTemplates: function(names, callback) {
        try {
            var that = this;

            var loadTemplate = function(index) {
                    var name = names[index];
                    // console.log('Loading template: ' + name);
                    $.get('templates/' + name + '.html', function(data) {
                        
                        var tmpl_string;
                        $.ajax({
                            url: 'templates/' + name + '.html',
                            method: 'GET',
                            dataType: 'text',
                            async: false,
                            success: function(data) {
                                tmpl_string = data;
                            }
                        });
                        that.templates[name] = tmpl_string;
                        index++;
                        if (index < names.length) {
                            loadTemplate(index);
                        } else {
                            callback();
                        }
                    });
                }

            loadTemplate(0);
        } catch (e) {
          
        }
    },

    // Get template by name from hash of preloaded templates
    get: function(name) {
        return this.templates[name];
    }
};