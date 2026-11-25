import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CitaAgenda, EstadoCita } from '../../shared/models/cita.model';
import { Horario } from '../../shared/models/horario.model';
import { CITAS_MOCK, HORARIO_MOCK } from './agenda.mock';
import { lunesDe, mismoDia, sumarDias } from './fechas';
import { finDespuesDeInicio } from './horario.validators';

const NOMBRES_DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

@Component({
  selector: 'app-agenda',
  imports: [DatePipe, ReactiveFormsModule, ButtonComponent],
  templateUrl: './agenda.component.html',
})
export class AgendaComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  nombreDias = NOMBRES_DIAS;
  usuario = computed(() => this.auth.usuario()!);

  citas = signal<CitaAgenda[]>(CITAS_MOCK);
  lunes = signal(lunesDe(new Date()));
  hoy = new Date();

  dias = computed(() => [0, 1, 2, 3, 4, 5, 6].map((i) => sumarDias(this.lunes(), i)));
  domingo = computed(() => this.dias()[6]);

  citasDeLaSemana = computed(() => {
    const desde = this.lunes();
    const hasta = sumarDias(desde, 7);
    return this.citas().filter((cita) => {
      const inicio = new Date(cita.inicio);
      return inicio >= desde && inicio < hasta;
    });
  });

  semanaAnterior(): void {
    this.lunes.update((lunes) => sumarDias(lunes, -7));
  }

  semanaSiguiente(): void {
    this.lunes.update((lunes) => sumarDias(lunes, 7));
  }

  irAHoy(): void {
    this.lunes.set(lunesDe(new Date()));
  }

  citasDelDia(dia: Date): CitaAgenda[] {
    return this.citasDeLaSemana()
      .filter((cita) => mismoDia(new Date(cita.inicio), dia))
      .sort((a, b) => a.inicio.localeCompare(b.inicio));
  }

  esHoy(dia: Date): boolean {
    return mismoDia(dia, this.hoy);
  }

  solicitudes = computed(() => this.citas().filter((cita) => cita.estado === 'PENDIENTE'));

  aceptar(cita: CitaAgenda): void {
    if (confirm(`¿Aceptar la cita de ${cita.clienteNombre} (${cita.servicioNombre})?`)) {
      this.cambiarEstado(cita, 'PROGRAMADA');
    }
  }

  rechazar(cita: CitaAgenda): void {
    if (confirm(`¿Rechazar la cita de ${cita.clienteNombre} (${cita.servicioNombre})?`)) {
      this.cambiarEstado(cita, 'CANCELADA');
    }
  }

  private cambiarEstado(cita: CitaAgenda, estado: EstadoCita): void {
    this.citas.update((lista) =>
      lista.map((c) => (c.idCita === cita.idCita ? { ...c, estado } : c)),
    );
    if (this.citaSeleccionada()?.idCita === cita.idCita) {
      this.citaSeleccionada.set({ ...cita, estado });
    }
  }

  // ---- Detalle ----
  citaSeleccionada = signal<CitaAgenda | null>(null);

  abrirDetalle(cita: CitaAgenda): void {
    this.citaSeleccionada.set(cita);
  }

  cerrarDetalle(): void {
    this.citaSeleccionada.set(null);
  }

  textoEstado(estado: EstadoCita): string {
    const textos: Record<EstadoCita, string> = {
      PENDIENTE: 'Pendiente de aceptar',
      PROGRAMADA: 'Confirmada',
      CANCELADA: 'Cancelada',
    };
    return textos[estado];
  }

  // ---- Horario ----
  horario = signal<Horario[]>(HORARIO_MOCK);
  editandoHorario = signal(false);
  horarioGuardado = signal(false);

  horarioForm = this.fb.nonNullable.group({
    dias: this.fb.nonNullable.array(NOMBRES_DIAS.map((_, i) => this.crearDia(i + 1))),
  });

  get diasForm() {
    return this.horarioForm.controls.dias;
  }

  private crearDia(diaSemana: number) {
    const tramo = HORARIO_MOCK.find((h) => h.diaSemana === diaSemana);
    return this.fb.nonNullable.group(
      {
        activo: tramo !== undefined,
        horaInicio: tramo?.horaInicio ?? '09:00',
        horaFin: tramo?.horaFin ?? '14:00',
      },
      { validators: finDespuesDeInicio },
    );
  }

  tramoDe(diaSemana: number): Horario | undefined {
    return this.horario().find((h) => h.diaSemana === diaSemana);
  }

  guardarHorario(): void {
    if (this.horarioForm.invalid) {
      this.horarioForm.markAllAsTouched();
      return;
    }
    const nuevo: Horario[] = [];
    this.diasForm.getRawValue().forEach((dia, i) => {
      if (dia.activo) {
        nuevo.push({
          idHorario: i + 1,
          profesionalId: 1,
          diaSemana: i + 1,
          horaInicio: dia.horaInicio,
          horaFin: dia.horaFin,
        });
      }
    });
    this.horario.set(nuevo);
    this.editandoHorario.set(false);
    this.horarioGuardado.set(true);
  }

  editarHorario(): void {
    this.horarioGuardado.set(false);
    this.editandoHorario.set(true);
  }
}
