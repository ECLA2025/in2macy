import { useState } from 'react';
import { ProfileData, ProfileUpdateResponse, UseProfileUpdate } from '../types/auth.types';

export const useProfileUpdate = (): UseProfileUpdate => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const updateProfile = async (profileData: ProfileData): Promise<ProfileUpdateResponse> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
        
      const accessToken = localStorage.getItem('accessToken');

      // API call to update profile
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/profile/`, 
        // '/api/profile/', 
        {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${accessToken}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      setSuccess(true);
      return {
        success: true,
        data: data.profile,
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while updating profile';
      setError(errorMessage);
      
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateProfile,
    isLoading,
    error,
    success,
  };
};