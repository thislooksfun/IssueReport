function registerInputs()
{
	$(".errorMsg").css("opacity", "0");
	
	var bugCheck = function() { BugCheckers.checkAll(); };
	$("#bugForm #name, #bugForm #body, #bugForm #crashUrl").keyup(bugCheck).focus(bugCheck).blur(bugCheck);
	$("#bugForm #link, #bugForm #file").click(function() {
		switchFileType(this);
		BugCheckers.checkAll();
	});
	$("#bugForm #noLog").click(bugCheck);
	$("#bugForm #crashFile").change(bugCheck);
	
	var suggestCheck = function() { SuggestCheckers.checkAll(); };
	$("#suggestForm #name, #suggestForm #body").keyup(suggestCheck).focus(suggestCheck).blur(suggestCheck);
	
	BugCheckers.checkAll();
	SuggestCheckers.checkAll();
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
		$("#bugForm #crashUrl").css("display", "").focus();
	}
}

var URLMatch = /^[-a-zA-Z0-9:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?(\?([-a-zA-Z0-9@:%_\+.~#?&//=]+)|)$/;

var BugCheckers = {
	checkName: function()
	{
		var name = $("#bugForm #name");
		
		if (this.checkBlank(name))
		{
			name.removeClass("success").addClass("error");
			$("#bugForm #nameErrors .blank").css("opacity", "1");
			$("#bugForm #nameErrors .space").css("opacity", "0");
			return false;
		} else if (this.checkSpaces(name))
		{
			name.removeClass("success").addClass("error");
			$("#bugForm #nameErrors .blank").css("opacity", "0");
			$("#bugForm #nameErrors .space").css("opacity", "1");
			return false;
		} else
		{
			name.removeClass("error").addClass("success");
			$("#bugForm #nameErrors .blank").css("opacity", "0");
			$("#bugForm #nameErrors .space").css("opacity", "0");
			return true;
		}
	},
	checkBody: function()
	{
		var body = $("#bugForm #body");
		
		if (this.checkBlank(body))
		{
			body.removeClass("success").addClass("error");
			$("#bugForm #bodyErrors .blank").css("opacity", "1");
			$("#bugForm #bodyErrors .space").css("opacity", "0");
			return false;
		} else if (this.checkSpaces(body))
		{
			body.removeClass("success").addClass("error");
			$("#bugForm #bodyErrors .blank").css("opacity", "0");
			$("#bugForm #bodyErrors .space").css("opacity", "1");
			return false;
		} else
		{
			body.removeClass("error").addClass("success");
			$("#bugForm #bodyErrors .blank").css("opacity", "0");
			$("#bugForm #bodyErrors .space").css("opacity", "0");
			return true;
		}
	},
	checkFile: function()
	{
		var container = $("#bugForm #crashReport");
		
		if ($("#bugForm #noLog").is(":checked"))
		{
			container.removeClass("error").addClass("success");
			$("#bugForm #fileErrors .file.blank").css("opacity", "0");
			$("#bugForm #fileErrors .url.blank").css("opacity", "0");
			$("#bugForm #fileErrors .space").css("opacity", "0");
			$("#bugForm #fileErrors .urlFormat").css("opacity", "0");
			return true;
		}
		
		var selected = $('#bugForm input[type=radio]:checked').val();
		var file = $("#crashFile");
		var url = $("#crashUrl");
		
		if (selected == "file")
		{
			if (this.checkBlank(file))
			{
				container.removeClass("success").addClass("error");
				$("#bugForm #fileErrors .file.blank").css("opacity", "1");
				$("#bugForm #fileErrors .url.blank").css("opacity", "0");
				$("#bugForm #fileErrors .space").css("opacity", "0");
				$("#bugForm #fileErrors .urlFormat").css("opacity", "0");
				return false;
			} else
			{
				container.removeClass("error").addClass("success");
				$("#bugForm #fileErrors .file.blank").css("opacity", "0");
				$("#bugForm #fileErrors .url.blank").css("opacity", "0");
				$("#bugForm #fileErrors .space").css("opacity", "0");
				$("#bugForm #fileErrors .urlFormat").css("opacity", "0");
				return true;
			}
		} else
		{
			if (this.checkBlank(url))
			{
				container.removeClass("success").addClass("error");
				$("#bugForm #fileErrors .file.blank").css("opacity", "0");
				$("#bugForm #fileErrors .url.blank").css("opacity", "1");
				$("#bugForm #fileErrors .space").css("opacity", "0");
				$("#bugForm #fileErrors .urlFormat").css("opacity", "0");
				return false;
			} else if (this.checkSpaces(url))
			{
				container.removeClass("success").addClass("error");
				$("#bugForm #fileErrors .file.blank").css("opacity", "0");
				$("#bugForm #fileErrors .url.blank").css("opacity", "0");
				$("#bugForm #fileErrors .space").css("opacity", "1");
				$("#bugForm #fileErrors .urlFormat").css("opacity", "0");
				return false;
			} else if (!URLMatch.test(url.val()))
			{
				container.removeClass("success").addClass("error");
				$("#bugForm #fileErrors .file.blank").css("opacity", "0");
				$("#bugForm #fileErrors .url.blank").css("opacity", "0");
				$("#bugForm #fileErrors .space").css("opacity", "0");
				$("#bugForm #fileErrors .urlFormat").css("opacity", "1");
				return false;
			} else
			{
				container.removeClass("error").addClass("success");
				$("#bugForm #fileErrors .file.blank").css("opacity", "0");
				$("#bugForm #fileErrors .url.blank").css("opacity", "0");
				$("#bugForm #fileErrors .space").css("opacity", "0");
				$("#bugForm #fileErrors .urlFormat").css("opacity", "0");
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
	checkAll: function()
	{
		var name = this.checkName();
		var body = this.checkBody();
		var file = this.checkFile();
		var success = name && body && file;
		if (success) {
			$("#bugForm #submitBtn").removeClass("error").addClass("success").removeAttr("disabled").parent().find(".disableMask").removeClass("disabled");
		} else {
			$("#bugForm #submitBtn").removeClass("success").addClass("error").attr("disabled","disabled").parent().find(".disableMask").addClass("disabled");
		}
		return success;
	}
};

var SuggestCheckers = {
	checkName: function()
	{
		var name = $("#suggestForm #name");
		
		if (this.checkBlank(name))
		{
			name.removeClass("success").addClass("error");
			$("#suggestForm #nameErrors .blank").css("opacity", "1");
			$("#suggestForm #nameErrors .space").css("opacity", "0");
			return false;
		} else if (this.checkSpaces(name))
		{
			name.removeClass("success").addClass("error");
			$("#suggestForm #nameErrors .blank").css("opacity", "0");
			$("#suggestForm #nameErrors .space").css("opacity", "1");
			return false;
		} else
		{
			name.removeClass("error").addClass("success");
			$("#suggestForm #nameErrors .blank").css("opacity", "0");
			$("#suggestForm #nameErrors .space").css("opacity", "0");
			return true;
		}
	},
	checkBody: function()
	{
		var body = $("#suggestForm #body");
		
		if (this.checkBlank(body))
		{
			body.removeClass("success").addClass("error");
			$("#suggestForm #bodyErrors .blank").css("opacity", "1");
			$("#suggestForm #bodyErrors .space").css("opacity", "0");
			return false;
		} else if (this.checkSpaces(body))
		{
			body.removeClass("success").addClass("error");
			$("#suggestForm #bodyErrors .blank").css("opacity", "0");
			$("#suggestForm #bodyErrors .space").css("opacity", "1");
			return false;
		} else
		{
			body.removeClass("error").addClass("success");
			$("#suggestForm #bodyErrors .blank").css("opacity", "0");
			$("#suggestForm #bodyErrors .space").css("opacity", "0");
			return true;
		}
	},
	checkBlank: function(obj) {
		return $(obj).val() == "";
	},
	checkSpaces: function(obj) {
		return ((typeof obj.val() == "string" || obj.val() instanceof String) && /^\s+$/.test($(obj).val()));
	},
	checkAll: function()
	{
		var name = this.checkName();
		var body = this.checkBody();
		var success = name && body;
		if (success) {
			$("#suggestForm #submitBtn").removeClass("error").addClass("success").removeAttr('disabled').parent().find(".disableMask").removeClass("disabled");
		} else {
			$("#suggestForm #submitBtn").removeClass("success").addClass("error").attr('disabled','disabled').parent().find(".disableMask").addClass("disabled");
		}
		
		return success;
	}
};

function submitBug()
{
	if (!BugCheckers.checkAll())
		return false;
	
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
	if (!SuggestCheckers.checkAll())
		return false;
	
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