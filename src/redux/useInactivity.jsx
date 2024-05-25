import { useEffect, useRef } from 'react';

const useInactivity = (onLogout, timeout = 300000) => {
    const timer = useRef(null);

    const resetTimer = () => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(onLogout, timeout);
    };

    useEffect(() => {
        const events = ['mousemove', 'keydown', 'click', 'scroll'];

        const reset = () => resetTimer();

        events.forEach(event => window.addEventListener(event, reset));

        resetTimer(); // Initialize the timer

        return () => {
            events.forEach(event => window.removeEventListener(event, reset));
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
    }, [onLogout, timeout]);

    return resetTimer;
};

export default useInactivity;
