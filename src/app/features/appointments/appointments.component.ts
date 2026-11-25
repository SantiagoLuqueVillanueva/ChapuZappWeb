import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Appointment } from '../../shared/models/appointment.model';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 class="font-display text-h1 font-bold text-ink">Mis citas</h1>

      @if (estado === 'cargando') {
        <p class="mt-6 text-body text-muted">Cargando tus citas...</p>
      }

      @if (estado === 'error') {
        <div class="mt-6 rounded-lg border border-line bg-white p-4">
          <p class="text-body text-ink">No hemos podido cargar tus citas. Inténtalo de nuevo.</p>
          <button
            type="button"
            class="mt-3 rounded-lg bg-ink px-4 py-2.5 font-semibold text-white"
            (click)="cargarCitas()"
          >
            Reintentar
          </button>
        </div>
      }

      @if (estado === 'listo') {
        <div class="mt-6 flex gap-2">
          <button
            type="button"
            class="rounded-lg px-4 py-2.5 font-display text-card-title font-semibold"
            [class]="
              pestana === 'proximas' ? 'bg-ink text-white' : 'bg-white text-ink border border-line'
            "
            (click)="pestana = 'proximas'"
          >
            Próximas
          </button>
          <button
            type="button"
            class="rounded-lg px-4 py-2.5 font-display text-card-title font-semibold"
            [class]="
              pestana === 'pasadas' ? 'bg-ink text-white' : 'bg-white text-ink border border-line'
            "
            (click)="pestana = 'pasadas'"
          >
            Pasadas
          </button>
        </div>

        @if (citasMostradas.length === 0) {
          <div class="mt-6 rounded-lg border border-line bg-card p-6 text-center">
            <p class="text-body text-ink">
              {{
                pestana === 'proximas' ? 'No tienes citas próximas.' : 'No tienes citas pasadas.'
              }}
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
            @for (cita of citasMostradas; track cita.id) {
              <li
                class="flex items-start justify-between gap-4 rounded-lg border border-line bg-card p-4"
              >
                <div>
                  <p class="font-display text-card-title font-semibold text-ink">
                    {{ cita.professionalName }}
                  </p>
                  <p class="text-body text-muted">{{ cita.service }}</p>
                  <p class="text-body text-muted">{{ cita.date }} · {{ cita.time }}</p>
                </div>
                <div class="flex flex-col items-end gap-2">
                  <span
                    class="rounded-full px-3 py-1 text-chip font-semibold capitalize"
                    [class]="clasesEstado[cita.status]"
                  >
                    {{ cita.status }}
                  </span>
                  @if (puedeCancelar(cita)) {
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
      }

      @if (citaACancelar) {
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
          <div class="w-full max-w-sm rounded-lg bg-white p-6">
            <h2 class="font-display text-h2 font-bold text-ink">¿Cancelar esta cita?</h2>
            <p class="mt-2 text-body text-muted">
              {{ citaACancelar.service }} con {{ citaACancelar.professionalName }} el
              {{ citaACancelar.date }} a las {{ citaACancelar.time }}.
            </p>
            <div class="mt-6 flex justify-end gap-2">
              <button
                type="button"
                class="rounded-lg border border-line bg-white px-4 py-2.5 font-semibold text-ink"
                (click)="cerrarDialogo()"
              >
                Volver
              </button>
              <button
                type="button"
                class="rounded-lg bg-ink px-4 py-2.5 font-semibold text-white"
                (click)="confirmarCancelar()"
              >
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class AppointmentsComponent {
  estado: 'cargando' | 'error' | 'listo' = 'cargando';
  simularError = false;

  pestana: 'proximas' | 'pasadas' = 'proximas';
  citaACancelar: Appointment | null = null;

  clasesEstado: Record<Appointment['status'], string> = {
    pendiente: 'bg-primary-soft text-ink',
    confirmada: 'bg-primary text-ink',
    completada: 'bg-busy text-busy-text',
    cancelada: 'bg-white text-muted border border-line',
  };

  constructor() {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.estado = 'cargando';
    setTimeout(() => {
      this.estado = this.simularError ? 'error' : 'listo';
    }, 600);
  }

  get citasMostradas(): Appointment[] {
    return this.citas.filter((cita) => {
      const esProxima = cita.status === 'pendiente' || cita.status === 'confirmada';
      return this.pestana === 'proximas' ? esProxima : !esProxima;
    });
  }

  puedeCancelar(cita: Appointment): boolean {
    return cita.status === 'pendiente' || cita.status === 'confirmada';
  }

  pedirCancelar(cita: Appointment): void {
    this.citaACancelar = cita;
  }

  cerrarDialogo(): void {
    this.citaACancelar = null;
  }

  confirmarCancelar(): void {
    if (this.citaACancelar) {
      this.citaACancelar.status = 'cancelada';
    }
    this.citaACancelar = null;
  }

  citas: Appointment[] = [
    {
      id: 1,
      professionalName: 'Laura Gómez',
      service: 'Fontanería',
      date: '2026-12-03',
      time: '10:30',
      status: 'confirmada',
    },
    {
      id: 2,
      professionalName: 'Carlos Ruiz',
      service: 'Electricidad',
      date: '2026-12-10',
      time: '16:00',
      status: 'pendiente',
    },
    {
      id: 3,
      professionalName: 'Marta Díaz',
      service: 'Pintura',
      date: '2026-11-05',
      time: '09:00',
      status: 'completada',
    },
    {
      id: 4,
      professionalName: 'Pablo Ortega',
      service: 'Cerrajería',
      date: '2026-11-18',
      time: '12:15',
      status: 'cancelada',
    },
  ];
}
