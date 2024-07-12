import { config } from '../config/Main';
import Swal from "sweetalert2";

const IDLE_TIMEOUT = 30 * 60 * 1000;
const COUNTDOWN_SECONDS = 30;
let idleTimer = null;
let countdownTimer = null;
let countdown = COUNTDOWN_SECONDS;

const backHome = () => {
    Swal.fire({
        title: 'Warning',
        icon: 'warning',
        html: `Your session has expired. You will be logged out in <strong id="counter">${COUNTDOWN_SECONDS}</strong> seconds.`,
        showCancelButton: true,
        confirmButtonText: 'Logout',
        cancelButtonText: 'Cancel',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
            const counter = document.getElementById('counter');
            countdown = COUNTDOWN_SECONDS;
            countdownTimer = setInterval(() => {
                countdown--;
                counter.textContent = countdown;
                if (countdown <= 0) {
                    clearInterval(countdownTimer);
                    Swal.close();
                    window.location.replace(config.intranetUrl);
                }
            }, 1000);
        }
    }).then((result) => {
        clearInterval(countdownTimer);

        if (result.isConfirmed) {
            window.location.replace(config.intranetUrl);
        } else if (result.isDismissed) {
            resetTimer();
        }
    });
};

const resetTimer = () => {
    clearTimeout(idleTimer);
    clearInterval(countdownTimer);
    idleTimer = setTimeout(() => {
        backHome();
    }, IDLE_TIMEOUT);
};

const setupIdleListener = () => {
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer;
    window.ontouchstart = resetTimer;
    window.onclick = resetTimer;
    window.addEventListener('scroll', resetTimer, true);

    resetTimer();
};

export default setupIdleListener;
