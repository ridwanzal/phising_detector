/* Module class specifically for use on published pages. */
var Module = $.inherit({
    __constructor: function(elem) {
        this.element = elem;
        this.container = elem;
        this.isPublished = true;

        // Get the module type and id from the module div
        var divInfo = this.element.attr('id').split('|');
        this.type = divInfo[0];
        this.id = divInfo[1];

        // The initialize function is called only on published pages. It provides a 
        // way for published pages to gain access to post-publish ajax functionality (such as
        // calling other javascript functions that retrieve options from a database).
        this.initialize();
    },

    getModuleId: function() {
        return this.id;
    },

    // This is a stub function so we don't produce an error in the case where a published module
    // has no initialize function for use on published pages.
    initialize: function() { },


    /* Used to make an AJAX call to the ajax.php script
     * action The action to be taken in relation to this module
     * jsonData A JSON object that contains values to pass to the ajax.php script
     * callbackFunc A callback function to be performed when the ajax operation has finished
     */
    ajaxPost: function(action, jsonData, callbackFunc) {

        var instanceId = this.id;

        // Where to send the ajax post
        var fullAjaxUrl = '/_zbl.ajax'  + "?m=" + instanceId + (action ? "&a=" + action : "");

        $.post(fullAjaxUrl, jsonData,
            function (data, textSuccess) {
                (callbackFunc || $.noop)(data);
            }, "json"
        );
    }
});
