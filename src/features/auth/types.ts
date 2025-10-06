export interface SignUpResponse {
  userId: string;
}

export interface LoginResponse {
  userId: string;
}

export interface LogoutResponse {
  message: string;
}

// User data types
export interface User {
  id: string;
  username: string;
  createdAt: string;
  // Add other user properties as needed
}
