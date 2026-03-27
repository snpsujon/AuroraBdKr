export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresAt: string;
  userName: string;
  email: string;
  roles: string[];
}

export interface User {
  userName: string;
  email: string;
  roles: string[];
}
