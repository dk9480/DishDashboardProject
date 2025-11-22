// frontend/src/hooks/useRealTime.js
import { useEffect } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

export const useRealTime = (onDishUpdate) => {
    useEffect(() => {
        
        // This ensures the connection is properly managed with the component's lifecycle
        const socket = io(SOCKET_URL); 
        
        socket.on('connect', () => {
            console.log('✅ Socket connected successfully!');
        });

        // Listener for the 'dishUpdate' event emitted from the server (Task 4)
        socket.on('dishUpdate', (updatedDishData) => {
            onDishUpdate(updatedDishData);
        });

        // Cleanup: Disconnect the socket when the component unmounts
        return () => {
            socket.off('dishUpdate');
            socket.disconnect();
        };
    }, [onDishUpdate]); // dependency on onDishUpdate is good practice
};