import { useEffect } from 'react';

const useActivityDetector = () => {
    useEffect(() => {
        let activityTimeout;
        const resetActivityTimeout = () => {
            clearTimeout(activityTimeout);
            activityTimeout = setTimeout(() => {
                sendKeepAlive();
            }, 4 * 60 * 1000); // 4 minutes
        };

        const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

        activityEvents.forEach(event => {
            window.addEventListener(event, resetActivityTimeout);
        });

        return () => {
            activityEvents.forEach(event => {
                window.removeEventListener(event, resetActivityTimeout);
            });
            clearTimeout(activityTimeout);
        };
    }, []);
};

export default useActivityDetector;
