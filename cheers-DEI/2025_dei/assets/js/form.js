//SF
// 勾同意填資料
$("body").on("change", "#policy", function () {
	if ($("#policy").is(":checked")) {
		$(".checkbox .error").removeClass("show");
		$("#00N2w00000Hh3Kk").val("A版");
		$("#00N2w00000Hh3NF").val("同意");
	} else {
		$(".checkbox .error").addClass("show");
		$("#00N2w00000Hh3Kk").val("");
		$("#00N2w00000Hh3NF").val("");
	}
});
// jquery預填活動類型
$("#00N2w00000Hh3MW").val("");
// 取得日期
var d = new Date();
var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
// console.log("現在是"+strDate);
$("#00N2w00000Hh3C1").val(strDate);

// 檢查email
$("body").on("change", "#email", function () {
	$Emailchecking = IsEmail($("#email").val());
	// $('#last_name').val($('#email').val())
	if ($Emailchecking == false) {
		$(".error.blank").removeClass("show");
		$(".error.wrong").addClass("show");
		$("#email").blur();
	} else {
		$(".error.wrong").removeClass("show");
		$("#email").blur();
	}
});
// 填寫時移除error
$("#company").focus(function () {
	$(".errorCompany,.errorSubmit").removeClass("show");
});
$("#last_name").focus(function () {
	$(".errorName,.errorSubmit").removeClass("show");
});
$(".department").focus(function () {
	$(".errorDepartment,.errorSubmit").removeClass("show");
});
$(".position").focus(function () {
	$(".errorPosition,.errorSubmit").removeClass("show");
});
$("#phone").focus(function () {
	$(".errorPhone,.errorSubmit").removeClass("show");
});
$("#mobile").focus(function () {
	$(".errorMobile,.errorSubmit").removeClass("show");
});
$("#00N2w00000Hh3Mv1").focus(function () {
	$(".errorFood,.errorSubmit").removeClass("show");
});
$("#00N2w00000Hh3Mv2").focus(function () {
	$(".errorFood,.errorSubmit").removeClass("show");
});
$("#email").focus(function () {
	$(".errorMail,.errorSubmit").removeClass("show");
	$(".error.blank").removeClass("show");
});

function IsEmail(email) {
	var regex =
		/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (!regex.test(email)) {
		return false;
	} else {
		return true;
	}
}
$("#sendBtn").click(function () {
	var status = true;
	var company = $("#company").val();
	var last_name = $("#last_name").val();
	var department = $(".department").val();
	var position = $(".position").val();
	var phone = $("#phone").val();
	var mobile = $("#mobile").val();
	var food = $("#00N2w00000Hh3Mv1").val();
	var food2 = $("#00N2w00000Hh3Mv2").val();
	var email = $("#email").val();
	var policy = $("#policy").val();
	$Emailchecking2 = IsEmail($("#email").val());

	if ($Emailchecking2 == false && email !== "") {
		status = false;
		$(".error.blank").removeClass("show").removeClass("flash");
		$(".error.wrong").addClass("flash").addClass("flash");
	} else {
		$(".error.wrong").removeClass("show").removeClass("flash");
	}
	if (email == "") {
		$(".error.blank").addClass("show").addClass("flash");
		status = false;
	} else {
		$(".error.blank").removeClass("show").removeClass("flash");
	}
	if (!$("#policy").is(":checked")) {
		$(".checkbox .error").addClass("show").addClass("flash");
		status = false;
	} else {
		$(".checkbox .error").removeClass("show").removeClass("flash");
	}

	if (
		status &&
		email !== "" &&
		food !== "" &&
		mobile !== "" &&
		phone !== "" &&
		last_name !== "" &&
		company !== "" &&
		position !== "" &&
		department !== ""
	) {
		$("#sfBtn").click();
		$(".sf_form").hide();
		$(".tks").show();
	} else {
		if (food == "" || food2 == "") {
			$(".errorFood,.errorSubmit").addClass("show").addClass("flash");
		}
		if (mobile == "") {
			$(".errorMobile,.errorSubmit").addClass("show").addClass("flash");
		}
		if (phone == "") {
			$(".errorPhone,.errorSubmit").addClass("show").addClass("flash");
		}
		if (last_name == "") {
			$(".errorName,.errorSubmit").addClass("show").addClass("flash");
		}
		if (company == "") {
			$(".errorCompany,.errorSubmit").addClass("show").addClass("flash");
		}
		if (position == "") {
			$(".errorPosition,.errorSubmit").addClass("show").addClass("flash");
		}
		if (department == "") {
			$(".errorDepartment,.errorSubmit").addClass("show").addClass("flash");
		}
		if (!$("#policy").is(":checked")) {
			$(".checkbox .errorPolicy,.errorSubmit")
				.addClass("show")
				.addClass("flash");
		}
		return false;
	}
});
(
	//

	function () {
		window["__CF$cv$params"] = {
			r: "646d4229f9325700",
			m: "84a8cde03fec323d9c09a67b8c0d009cfabf1d5f-1619581114-1800-AY9+a3LHVqfBydcK+wmNmLC5QGnSLMAqqj/a7f5g3Oqa7SZl3G+CZQt8gRzbRrHL1md2OEGoXopjuoJ57n9e8HySQl/suBfXmJcgZLbIcxtQUiwGYF446K1fCOn+81be0BrEO5VFEN8L8TVAhzzVsDE=",
			s: [0xd79daa604f, 0xb840088acf],
		};
	}
)();
