function selectForm(form)
{
	$("#select").css("left", "-100%");
	$(form).css("left", "0px");
}

function back()
{
	$("#select").css("left", "0px");
	$("#bug").css("left", "100%");
	$("#suggestion").css("left", "100%");
}