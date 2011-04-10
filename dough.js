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
    $("#food-button").click(function(){
        $("#main-tabs").tabs("option","selected",1); 
    });
    $("#budget-button").button();
    $("#budget-button").click(function(){
        $("#main-tabs").tabs("option","selected",2); 
    });
    $("#recipes-button").button();
    $("#recipes-button").click(function(){
        $("#main-tabs").tabs("option","selected",3); 
    });
});
