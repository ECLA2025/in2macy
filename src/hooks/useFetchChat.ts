import { useState } from 'react';
import { Message } from '../types/auth.types';

interface ChatError {
  message: string;
  code?: string;
  status?: number;
}

export const useFetchChat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatError | null>(null);

  const fetchChat = async (threadID:string): Promise<Message[] | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem('accessToken');
      console.log(accessToken)

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/messages/${threadID}/`, 
        // '/api/users/search/', 
        {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${accessToken}`,
        }
      });

      const data = await response.json();
      const messages: Message[] = [];
      data.map((response: Message) => (
              messages.push({
              id: response.id,
                message: response.message,
                file: null,
                is_read: response.is_read,
                timestamp: new Date(response.timestamp),
                thread: response.thread,
                sender: response.sender,
                reciever: response.reciever,
            })));

      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      return messages

    } catch (error) {
        console.log(error);
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
    fetchChat,
    isLoading,
    error,
    clearError
  };
};