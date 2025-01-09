import { useState } from 'react';
import { Thread } from '../types/auth.types';

interface Friend {
  user2_id: string;
}

interface ChatError {
  message: string;
  code?: string;
  status?: number;
}

export const useStartChatFriend = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatError | null>(null);

  const startChat = async (user2_id: string): Promise<Thread | null> =>  {
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem('accessToken');
      console.log(accessToken)

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/start-chat/`, 
        // '/api/start-chat/', 
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${accessToken}`,
        },
        body: JSON.stringify({ 
          user2_id
        } as Friend),
      });

      const data = await response.json();
      const thread: Thread = {id: data.thread_id, status: data.status}

      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      return thread;

    } catch (error) {
      console.log(error)
      const chatError: ChatError = {
        message: error instanceof Error ? error.message : 'An unknown error occurred',
        status: error instanceof Response ? error.status : undefined
      };
      
      setError(chatError);
      return null;

    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    startChat,
    isLoading,
    error,
    clearError
  };
};