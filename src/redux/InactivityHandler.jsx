import React from 'react';
import { useNavigate } from 'react-router-dom';
import useInactivity from '../hooks/useInactivity'; // Adjust the path as necessary
import axios from 'axios';

const InactivityHandler = ({ children }) => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await axios.post('/api/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            localStorage.removeItem('token');
            navigate('/login'); // use navigate instead of history.push
        }
    };

    useInactivity(logout, 300000); // 300000 ms = 5 minutes

    return (
        <>
            {children}
        </>
    );
};

export default InactivityHandler;
