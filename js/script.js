var ingName = ["Bitter Lemon", "Настойка 'Лимонная'", "Вода", "Сок", "Молоко"];
var dimension = ["Стакан", "мл.", "гр.", "л."];
var optionsQuantity = ["1 порция", "2 порции", "3 порции", "4 порции"];
var optionsTime = ["1 минута", "2 минуты", "3 минуты", "4 минуты"];
var optionsComplexity = ["Легкая(1 балл)", "Средняя(6 баллов)", "Сложная(12 баллов)"];
var optionsMethod = ["В шейкере", "В блендере", "В бокале"];
$(document).ready(function(){
	
	
	// --------------------spinner
	$('.spinner-arrows-wrapper').data('counter', -1);
	
	$('.ingredient-name .arrow-up, .ingredient-name .arrow-down').click({array: ingName},changeIngredient);
	$('.dimension .arrow-up, .dimension .arrow-down').click({array: dimension},changeIngredient);
	$('.options-quantity .arrow-up, .options-quantity .arrow-down').click({array: optionsQuantity},changeIngredient);
	$('.options-time .arrow-up, .options-time .arrow-down').click({array: optionsTime},changeIngredient);
	$('.options-complexity .arrow-up, .options-complexity .arrow-down').click({array: optionsComplexity},changeIngredient);
	$('.options-method .arrow-up, .options-method .arrow-down').click({array: optionsMethod},changeIngredient);
	
	function changeIngredient(e){
		var parent = $(this).closest('.spinner-arrows-wrapper');
		var dataCounter = $(parent).data('counter');
		var arr =  e.data.array;
		if($(this).hasClass('arrow-up')){
			dataCounter--;
			if(dataCounter < -1)dataCounter = -1;
		}else if($(this).hasClass('arrow-down')){
			dataCounter++;
			if(dataCounter == arr.length)dataCounter = arr.length-1;	
		}	
		$(parent).data('counter', dataCounter);
		$(parent).prev().val(arr[dataCounter]);
		return false;
	}
	
	
	// --------------------slider
	var sliderZone = $(".slider-zone");
	var sliderThumb = $(".slider-thumb");
	sliderThumb.on('dragstart', function(){ return false; });
	sliderThumb.on('mousedown', onThumbMousedown);
	
	function onThumbMousedown(e){
		var target = e.target;
		
		var thumbCoords =  $(target).position();
		var shiftX = e.pageX - thumbCoords.left;		
		var sliderCoords = sliderZone.position();

		$('body').on('mousemove', onBodyMousemove);
		$('body').on('mouseup', onBodyMouseup);
		
		function onBodyMousemove(e){
			var newLeft = e.pageX - shiftX;
			
			if (newLeft < 0) {
				newLeft = 0;
			}
			
			var rightEdge = sliderZone.outerWidth() -$(target).outerWidth();
			if (newLeft > rightEdge) {
				newLeft = rightEdge;
			 }
			$(target).css('left' , newLeft);
			var sliderElemPos = (newLeft/sliderZone.width()).toFixed(2)*100;
			$(target).closest(".slider").prev().find(".slider-elem").css("left", -sliderElemPos/3 +"%");
		}
		
		function onBodyMouseup(){
			$('body').unbind();
		}
		return false;
	}
	
	
	// --------------------slider arrows
		$(".nextArrow, .prevArrow").on('click', onArrowClick);
		
		function onArrowClick(){
			var sliderThumb = $(this).closest('.slider').find(".slider-thumb");
			var thumbParent = sliderThumb.parent();

			if($(this).hasClass("prevArrow")){				
				if(parseInt(sliderThumb.css("left")) <= 50){
					sliderThumb.css("left", 0);
				}else{
					sliderThumb.css("left", "-=50");
				}				
			}else{
				if(parseInt(sliderThumb.css("left")) >= thumbParent.width() -50){
					sliderThumb.css("left", thumbParent.width() - sliderThumb.outerWidth());
				}else{
					sliderThumb.css("left", "+=50");
				}				
			}
			
			var sliderThumbPos = parseInt(sliderThumb.css("left"));
			$(this).closest('.slider').prev().find(".slider-elem").css("left", -sliderThumbPos/3);
			return false;
		}
		
		
	// --------------------reset button
	$("#resetButton").click(function(){
		$('.spinner-arrows-wrapper').data('counter', 0);
		sliderThumb.css('left', 0);
	});
	
});

$('h1,h2,h3,h4,span,li,label,img,legend, .title').bind('selectstart mousedown',function(){return false;});
$('h1,h2,h3,h4,span,li,label,img,legend, .title').on('mousemove',function(){
	if (window.getSelection) {
	window.getSelection().removeAllRanges();
	} else { 
	document.selection.empty();
	}
});
