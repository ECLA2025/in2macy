import { useState } from 'react';
import { Thread } from '../types/auth.types';

interface ChatError {
  message: string;
  code?: string;
  status?: number;
}

export const useFetchThreads = () => {
  const [threadsAreLoading, setThreadsAreLoading] = useState(false);
  const [error, setError] = useState<ChatError | null>(null);

  const fetchThreads = async (): Promise<Thread[] | null> => {  
    setThreadsAreLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem('accessToken');
      console.log(accessToken)

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/threads/`, 
        // '/api/users/search/', 
        {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${accessToken}`,
        }
      });

      const userID = await fetch(
        `${import.meta.env.VITE_API_URL}/api/get-user-id/`, 
        // '/api/users/search/', 
        {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${accessToken}`,
        }
      });
      const userData = await userID.json();
      localStorage.setItem("userData", JSON.stringify(userData));
      console.log(userData)
      console.log(localStorage.getItem("userData"), "Na Setup")

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      const threads: Thread[] = [];
      data.map((response: Thread) => (
              threads.push({
              id: response.id,
              user1: response.user1,
              user2: response.user2,  // Assuming the messages are from the server, set is_user to false
              last_message_timestamp: new Date(response.last_message_timestamp!),  // Set timestamp for each message
            })));
            console.log(threads, "Aha")

      return threads

    } catch (error) {
        console.log(error);
      const chatError: ChatError = {
        message: error instanceof Error ? error.message : 'An unknown error occurred',
        status: error instanceof Response ? error.status : undefined
      };
      
      setError(chatError);
      return null;

    } finally {
      setThreadsAreLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    fetchThreads,
    threadsAreLoading,
    error,
    clearError
  };
};