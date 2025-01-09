import { useState } from 'react';
import { Profile } from '../types/auth.types';

interface ProfileError {
  message: string;
  code?: string;
  status?: number;
}

export const useFetchProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ProfileError | null>(null);

  const fetchProfile = async (): Promise<Profile | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem('accessToken');
      console.log(accessToken)

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/profile/`, 
        // '/api/users/search/', 
        {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${accessToken}`,
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }
      
      console.log(data, "My Fullz")

      return data

    } catch (error) {
        console.log(error);
      const ProfileError: ProfileError = {
        message: error instanceof Error ? error.message : 'An unknown error occurred',
        status: error instanceof Response ? error.status : undefined
      };
      
      setError(ProfileError);
      return null;

    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    fetchProfile,
    isLoading,
    error,
    clearError
  };
};