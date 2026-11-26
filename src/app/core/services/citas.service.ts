import { Injectable, inject } from '@angular/core';
import { Observable, defer, delay, of, throwError } from 'rxjs';
import { CitaAgenda, CitaCliente, EstadoCita, NuevaCita, TipoCitas } from '../../shared/models/cita.model';
import { Franja } from '../../shared/models/franja.model';
import { Horario, TramoHorario } from '../../shared/models/horario.model';
import { Servicio } from '../../shared/models/servicio.model';
import { AuthService } from './auth.service';
import { CITAS_MOCK, HORARIO_MOCK, PROFESIONALES_MOCK, ProfesionalMock, SERVICIOS_MOCK, ServicioMock } from './citas.mock';

const RETARDO_MS = 600;
const UNA_HORA_MS = 60 * 60 * 1000;
const HORAS_FRANJAS = [9, 10, 11, 12, 13, 16, 17, 18];

@Injectable({ providedIn: 'root' })
export class CitasService {
  private auth = inject(AuthService);

  private citas = [...CITAS_MOCK];
  private horarios = [...HORARIO_MOCK];

  // Ponlo en true para comprobar que las páginas muestran el error.
  simularError = false;

  // ---- Cliente ----

  misCitas(tipo?: TipoCitas): Observable<CitaCliente[]> {
    return this.responder(() => {
      const clienteId = this.usuarioId();
      const suyas = this.citas.filter((cita) => cita.clienteId === clienteId);
      const proximas = suyas
        .filter((cita) => this.esProxima(cita))
        .sort((a, b) => a.inicio.localeCompare(b.inicio));
      const pasadas = suyas
        .filter((cita) => !this.esProxima(cita))
        .sort((a, b) => b.inicio.localeCompare(a.inicio));
      const resultado =
        tipo === 'proximas' ? proximas : tipo === 'pasadas' ? pasadas : [...proximas, ...pasadas];
      return resultado.map((cita) => this.aCitaCliente(cita));
    });
  }

  cancelar(idCita: number): Observable<CitaCliente> {
    return this.responder(() => {
      const cita = this.buscarCita(idCita);
      if (cita.clienteId !== this.usuarioId()) throw new Error('La cita es de otro usuario');
      if (cita.estado === 'CANCELADA') throw new Error('La cita ya estaba cancelada');
      if (new Date(cita.inicio) <= new Date()) throw new Error('La cita ya pasó');
      return this.aCitaCliente(this.cambiarEstado(idCita, 'CANCELADA'));
    });
  }

  // ---- Reserva ----

  // Diferencia con la API (H6): los servicios vendrán de la API de profesionales.
  serviciosDe(profesionalId: number): Observable<Servicio[]> {
    return this.responder(() => {
      this.buscarProfesional(profesionalId);
      return SERVICIOS_MOCK.filter((s) => s.profesionalId === profesionalId).map((s) =>
        this.aServicio(s),
      );
    });
  }

