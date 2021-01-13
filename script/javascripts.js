// JavaScript Document


$(document).ready(function(){

//Larger thumbnail preview 

$("ul.thumb li").hover(function() {
	$(this).css({'z-index' : '10'});
	$(this).find('img').addClass("hover").stop()
		.animate({
			marginTop: '-86px', 
			marginLeft: '-50px', 
			top: '50%', 
			left: '50%', 
			width: '160px', 
			height: '117px',
			padding: '0px' 
		}, 150);
	
	} , function() {
	$(this).css({'z-index' : '0'});
	$(this).find('img').removeClass("hover").stop()
		.animate({
			marginTop: '0', 
			marginLeft: '0',
			top: '0', 
			left: '0', 
			width: '60px', 
			height: '44px', 
			padding: '0px'
		}, 200);
});

/*//Swap Image on Click
	$("ul.thumb li a").click(function() {
		
		var mainImage = $(this).attr("href"); //Find Image Name
		$("#main_view img").attr({ src: mainImage });
		return false;		
	});*/
 
});