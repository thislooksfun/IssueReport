function selectForm(form)
{
	$(form).css("left", "0px");
}

function back()
{
	$("#bug").css("left", "100%");
	$("#suggestion").css("left", "100%");
}

function submitBug()
{
	var bugForm = $('#bugForm');
	/*$.ajax({
		type: "POST",
		url: bugForm.attr('action'),
		data: bugForm.serialize(),
		success: function(response) {
        	console.log(response);
      	}
	});*/
	return false;
}

function submitSuggestion()
{
	var suggestionForm = $('#suggestionForm');
	/*$.ajax({
		type: "POST",
		url: suggestionForm.attr('action'),
		data: suggestionForm.serialize(),
		success: function(response) {
        	console.log(response);
      	}
	});*/
	return false;
}