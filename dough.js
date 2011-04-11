// dough.js: main file for dough project

$(function() {
    onWindowResize();
    $(window).resize(onWindowResize);

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

var onWindowResize = function() {
    var tabs_top = $("#main-tabs").position().top;
    var total_height = $("html").height();
    // This is a really crappy way of doing this... find something that works better
    $("#main-tabs").css("height",(total_height - 120)+"px");
}