  franjasDisponibles(profesionalId: number, fecha: string): Observable<Franja[]> {
    return this.responder(() => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        throw new Error('La fecha no tiene el formato AAAA-MM-DD');
      }
      this.buscarProfesional(profesionalId);
      const ahora = new Date();
      return HORAS_FRANJAS.map((hora) => {
        const inicio = new Date(`${fecha}T${String(hora).padStart(2, '0')}:00:00`);
        const fin = new Date(inicio.getTime() + UNA_HORA_MS);
        return {
          inicio: inicio.toISOString(),
          fin: fin.toISOString(),
          ocupada: inicio <= ahora || this.estaOcupada(profesionalId, inicio, fin),
        };
      });
    });
  }

  crearReserva(datos: NuevaCita): Observable<CitaCliente> {
    return this.responder(() => {
      const usuario = this.auth.usuario();
      if (!usuario) throw new Error('No hay sesión iniciada');
      if (usuario.rol !== 'CLIENTE') throw new Error('Solo los clientes pueden reservar');

      this.buscarProfesional(datos.profesionalId);
      const servicio = SERVICIOS_MOCK.find(
        (s) => s.idServicio === datos.servicioId && s.profesionalId === datos.profesionalId,
      );
      if (!servicio) throw new Error('El servicio no existe o no es de ese profesional');

      const inicio = new Date(datos.inicio);
      const fin = new Date(inicio.getTime() + UNA_HORA_MS);
      if (inicio <= new Date()) throw new Error('No se puede reservar en una fecha pasada');
      if (this.estaOcupada(datos.profesionalId, inicio, fin)) {
        throw new Error('La franja no está disponible');
      }

      const nueva: CitaAgenda = {
        idCita: Math.max(0, ...this.citas.map((c) => c.idCita)) + 1,
        clienteId: usuario.idUsuario,
        profesionalId: datos.profesionalId,
        servicioId: datos.servicioId,
        inicio: inicio.toISOString(),
        fin: fin.toISOString(),
        // Diferencia con la API (H6): la API crea la cita como PROGRAMADA;
        // aquí queda PENDIENTE hasta que el profesional la acepta en su agenda.
        estado: 'PENDIENTE',
        creadoEn: new Date().toISOString(),
        clienteNombre: usuario.nombre,
        servicioNombre: servicio.nombre,
        direccion: datos.direccion,
        nota: datos.nota,
      };
      this.citas = [...this.citas, nueva];
      return this.aCitaCliente(nueva);
    });
  }

  // ---- Profesional ----

  agenda(): Observable<CitaAgenda[]> {
    return this.responder(() => {
      const profesionalId = this.profesionalActual().idProfesional;
      return this.citas.filter((cita) => cita.profesionalId === profesionalId);
    });
  }

  aceptar(idCita: number): Observable<CitaAgenda> {
    return this.responder(() => this.responderSolicitud(idCita, 'PROGRAMADA'));
  }

  rechazar(idCita: number): Observable<CitaAgenda> {
    return this.responder(() => this.responderSolicitud(idCita, 'CANCELADA'));
  }

  horario(): Observable<Horario[]> {
    return this.responder(() => {
      const profesionalId = this.profesionalActual().idProfesional;
      return this.horarios.filter((h) => h.profesionalId === profesionalId);
    });
  }

   guardarHorario(tramos: TramoHorario[]): Observable<Horario[]> {
    return this.responder(() => {
      const profesionalId = this.profesionalActual().idProfesional;
      const guardado = tramos.map((t, i) => ({ ...t, idHorario: i + 1, profesionalId }));
      this.horarios = [
        ...this.horarios.filter((h) => h.profesionalId !== profesionalId),
        ...guardado,
      ];
      return guardado;
    });
  }

  // ---- Interno ----

  // Todas las respuestas pasan por aquí: esperan un poco, como una API,
  // y fallan si simularError está activado.
  private responder<T>(accion: () => T): Observable<T> {
    return defer(() => {
      if (this.simularError) {
        return throwError(() => new Error('Error simulado'));
      }
      return of(accion());
    }).pipe(delay(RETARDO_MS));
  }

  private usuarioId(): number {
    const usuario = this.auth.usuario();
    if (!usuario) throw new Error('No hay sesión iniciada');
    return usuario.idUsuario;
  }

  private profesionalActual(): ProfesionalMock {
    const usuarioId = this.usuarioId();
    const profesional = PROFESIONALES_MOCK.find((p) => p.usuarioId === usuarioId);
    if (!profesional) throw new Error('El usuario no es profesional');
    return profesional;
  }

  private buscarProfesional(idProfesional: number): ProfesionalMock {
    const profesional = PROFESIONALES_MOCK.find((p) => p.idProfesional === idProfesional);
    if (!profesional) throw new Error('El profesional no existe');
    return profesional;
  }

  private buscarCita(idCita: number): CitaAgenda {
    const cita = this.citas.find((c) => c.idCita === idCita);
    if (!cita) throw new Error('La cita no existe');
    return cita;
  }

  private cambiarEstado(idCita: number, estado: EstadoCita): CitaAgenda {
    const actualizada = { ...this.buscarCita(idCita), estado };
    this.citas = this.citas.map((c) => (c.idCita === idCita ? actualizada : c));
    return actualizada;
  }

  private responderSolicitud(idCita: number, estado: EstadoCita): CitaAgenda {
    const cita = this.buscarCita(idCita);
    if (cita.profesionalId !== this.profesionalActual().idProfesional) {
      throw new Error('La cita es de otro profesional');
    }
    if (cita.estado !== 'PENDIENTE') throw new Error('La cita no está pendiente');
    return this.cambiarEstado(idCita, estado);
  }

  // Próxima = programada o pendiente y que aún no ha empezado.
  private esProxima(cita: CitaAgenda): boolean {
    return cita.estado !== 'CANCELADA' && new Date(cita.inicio) > new Date();
  }

  private estaOcupada(profesionalId: number, inicio: Date, fin: Date): boolean {
    return this.citas.some(
      (c) =>
        c.profesionalId === profesionalId &&
        c.estado !== 'CANCELADA' &&
        new Date(c.inicio) < fin &&
        new Date(c.fin) > inicio,
    );
  }

  private aServicio(servicio: ServicioMock): Servicio {
    return { idServicio: servicio.idServicio, nombre: servicio.nombre, precio: servicio.precio };
  }

  private aCitaCliente(cita: CitaAgenda): CitaCliente {
    const servicio = SERVICIOS_MOCK.find((s) => s.idServicio === cita.servicioId)!;
    const profesional = this.buscarProfesional(cita.profesionalId);
    return {
      idCita: cita.idCita,
      inicio: cita.inicio,
      fin: cita.fin,
      estado: cita.estado,
      servicio: this.aServicio(servicio),
      profesional: {
        idProfesional: profesional.idProfesional,
        nombre: profesional.nombre,
        direccion: profesional.direccion,
      },
    };
  }
}
