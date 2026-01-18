export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  image?: string | null;
  createdAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface UpdateUserRequest {
  name?: string;
  role?: 'ADMIN' | 'USER';
}

export interface DeleteUserResponse {
  message: string;
}
