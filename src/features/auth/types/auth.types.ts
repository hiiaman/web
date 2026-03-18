export interface LoginRequest {
  email: string;
  password: string;
  captcha_token: string;
}

export interface RegisterRequest {
  email: string;
  full_name: string;
  password: string;
  captcha_token: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface ResendVerificationRequest {
  email: string;
}
