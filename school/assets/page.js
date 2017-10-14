// smooth scroll to header ###################################################################################################
$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

	// Make sure this.hash has a value before overriding default behavior
	if (this.hash !== "") {
	  // Prevent default anchor click behavior
	  event.preventDefault();

	  // Store hash
	  var hash = this.hash;

	  // Using jQuery's animate() method to add smooth page scroll
	  // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
	  $('html, body').animate({
		scrollTop: $(hash).offset().top
	  }, 2000, function(){

		// Add hash (#) to URL when done scrolling (default click behavior)
		window.location.hash = hash;
	  });
	} // End if
  });
});

// on scroll  show button #####################################################################################################
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
	if (document.body.scrollTop > 900 || document.documentElement.scrollTop > 900) {
		$("#topButton").removeClass("animated bounceOutRight");
		$("#topButton").addClass("animated bounceInRight");
		$("#topButton").show();
	} else {
		$("#topButton").removeClass("animated bounceInRight");
		$("#topButton").addClass("animated bounceOutRight");
	}
}

function sleep(delay) {
	var start = new Date().getTime();
	while (new Date().getTime() < start + delay);
}