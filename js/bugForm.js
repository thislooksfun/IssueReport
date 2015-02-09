function registerInputs()
{
	var func = function() { Checkers.checkAll(); };
	//Name
	$("#bugForm #name").keyup(func).focus(func).blur(func);
	
	//Body
	$("#bugForm #body").keyup(func).focus(func).blur(func);
	
	//File
	var func2 = function() {
		switchFileType(this);
		Checkers.checkAll();
	}
	$("#bugForm #link, #bugForm #file").click(func2);
	$("#bugForm #noLog").click(func);
	$("#bugForm #crashFile").change(func);
	$("#bugForm #crashUrl").keyup(func).focus(func).blur(func);
	
	Checkers.checkAll();
}

function switchFileType(obj)
{
	if ($(obj).val() == "file")
	{
		$("#bugForm #crashFile").css("display", "");
		$("#bugForm #crashUrl").css("display", "none");
	} else
	{
		$("#bugForm #crashFile").css("display", "none");
		$("#bugForm #crashUrl").css("display", "");
	}
}

var URLMatch = /^[-a-zA-Z0-9:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?(\?([-a-zA-Z0-9@:%_\+.~#?&//=]+)|)$/;

var Checkers = {
	checkName: function()
	{
		var name = $("#bugForm #name");
		if (this.checkBlank(name))
		{
			name.removeClass("success errorSpaces").addClass("error errorBlank");
			return false;
		} else if (this.checkSpaces(name))
		{
			name.removeClass("success errorBlank").addClass("error errorSpaces");
			return false;
		} else
		{
			name.removeClass("error errorBlank errorSpaces").addClass("success");
			return true;
		}
	},
	checkBody: function()
	{
		var body = $("#bugForm #body");
		if (this.checkBlank(body)) {
			body.removeClass("success errorSpaces").addClass("error errorBlank");
			return false;
		} else if (this.checkSpaces(body))
		{
			body.removeClass("success errorBlank").addClass("error errorSpaces");
			return false;
		} else
		{
			body.removeClass("error errorBlank errorSpaces").addClass("success");
			return true;
		}
	},
	checkFile: function()
	{
		var container = $("#bugForm #crashReport");
		
		if ($("#bugForm #noLog").is(":checked"))
		{
			container.removeClass("error").addClass("success");
			return true;
		}
		
		var selected = $('#bugForm input[type=radio]:checked').val();
		var file = $("#crashFile");
		var url = $("#crashUrl");
		
		if (selected == "file")
		{
			if (this.checkBlank(file))
			{
				container.removeClass("success errorSpaces").addClass("error errorBlank");
				return false;
			} else if (this.checkSpaces(file))
			{
				container.removeClass("success errorBlank").addClass("error errorSpaces");
				return false;
			} else
			{
				container.removeClass("error errorBlank errorSpaces").addClass("success");
				return true;
			}
		} else
		{
			if (this.checkBlank(url))
			{
				container.removeClass("success errorSpaces errorUrlFormat").addClass("error errorBlank");
				return false;
			} else if (this.checkSpaces(url))
			{
				container.removeClass("success errorBlank errorUrlFormat").addClass("error errorSpaces");
				return false;
			} else if (!URLMatch.test(url.val()))
			{
				container.removeClass("success errorBlank errorSpaces").addClass("error errorUrlFormat");
				return false;
			} else
			{
				container.removeClass("error errorBlank errorSpaces errorUrlFormat").addClass("success");
				return true;
			}
		}
	},
	checkBlank: function(obj) {
		return $(obj).val() == "";
	},
	checkSpaces: function(obj) {
		return ((typeof obj.val() == "string" || obj.val() instanceof String) && /^\s+$/.test($(obj).val()));
	},
	checkAll: function(obj)
	{
		var name = this.checkName();
		var body = this.checkBody();
		var file = this.checkFile();
		var success = name && body && file;
		if (success) {
			$("#bugForm #submitBtn").removeClass("error").addClass("success").attr('disabled','disabled');
		} else {
			$("#bugForm #submitBtn").removeClass("success").addClass("error").removeAttr('disabled');
		}
	}
};

/*
function checkInput(obj)
{
	if ($(obj).val() == "" || /^ .*$/.test($(obj).val()))
	{
		//TODO More/better checks
		
		$(obj).addClass("error");
		$(obj).addClass("errorBlank");
		
		$($(obj).closest("form").data("submit")).addClass("error");
		
		return false;
	} else {
		$(obj).addClass("success");
		return true;
	}
}
*/

function submitBug()
{
	var bugForm = $('#bugForm');
	console.log("Submitting bug!");
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
	console.log("Submitting suggestion!");
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

$(registerInputs);