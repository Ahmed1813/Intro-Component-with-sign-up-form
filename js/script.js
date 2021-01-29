const firstName = $("#firstName");
const fisrtspan = $("<span></span>").text("First Name cannot be empty");
const lastName = $("#lastName");
const lastspan = $("<span></span>").text("Last Name cannot be empty");
const email = $("#email");
const emailspan = $("<span></span>").text("Looks like this is not an email");
const password = $("#password");
const passwordspan = $("<span></span>").text("Password cannot be empty");
const form = $(".form-container");

const length = val => {
	let len = 0;
	for (let char of val) {
		if (char != " ") len++;
	}
	return len;
};

const expandForm = () => {
	form.addClass("expand");
};

const shrinkForm = () => {
	form.removeClass("expand");
};

const makeInvalid = (child, span) => {
	// if (!$("main").hasClass("expand")) $("main").addClass("expand");
	child.parent().addClass("invalid");
	child.parent().append(span);
};

const makeValid = (child, span) => {
	// if ($("main").hasClass("expand")) $("main").removeClass("expand");
	// const hasClass = child.parent().hasClass("invalid");
	// if (hasClass) {
	child.parent().removeClass("invalid");
	span.remove();
	// }
};

const validateName = () => {
	let val = firstName.val();
	if (length(val) < 1) {
		makeInvalid(firstName, fisrtspan);
	} else {
		makeValid(firstName, fisrtspan);
	}

	val = lastName.val();
	if (length(val) < 1) {
		makeInvalid(lastName, lastspan);
	} else {
		makeValid(lastName, lastspan);
		return true;
	}
	return false;
};

const validateEmail = () => {
	const regex = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9\-]+)\.([a-zA-Z]{2,20})$/;
	const val = email.val();
	if (length(val) < 1) {
		makeInvalid(email, emailspan.text("Email Address cannot be empty"));
	} else if (!regex.test(val)) {
		makeInvalid(email, emailspan.text("Looks like this is not an email"));
	} else {
		makeValid(email, emailspan);
		return true;
	}
	return false;
};

const validatePassword = () => {
	let val = password.val();
	if (length(val) < 1) {
		makeInvalid(password, passwordspan.text("Password cannot be empty"));
	} else if (length(val) < 8) {
		makeInvalid(
			password,
			passwordspan.text("Password must be 8 characters long")
		);
	} else {
		makeValid(password, passwordspan);
		return true;
	}
	return false;
};

$("button.smb").click(ev => {
	ev.preventDefault();
	const name = validateName();
	const emal = validateEmail();
	const pass = validatePassword();

	if (!(name && emal && pass)) {
		expandForm();
	} else {
		shrinkForm();
	}

	// Uncomment following line if you specify action in form
	// if (name && email && pass) $("form").submit();
});

firstName.keyup(validateName);
lastName.keyup(validateName);
email.keyup(validateEmail);
password.keyup(validatePassword);
