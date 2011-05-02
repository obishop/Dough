///////////// Global Variables /////////////

var current_page = 0;
var ingredients = [];
var focuses = []
var meal_types = [];
var excludes = [];


/////////// Pagination Functions ///////////

// Callback on page selection
function pageselectCallback(page_index, jq){
	current_page = page_index;
	try {
		doQuery(ingredients,excludes,focuses,meal_types,current_page+1,false);
	} catch (e) {
		alert(e);
	}
	return false;
}

// Initialization
function initPagination(num_pages) {
	
	$("#Pagination").pagination(num_pages, {
		callback: pageselectCallback,
		items_per_page: 1,
		num_display_entries: 5,
		num_edge_entries:2
	});
	
}


////////// Pop-up Window Function //////////

// Make a pop up window for a recipe
function popup(mylink, windowname){
	if (! window.focus)return true;
	var href;
	if (typeof(mylink) == 'string')
   		href=mylink;
	else
   		href=mylink.href;
	window.open(href, windowname, 'width=800,height=600,scrollbars=yes');
	return false;
}


////////// Recipe Query Functions //////////

// Display the number of recipes found
function displayCount(total_num,make_num) {

	var count_display;
	
	if (total_num == 0)
		count_display = "No recipes were found. Please add more ingredients.";
	else if (total_num == 1)
		count_display = "<b>"+total_num+"</b>"+" recipe found";
	else
		count_display = "<b>"+total_num+"</b>"+" recipes found";
		
	if (make_num > 0)
		count_display += ", and you can make <b>"+make_num+"</b> right now!";
	else if (total_num > 0)
		count_display += ", but you will need a few extra ingredients."
		
	$('#Count').empty().append(count_display);
	$('#Count').append("<hr />");	// Make a divider
	
}

// Display a recipe search result
function displayRecipe(name,url,needed,thumb) {
	
	// Extra foods needed to make the recipe
	var needed_foods;
	if (needed == undefined) {
		needed_foods = "<p><img src='/dough/static/images/valid.png' class='validPic' />"+
					   "<b>You have all the ingredients for this recipe!</b>"+
					   "</p>";
	} else {
		needed_foods = "<p><img src='/dough/static/images/attention.png' class='validPic' />"+
					   "<b>You will also need: </b>"+needed.join(", ")+
					   "</p>";
	}
	
	// Thumbnail image for the recipe
	var recipe_img;
	if (thumb == undefined) {
		recipe_img = "<img class='foodPic' src='http://www.supercook.com/images/search_starter.jpg' alt='"+name+"' />";
	} else {
		recipe_img = "<img class='foodPic' src='http://www.supercook.com"+thumb+"' alt='"+name+"' />";
	}
	
	// Append new recipe
	$('#Results').append("<div class='foodResult'>"+
						 recipe_img +
						 "<div class='foodBody'>"+
						 "<a class='foodHeading' href='"+url+"' onClick='return popup(this,"+'"'+name+'"'+")'>"+name+"</a>"+
						 needed_foods+"</div></div>");
						 
	$('#Results').append("<hr />");	// Make a divider
}

// Perform a recipe query
function doQuery(ingredients,needs,focus_,meal_type,page_,do_init) {
	
	// Assemble a query string to send to www.supercook.com
	var query = $.param({kitchen:ingredients.join('|'),
						 exclude:needs.join('|'),
						 focus:focus_.join('|'),
						 smode:meal_type.join('|'),
						 page:page_});
	
	$.get('http://www.supercook.com/575/main_search.asp?'+query, 
		function(res) { // Success callback function
			
			// Get rid of HTML surrounding the returned object
			var response = res.responseText.slice(149,res.responseText.length-22);
			response = response.replace(/[\s]+/g," ");	// Eliminate illegal whitespace characters
			
			try {
				// Try converting response back into an object
				var o = eval("("+response+")");
			} catch(e) {
				alert("We are experiencing problems due to invalid search results. Please try again later.");
			}
			
			// A new query is being performed, and the pagination & count should be refreshed
			if (do_init) {
			
				displayCount(o.TotalDishes,o.DishesUserCanMake);
				
				if (o.TotalPages > 1)
					initPagination(o.TotalPages);
			}
			
			$('#Results').empty();
			
			for (var i=0;i<o.results.length;i++) {
			
				displayRecipe(o.results[i].Name,o.results[i].URL,o.results[i].Needed,o.results[i].Thumb);
			}
			
		}
	);
	
}


//////////// Document Ready ////////////

$(function() {
	
	//$("#myTable").tableScroll({height:10});
	$("#myTable").dataTable({
		"bJQueryUI":true;
		"bInfo":false;
	});
	
	
	//ingredients = ["butter"];
	
	try {
		
		doQuery(ingredients,excludes,focuses,meal_types,current_page+1,true);
	} catch (e) {
		alert(e);
	}
});
