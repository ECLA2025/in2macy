import { useState } from 'react';
import { ChatResponse } from '../types/auth.types';

interface ChatMessage {
  message: string;
}

interface ChatError {
  message: string;
  code?: string;
  status?: number;
}

export const useChatWithMacy = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatError | null>(null);

  const sendMessage = async (message: string): Promise<ChatResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem('accessToken');
      console.log(accessToken)
      
      if (!message.trim()) {
        throw new Error('Message cannot be empty');
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/chat/`, 
        // '/api/chat/', 
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${accessToken}`,
        },
        body: JSON.stringify({ 
          message
        } as ChatMessage),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      // Validate response structure
      if (!data.response) {
        throw new Error('Invalid response format from server');
      }

      return {
        message: data.response,
      };

    } catch (error) {
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
    sendMessage,
    isLoading,
    error,
    clearError
  };
};