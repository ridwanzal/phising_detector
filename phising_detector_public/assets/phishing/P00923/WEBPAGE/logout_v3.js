function logout(exitPage) {
	document.location.href = "ibm_security_logout?logoutExitPage="
			+ escape(exitPage);
}

function logoutWithNoExitPage() {
	logout('images/1pixel.gif');
}
