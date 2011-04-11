// dough.js: main file for dough project

$(function() {
    var tabs_top = $("#main-tabs").position().top;
    var total_height = $("html").height();
    $("#main-tabs").css("height",(total_height - tabs_top - 50)+"px");

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
    
    $("#percent-progress-home").progressbar({value:13.8});
    $("#budget-progress-spent-home").html(41.27);
});
