// dough.js: main file for dough project

$(function() {

    $("#main-tabs").tabs({
        ajaxOptions: {
            error: function( xhr, status, index, anchor ) {
                $( anchor.hash ).html(
                    "Couldn't load this tab. We'll try to fix this as soon as possible. " +
                    "If this wouldn't be a demo." );
            }
        }
    });

    $("#food-button").button();
    $("#budget-button").button();
    $("#recipes-button").button();

});
