import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CitasService } from '../../core/services/citas.service';
import { Franja } from '../../shared/models/franja.model';
import { Servicio } from '../../shared/models/servicio.model';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';

type CampoReserva = 'servicio' | 'fecha' | 'franja' | 'direccion';

const MENSAJES_OBLIGATORIO: Record<CampoReserva, string> = {
  servicio: 'Elige un servicio',
  fecha: 'Elige una fecha',
  franja: 'Elige una franja horaria',
  direccion: 'Escribe la dirección donde se hará el servicio',
};

function hoyISO(): string {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mes}-${dia}`;
}

function fechaNoPasada(control: AbstractControl): ValidationErrors | null {
  const valor = control.value as string;
  if (!valor) return null;
  return valor < hoyISO() ? { fechaPasada: true } : null;
}

@Component({
  selector: 'app-booking',
  imports: [DatePipe, ReactiveFormsModule, RouterLink, FormFieldComponent, ButtonComponent],
  template: `
    <div class="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 class="font-display text-h1 font-bold text-ink">Reservar una cita</h1>
      <p class="mt-2 text-body text-muted">Profesional: {{ id() }}</p>

      @if (estadoCarga === 'cargando') {
        <p class="mt-6 text-body text-muted">Cargando servicios...</p>
      } @else if (estadoCarga === 'error') {
        <div class="mt-6 rounded-xl border border-line bg-white p-4">
          <p class="text-body text-ink">
            No hemos podido cargar los servicios. Inténtalo de nuevo.
          </p>
          <div class="mt-3">
            <app-button (click)="cargarServicios()">Reintentar</app-button>
          </div>
        </div>
      } @else if (fase === 'formulario') {
        <form
          [formGroup]="form"
          (ngSubmit)="revisar()"
          class="mt-6 grid gap-4 rounded-xl border border-line bg-card p-6 md:grid-cols-2"
        >
          <app-form-field label="Servicio" inputId="reserva-servicio" [error]="error('servicio')">
            <select
              id="reserva-servicio"
              formControlName="servicio"
              [class.border-red-500]="error('servicio')"
              class="w-full rounded-full border border-line bg-surface px-5 py-3 text-body text-ink focus:border-accent focus:outline-none"
            >
              <option value="">Elige un servicio</option>
              @for (servicio of servicios; track servicio.idServicio) {
                <option [value]="servicio.idServicio">
                  {{ servicio.nombre }} · {{ servicio.precio }} €
                </option>
              }
            </select>
          </app-form-field>

          <app-form-field label="Fecha" inputId="reserva-fecha" [error]="error('fecha')">
            <input
              id="reserva-fecha"
              type="date"
              formControlName="fecha"
              [min]="hoy"
              [class.border-red-500]="error('fecha')"
              class="w-full rounded-full border border-line bg-surface px-5 py-3 text-body text-ink focus:border-accent focus:outline-none"
            />
          </app-form-field>

          <div class="md:col-span-2">
            <app-form-field
              label="Franja horaria"
              inputId="reserva-franja"
              [error]="error('franja')"
            >
              @if (estadoFranjas === 'sin-fecha') {
                <p class="text-body text-muted">Elige una fecha para ver los horarios.</p>
              } @else if (estadoFranjas === 'cargando') {
                <p class="text-body text-muted">Cargando horarios...</p>
              } @else if (estadoFranjas === 'error') {
                <div class="space-y-2">
                  <p class="text-body text-ink">No hemos podido cargar los horarios.</p>
                  <app-button variant="secondary" (click)="cargarFranjas()">Reintentar</app-button>
                </div>
              } @else {
                <div id="reserva-franja" class="flex flex-wrap gap-2">
                  @for (franja of franjas; track franja.inicio) {
                    <button
                      type="button"
                      [disabled]="franja.ocupada"
                      [class]="clasesFranja(franja)"
                      class="rounded-lg border px-4 py-2.5 text-body font-semibold"
                      (click)="elegirFranja(franja.inicio)"
                    >
                      {{ franja.inicio | date: 'HH:mm' }}
                    </button>
                  }
                </div>
                <p class="text-caption text-muted">Las franjas tachadas ya están ocupadas.</p>
              }
            </app-form-field>
          </div>

          <div class="md:col-span-2">
            <app-form-field
              label="Dirección"
              inputId="reserva-direccion"
              [error]="error('direccion')"
            >
              <input
                id="reserva-direccion"
                type="text"
                formControlName="direccion"
                placeholder="Calle Larios 10, Málaga"
                [class.border-red-500]="error('direccion')"
                class="w-full rounded-full border border-line bg-surface px-5 py-3 text-body text-ink placeholder:text-muted focus:border-accent focus:outline-none"
              />
            </app-form-field>
          </div>

          <div class="md:col-span-2">
            <app-form-field label="Descripción del problema" inputId="reserva-descripcion">
              <textarea
                id="reserva-descripcion"
                formControlName="descripcion"
                rows="4"
                placeholder="Cuéntale al profesional qué necesitas"
                class="w-full rounded-xl border border-line bg-surface px-5 py-3 text-body text-ink placeholder:text-muted focus:border-accent focus:outline-none"
              ></textarea>
            </app-form-field>
          </div>

          <div class="flex justify-end md:col-span-2">
            <app-button type="submit">Revisar reserva</app-button>
          </div>
        </form>
      } @else if (fase === 'resumen') {
        <div class="mt-6 rounded-xl border border-line bg-card p-6">
          <h2 class="font-display text-h2 font-semibold text-ink">Resumen de tu reserva</h2>

          <dl class="mt-4 space-y-3 text-body">
            <div>
              <dt class="text-muted">Servicio</dt>
              <dd class="font-semibold text-ink">
                {{ servicioElegido?.nombre }} · {{ servicioElegido?.precio }} €
              </dd>
            </div>
            <div>
              <dt class="text-muted">Fecha y hora</dt>
              <dd class="font-semibold text-ink">
                {{ fechaLegible }} a las {{ form.controls.franja.value | date: 'HH:mm' }}
              </dd>
            </div>
            <div>
              <dt class="text-muted">Dirección</dt>
              <dd class="font-semibold text-ink">{{ form.controls.direccion.value }}</dd>
            </div>
            @if (form.controls.descripcion.value) {
              <div>
                <dt class="text-muted">Descripción del problema</dt>
                <dd class="font-semibold text-ink">{{ form.controls.descripcion.value }}</dd>
              </div>
            }
          </dl>

          @if (errorEnvio) {
            <p
              role="alert"
              class="mt-4 rounded-xl border border-red-500 bg-white px-4 py-2 text-body text-red-600"
            >
              No hemos podido confirmar la reserva: {{ errorEnvio }}.
            </p>
          }

          <div class="mt-6 flex justify-end gap-3">
            <app-button variant="secondary" (click)="editar()" [disabled]="enviando">
              Editar
            </app-button>
            <app-button (click)="confirmar()" [disabled]="enviando">
              {{ enviando ? 'Confirmando...' : errorEnvio ? 'Reintentar' : 'Confirmar reserva' }}
            </app-button>
          </div>
        </div>
      } @else {
        <div role="status" class="mt-6 rounded-xl border border-line bg-primary-soft p-6">
          <h2 class="font-display text-h2 font-semibold text-ink">¡Reserva confirmada!</h2>
          <p class="mt-2 text-body text-ink">
            Hemos enviado tu solicitud al profesional. Puedes ver y gestionar tus citas en Mis
            citas.
          </p>
          <a
            routerLink="/mis-citas"
            class="mt-4 inline-block rounded-lg bg-ink px-4 py-2.5 font-semibold text-white"
          >
            Ir a Mis citas
          </a>
        </div>
      }
    </div>
  `,
})
export class BookingComponent implements OnInit {
  private fb = inject(FormBuilder);
  private citasService = inject(CitasService);

  id = input<string>('');
  hoy = hoyISO();
  fase: 'formulario' | 'resumen' | 'exito' = 'formulario';

  servicios: Servicio[] = [];
  franjas: Franja[] = [];
  estadoCarga: 'cargando' | 'error' | 'listo' = 'cargando';
  estadoFranjas: 'sin-fecha' | 'cargando' | 'error' | 'listo' = 'sin-fecha';
  enviando = false;
  errorEnvio: string | null = null;

  form = this.fb.nonNullable.group({
    servicio: ['', Validators.required],
    fecha: ['', [Validators.required, fechaNoPasada]],
    franja: ['', Validators.required],
    direccion: ['', Validators.required],
    descripcion: [''],
  });

  constructor() {
    this.form.controls.fecha.valueChanges.subscribe(() => {
      this.form.controls.franja.setValue('');
      this.form.controls.franja.markAsUntouched();
      this.cargarFranjas();
    });
  }

  ngOnInit(): void {
    this.cargarServicios();
  }

  get profesionalId(): number {
    return Number(this.id());
  }

  get servicioElegido(): Servicio | undefined {
    return this.servicios.find((s) => s.idServicio === Number(this.form.controls.servicio.value));
  }

  get fechaLegible(): string {
    const [anio, mes, dia] = this.form.controls.fecha.value.split('-');
    return `${dia}/${mes}/${anio}`;
  }

  cargarServicios(): void {
    this.estadoCarga = 'cargando';
    this.citasService.serviciosDe(this.profesionalId).subscribe({
      next: (servicios) => {
        this.servicios = servicios;
        this.estadoCarga = 'listo';
      },
      error: () => {
        this.estadoCarga = 'error';
      },
    });
  }

  cargarFranjas(): void {
    const fecha = this.form.controls.fecha.value;
    this.franjas = [];
    if (!fecha || this.form.controls.fecha.hasError('fechaPasada')) {
      this.estadoFranjas = 'sin-fecha';
      return;
    }
    this.estadoFranjas = 'cargando';
    this.citasService.franjasDisponibles(this.profesionalId, fecha).subscribe({
      next: (franjas) => {
        if (fecha !== this.form.controls.fecha.value) return;
        const elegida = this.form.controls.franja.value;
        if (franjas.some((f) => f.inicio === elegida && f.ocupada)) {
          this.form.controls.franja.setValue('');
        }
        this.franjas = franjas;
        this.estadoFranjas = 'listo';
      },
      error: () => {
        if (fecha !== this.form.controls.fecha.value) return;
        this.estadoFranjas = 'error';
      },
    });
  }

  error(campo: CampoReserva): string | null {
    const control = this.form.controls[campo];
    if (!control.touched || control.valid) return null;
    if (control.hasError('required')) return MENSAJES_OBLIGATORIO[campo];
    if (control.hasError('fechaPasada')) return 'La fecha no puede ser anterior a hoy';
    return null;
  }

  clasesFranja(franja: Franja): string {
    if (franja.ocupada) return 'border-line bg-busy text-busy-text line-through cursor-not-allowed';
    if (this.form.controls.franja.value === franja.inicio) return 'border-ink bg-ink text-white';
    return 'border-line bg-white text-ink hover:border-accent';
  }

  elegirFranja(inicio: string): void {
    this.form.controls.franja.setValue(inicio);
    this.form.controls.franja.markAsTouched();
  }

  revisar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.fase = 'resumen';
  }

  editar(): void {
    this.errorEnvio = null;
    this.fase = 'formulario';
    this.cargarFranjas();
  }

  confirmar(): void {
    const datos = this.form.getRawValue();
    this.enviando = true;
    this.errorEnvio = null;
    this.citasService
      .crearReserva({
        profesionalId: this.profesionalId,
        servicioId: Number(datos.servicio),
        inicio: datos.franja,
        direccion: datos.direccion,
        nota: datos.descripcion || null,
      })
      .subscribe({
        next: () => {
          this.enviando = false;
          this.fase = 'exito';
        },
        error: (e: Error) => {
          this.enviando = false;
          this.errorEnvio = e.message;
        },
      });
  }
}
