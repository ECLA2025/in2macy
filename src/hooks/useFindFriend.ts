import { useState } from 'react';
import { User } from '../types/auth.types';

interface ChatError {
  message: string;
  code?: string;
  status?: number;
}

export const useFindFriend = () => {
  const [isLooking, setIsLooking] = useState(false);
  const [error, setError] = useState<ChatError | null>(null);

  const findFriend = async (username: string): Promise<User[] | null> => {
    setIsLooking(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem('accessToken');
      console.log(accessToken)
      
      if (!username.trim()) {
        throw new Error('Message cannot be empty');
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/search/?q=${username}`, 
        // '/api/users/search/', 
        {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${accessToken}`,
        }
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      return data.results

    } catch (error) {
        console.log(error);
      const chatError: ChatError = {
        message: error instanceof Error ? error.message : 'An unknown error occurred',
        status: error instanceof Response ? error.status : undefined
      };
      
      setError(chatError);
      return null;

    } finally {
      setIsLooking(false);
    }
  };

  const clearError = () => setError(null);

  return {
    findFriend,
    isLooking,
    error,
    clearError
  };
};