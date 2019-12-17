jqReady(function (){
	jQuery(".slides>.next").live("click",function(e){
		e.preventDefault();
		intCpdAD10093>=4?intCpdAD10093 = 1: intCpdAD10093= intCpdAD10093+1;
		showCpdAD10093(intCpdAD10093,"left");
	});
	jQuery(".slides>.prev").live("click",function(e){
	e.preventDefault();
		intCpdAD10093==1?intCpdAD10093 = 4:  intCpdAD10093 = intCpdAD10093 - 1;
		showCpdAD10093(intCpdAD10093,"right");
	});
});

