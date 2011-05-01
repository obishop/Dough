// dough.js: main file for dough project

var setupTabReload = function(event, ui) {
    $('#reload-tab-cb', ui.panel).change(function() {
        $(ui.panel).load(this.name, function() {
            setupTabReload(event, ui);    
        });
        return false;
    });
}

$(function() {
    onWindowResize();
    $(window).resize(onWindowResize);

    var start_tab = tabIndexFromHash();
    $("#main-tabs").tabs({
        'select': function() {
            $(this).index($(document.location.hash));   
        },
        'show': function(event, ui){
            document.location.hash = ui.panel.id;
        },

        load: setupTabReload,

        ajaxOptions: {
            error: function( xhr, status, index, anchor ) {
                $( anchor.hash ).html(
                    "Couldn't load this tab. We'll try to fix this as soon as possible. " +
                    "If this wouldn't be a demo." );
            }
        }
    });
    $("#main-tabs").tabs("select",start_tab);

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

var tabIndexFromHash = function() {
    var hash = document.location.hash;
    var index = 0;
    if (hash == "#food") index = 1;
    if (hash == "#budget") index = 2;
    if (hash == "#recipes") index = 3;
    return index;
}

