import Swal from "sweetalert2";
import axios from "axios";

const IDLE_TIMEOUT = 8 * 60 * 1000; // 10 minutes
const COUNTDOWN_SECONDS = 120; // 2 minutes
let idleTimer = null;
let countdownTimer = null;
let countdown = COUNTDOWN_SECONDS;
let promptVisible = false;

const getLoginUrl = () => {
	const base = (import.meta.env.BASE_URL || "").replace(/\/?$/, "");
	return `${base}/login`;
};

const doLogout = () => {
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
	const token = sessionStorage.getItem("token");
	sessionStorage.removeItem("token");
	sessionStorage.removeItem("profile");
	sessionStorage.removeItem("roles");
	sessionStorage.removeItem("currentRole");
	sessionStorage.removeItem("accessToken");
	if (token && apiBaseUrl) {
		axios.post(`${apiBaseUrl}/logout`, {}, {
			headers: { Authorization: `Bearer ${token}` },
		}).catch(() => {});
	}
	window.location.href = getLoginUrl();
};

const showIdlePrompt = () => {
	promptVisible = true;
	Swal.fire({
		title: "Are you still active?",
		html: `You will be logged out in <strong id="idle-counter">${COUNTDOWN_SECONDS}</strong> seconds due to inactivity.`,
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "Logout",
		cancelButtonText: "Continue",
		confirmButtonColor: "#b91c1c",
		cancelButtonColor: "#b91c1c",
		allowOutsideClick: false,
		allowEscapeKey: false,
		reverseButtons: true,
		didOpen: () => {
			const counterEl = document.getElementById("idle-counter");
			countdown = COUNTDOWN_SECONDS;
			countdownTimer = setInterval(() => {
				countdown--;
				if (counterEl) counterEl.textContent = countdown;
				if (countdown <= 0) {
					clearInterval(countdownTimer);
					promptVisible = false;
					Swal.close();
					doLogout();
				}
			}, 1000);
		},
	}).then((result) => {
		clearInterval(countdownTimer);
		promptVisible = false;

		if (result.isConfirmed) {
			doLogout();
		} else {
			resetTimer();
		}
	});
};

const resetTimer = () => {
	// Don't reset while the idle prompt is showing - user must click Continue or Logout
	if (promptVisible) return;
	clearTimeout(idleTimer);
	clearInterval(countdownTimer);
	idleTimer = setTimeout(showIdlePrompt, IDLE_TIMEOUT);
};

const boundReset = () => resetTimer();

const setupIdleListener = () => {
	window.addEventListener("load", boundReset);
	window.addEventListener("mousemove", boundReset);
	window.addEventListener("mousedown", boundReset);
	window.addEventListener("touchstart", boundReset);
	window.addEventListener("click", boundReset);
	window.addEventListener("scroll", boundReset, true);
	window.addEventListener("keydown", boundReset);

	resetTimer();

	return () => {
		clearTimeout(idleTimer);
		clearInterval(countdownTimer);
		window.removeEventListener("load", boundReset);
		window.removeEventListener("mousemove", boundReset);
		window.removeEventListener("mousedown", boundReset);
		window.removeEventListener("touchstart", boundReset);
		window.removeEventListener("click", boundReset);
		window.removeEventListener("scroll", boundReset, true);
		window.removeEventListener("keydown", boundReset);
	};
};

export default setupIdleListener;
