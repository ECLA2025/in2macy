export interface User {
  id: number;
  username: string;
  lastMessage?: string;
  time?: string;
  unread?: number;
  online?: boolean;
  }

export interface AuthError {
  message: string;
  field?: string;
}

export interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: AuthError | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
}

export interface AuthError {
  message: string;
  field?: string;
  code?: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}
export interface ChatResponse {
  id?: string;
  message: string;
  timestamp?: Date;
  is_user?: boolean

}

export interface Thread {
    id: string;
    user1?: ThreadUser;
    user2?: ThreadUser;
    status?: string;
    last_message_timestamp?: Date;
}

export interface ThreadUser{
  id: number;
  username: string;
}

export interface Message {
  id: string,
  message: string,
  file?: null,
  is_read: boolean,
  timestamp: Date,
  thread: string,
  sender: number,
  reciever: number,
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public field?: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface ProfileData {
  first_name: string;
  surname: string;
  gender: string;
  age: string;
  bio: string;
  profile_picture?: File | null;
}

export interface ProfileUpdateResponse {
  success: boolean;
  data?: ProfileData;
  error?: string;
}

export interface UseProfileUpdate {
  updateProfile: (data: ProfileData) => Promise<ProfileUpdateResponse>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export interface Profile {
  first_name: string;
  surname: string;
  gender: string;
  age: string;
  bio: string;
  profile_picture?: string;
}

export interface ProfileError {
  message: string;
  code?: string;
  status?: number;
}