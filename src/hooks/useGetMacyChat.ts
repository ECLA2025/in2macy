import { useState, useCallback } from 'react';
import { ChatResponse } from '../types/auth.types';

// Define the interface for errors
interface ChatError {
  message: string;
  code?: string;
  status?: number;
}

// Custom hook to get chats
export const useGetChatsWithMacy = () => {
  const [macyIsLoading, setMacyIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ChatError | null>(null);

  // Function to fetch the message
  const getMessage = useCallback(async (): Promise<ChatResponse[] | null> => {
    setMacyIsLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token is missing');
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/chat/`, 
        // '/api/chat/', 
        {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${accessToken}`,
        },
      });
      
      // Parse the response data
      const data = await response.json();


      // Check for server errors or unsuccessful response
      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      // Validate the structure of the response
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format: Expected an array of responses');
      }
      
      const messages: ChatResponse[] = []
      data.map((response: ChatResponse) => (
        messages.push({
        id: response.id,
        message: response.message,
        timestamp: new Date(response.timestamp!),  // Set timestamp for each message
        is_user: response.is_user,  // Assuming the messages are from the server, set is_user to false
      })));

      // Return formatted chat responses with timestamps
      return messages

    } catch (err) {
      const chatError: ChatError = {
        message: err instanceof Error ? err.message : 'An unknown error occurred',
        status: err instanceof Response ? err.status : undefined,
      };
      setError(chatError);
      return null;
    } finally {
      setMacyIsLoading(false);
    }
  }, []);

  // Function to clear error state
  const clearError = useCallback(() => setError(null), []);

  return {
    getMessage,
    macyIsLoading,
    error,
    clearError,
  };
};
