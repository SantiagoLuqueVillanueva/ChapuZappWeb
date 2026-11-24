export interface Usuario {
  idUsuario: number;
  nombre: string;
  email: string;
  rol: 'cliente' | 'profesional';
  telefono?: string;
  ciudad?: string;
  foto?: string;
}
