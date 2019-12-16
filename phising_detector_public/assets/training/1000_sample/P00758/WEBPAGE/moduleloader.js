/* Module loader specifically for use on published pages */
var ModuleLoader = {

    // Because there is no editor.js file on the published side, this loader itself
    // contains the module instances on the page
    moduleInstances: {},

    // Loop through the modules on the page, instantiate each and return them
    instantiateModules: function() {
        var _this = this;

        // Find every module on the page (i.e., divs with the id of "<module type>|<id>"
        $("div[id*='|']").each(function() {
            // Get the module type and id
            var a = $(this).attr('id').split('|');
            var moduleType = a[0];
            var moduleId = a[1];
            _this.moduleInstances[a[1]] = eval("new " + moduleType + "($(this));");
        });

        // Find all addons
        $(".ZBL-ADDON").each(function() {
            var a = $(this).attr('id').split('--');
            var type = a[0];
            var id = a[1];
            if ((id > 0) && (_ZBL_ADDON_OPTIONS[id]))
            {
                eval(type + 'Render($(this), _ZBL_ADDON_OPTIONS[' + id + '])');
            }
        });

        return _this.moduleInstances;
    },

    // Return all of the module instances
    getModuleInstances: function() {
        return this.moduleInstances;
    }
}

// Really useful function for rescoping "this"
var createRef = function(obj, method) {
    return function() {
        method.apply(obj, arguments);
    }
}
