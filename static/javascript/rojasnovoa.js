/**
 * [description]
 * @param  {[type]} scope [description]
 * @return {[type]}       [description]
 */
;(function(scope, $){

	scope.RojasNovoa = function(){

		var theFirm = $("#the-firm"),
			theServices = $("#the-services"),
			contactForm = $("#contact-form"),
			header = $("#site-header");

		function loadFonts(complete){
			$.getScript( "https://use.typekit.net/spg6xgx.js" )
			.done(function( script, textStatus ) {
				try{Typekit.load({ async: true });}catch(e){}
				if(complete){
					complete();
				}
			})
			.fail(function( jqxhr, settings, exception ) {
				if(complete){
					complete();
				}
			});
		}

		function whileScrolling(){
			$(window).scroll(function (event) {
				if(theFirm.offset()){
					if($(window).scrollTop()>=theFirm.offset().top && 
						$(window).scrollTop()<theServices.offset().top){
						header.addClass("menu-firm");
						header.removeClass("menu-services");
					} else if ($(window).scrollTop()>=theServices.offset().top){
						header.addClass("menu-services");
					} else {
						header.removeClass("menu-firm");
						header.removeClass("menu-services");
					}
				} else {
					if ($(window).scrollTop()>=theServices.offset().top){
						header.addClass("menu-services");
					} else {
						header.removeClass("menu-services");
					}
				}
			});
		}

		function isValidEmail(email) {
			var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			return re.test(email);
		}


		function checkForm(){
			contactForm.on("submit", function(event){
				var isValid = true;
					message;
				if($.trim($(this.full_name).val()) === ""){
					isValid = false;
					message = "Existe un error en el nombre suministrado.";
					$(this.full_name).addClass("error");
					$(this.full_name).focus();
				} else {
					$(this.full_name).removeClass("error");
				}
				if(isValid && !isValidEmail($(this.email).val())){
					isValid = false;
					message = "Existe un error en el email suministrado.";
					$(this.email).focus();
					$(this.email).addClass("error");
				} else {
					$(this.email).removeClass("error");
				}	
				if(isValid && $.trim($(this.message).val()) === ""){
					isValid = false;
					message = "Existe un error en el message suministrado para saber su inquietud.";
					$(this.message).focus();
					$(this.message).addClass("error");
				} else {
					$(this.message).removeClass("error");
				}
				if (isValid){
					sendForm();
				}
				return isValid;
			});
		}


		function sendForm(){
			$.ajax({
				contentType: 'application/json',
				data: JSON.stringify({

				}),
				dataType: 'json',
				success: function(data){
					console.log(data);
				},
				error: function(){
					console.log('Device control failed');
				},
				type: 'POST',
				url: ''
			});
		}


		(function(){
			whileScrolling();
			checkForm();
			header.find("a").each(function(){
				$(this).on("click", function(event){
					var achor = $(this).attr("href");
					event.preventDefault();
					$("html, body").animate({ scrollTop: $(achor).offset().top - header.height() }, 600);
				});
			});
			loadFonts(function(){
				
			});
		})();

	}();

})(window, jQuery);