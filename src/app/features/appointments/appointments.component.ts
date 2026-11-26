import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CitasService } from '../../core/services/citas.service';
import { CitaCliente, TipoCitas } from '../../shared/models/cita.model';

type Etiqueta = 'Pendiente' | 'Confirmada' | 'Completada' | 'Cancelada';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [DatePipe, RouterLink],
  template: `
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 class="font-display text-h1 font-bold text-ink">Mis citas</h1>

      <div class="mt-6 flex gap-2">
        <button
          type="button"
          class="rounded-lg px-4 py-2.5 font-display text-card-title font-semibold"
          [class]="
            pestana === 'proximas' ? 'bg-ink text-white' : 'bg-white text-ink border border-line'
          "
          (click)="cambiarPestana('proximas')"
        >
          Próximas
        </button>
        <button
          type="button"
          class="rounded-lg px-4 py-2.5 font-display text-card-title font-semibold"
          [class]="
            pestana === 'pasadas' ? 'bg-ink text-white' : 'bg-white text-ink border border-line'
          "
          (click)="cambiarPestana('pasadas')"
        >
          Pasadas
        </button>
      </div>

      @if (estado === 'cargando') {
        <p class="mt-6 text-body text-muted">Cargando tus citas...</p>
      } @else if (estado === 'error') {
        <div class="mt-6 rounded-lg border border-line bg-white p-4">
          <p class="text-body text-ink">No hemos podido cargar tus citas. Inténtalo de nuevo.</p>
          <button
            type="button"
            class="mt-3 rounded-lg bg-ink px-4 py-2.5 font-semibold text-white"
            (click)="cargar()"
          >
            Reintentar
          </button>
        </div>
      } @else if (citas.length === 0) {
        <div class="mt-6 rounded-lg border border-line bg-card p-6 text-center">
          <p class="text-body text-ink">
            {{ pestana === 'proximas' ? 'No tienes citas próximas.' : 'No tienes citas pasadas.' }}
          </p>
          <a
            routerLink="/buscar"
            class="mt-4 inline-block rounded-lg bg-ink px-4 py-2.5 font-semibold text-white"
          >
            Buscar profesionales
          </a>
        </div>
      } @else {
        <ul class="mt-6 space-y-4">
          @for (cita of citas; track cita.idCita) {
            <li
              class="flex items-start justify-between gap-4 rounded-lg border border-line bg-card p-4"
            >
              <div>
                <p class="font-display text-card-title font-semibold text-ink">
                  {{ cita.profesional.nombre }}
                </p>
                <p class="text-body text-muted">
                  {{ cita.servicio.nombre }} · {{ cita.servicio.precio }} €
                </p>
                <p class="text-body text-muted">
                  {{ cita.inicio | date: 'dd/MM/yyyy' }} · {{ cita.inicio | date: 'HH:mm' }}
                </p>
              </div>
              <div class="flex flex-col items-end gap-2">
                <span
                  class="rounded-full px-3 py-1 text-chip font-semibold"
                  [class]="clasesEtiqueta[etiqueta(cita)]"
                >
                  {{ etiqueta(cita) }}
                </span>
                @if (pestana === 'proximas') {
                  <button
                    type="button"
                    class="rounded-lg border border-line bg-white px-4 py-2 text-body font-semibold text-ink"
                    (click)="pedirCancelar(cita)"
                  >
                    Cancelar
                  </button>
                }
              </div>
            </li>
          }
        </ul>
      }

      @if (citaACancelar) {
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
          <div class="w-full max-w-sm rounded-lg bg-white p-6">
            <h2 class="font-display text-h2 font-bold text-ink">¿Cancelar esta cita?</h2>
            <p class="mt-2 text-body text-muted">
              {{ citaACancelar.servicio.nombre }} con {{ citaACancelar.profesional.nombre }} el
              {{ citaACancelar.inicio | date: 'dd/MM/yyyy' }} a las
              {{ citaACancelar.inicio | date: 'HH:mm' }}.
            </p>

            @if (errorCancelar) {
              <p
                role="alert"
                class="mt-4 rounded-xl border border-red-500 bg-white px-4 py-2 text-body text-red-600"
              >
                No hemos podido cancelar la cita. Inténtalo de nuevo.
              </p>
            }

            <div class="mt-6 flex justify-end gap-2">
              <button
                type="button"
                class="rounded-lg border border-line bg-white px-4 py-2.5 font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-50"
                [disabled]="cancelando"
                (click)="cerrarDialogo()"
              >
                Volver
              </button>
              <button
                type="button"
                class="rounded-lg bg-ink px-4 py-2.5 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                [disabled]="cancelando"
                (click)="confirmarCancelar()"
              >
                {{ cancelando ? 'Cancelando...' : errorCancelar ? 'Reintentar' : 'Sí, cancelar' }}
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class AppointmentsComponent {
  private citasService = inject(CitasService);

  estado: 'cargando' | 'error' | 'listo' = 'cargando';
  pestana: TipoCitas = 'proximas';
  citas: CitaCliente[] = [];

  citaACancelar: CitaCliente | null = null;
  cancelando = false;
  errorCancelar = false;

  clasesEtiqueta: Record<Etiqueta, string> = {
    Pendiente: 'bg-primary-soft text-ink',
    Confirmada: 'bg-primary text-ink',
    Completada: 'bg-busy text-busy-text',
    Cancelada: 'bg-white text-muted border border-line',
  };

  constructor() {
    this.cargar();
  }

  cargar(): void {
    const pestana = this.pestana;
    this.estado = 'cargando';
    this.citasService.misCitas(pestana).subscribe({
      next: (citas) => {
        if (pestana !== this.pestana) return;
        this.citas = citas;
        this.estado = 'listo';
      },
      error: () => {
        if (pestana !== this.pestana) return;
        this.estado = 'error';
      },
    });
  }

  cambiarPestana(pestana: TipoCitas): void {
    this.pestana = pestana;
    this.cargar();
  }

  etiqueta(cita: CitaCliente): Etiqueta {
    if (cita.estado === 'CANCELADA') return 'Cancelada';
    if (cita.estado === 'PENDIENTE') return 'Pendiente';
    return new Date(cita.inicio) > new Date() ? 'Confirmada' : 'Completada';
  }

  pedirCancelar(cita: CitaCliente): void {
    this.errorCancelar = false;
    this.citaACancelar = cita;
  }

  cerrarDialogo(): void {
    this.citaACancelar = null;
    this.errorCancelar = false;
  }

  confirmarCancelar(): void {
    const cita = this.citaACancelar;
    if (!cita) return;
    this.cancelando = true;
    this.errorCancelar = false;
    this.citasService.cancelar(cita.idCita).subscribe({
      next: () => {
        this.cancelando = false;
        this.citaACancelar = null;
        this.cargar();
      },
      error: () => {
        this.cancelando = false;
        this.errorCancelar = true;
      },
    });
  }
}
