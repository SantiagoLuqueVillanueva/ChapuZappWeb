import { Rol, Usuario } from './usuario.model';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  email: string;
  password: string;
  rol: Rol;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}
