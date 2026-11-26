import { Component, OnInit, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { ProfessionalService } from '../../core/services/professional.service';
import { Professional, ReviewItem, ServiceItem } from '../../shared/models/professional.model';

type ReviewFilter = 'todas' | 'con-fotos' | '5-estrellas' | 'recientes';

@Component({
  selector: 'app-professional-detail',
  standalone: true,
  imports: [RouterLink, AvatarComponent],
  templateUrl: './professional-detail.component.html',
})
export class ProfessionalDetailComponent implements OnInit {
  id = input<string>('');

  private readonly professionalService = inject(ProfessionalService);

  readonly activeTab = signal<'precios' | 'resenas' | 'sobre-mi'>('precios');
  readonly activeReviewFilter = signal<ReviewFilter>('todas');
  readonly selectedService = signal<ServiceItem | null>(null);
  readonly isLoading = signal(true);
  readonly simulateError = signal(false);
  readonly selectedDay = signal(15);
  readonly selectedTime = signal('17:00');

  readonly professional = signal<Professional | null>(null);

  readonly filteredReviews = (): ReviewItem[] => {
    const prof = this.professional();
    if (!prof) return [];
    const filter = this.activeReviewFilter();
    switch (filter) {
      case 'con-fotos':
        return prof.reviews.filter((r) => r.hasPhotos);
      case '5-estrellas':
        return prof.reviews.filter((r) => r.rating === 5);
      case 'recientes':
        return [...prof.reviews].sort((a, b) => b.id.localeCompare(a.id));
      default:
        return prof.reviews;
    }
  };

  ngOnInit(): void {
    this.professionalService.getById(this.id()).subscribe({
      next: (data) => {
        this.professional.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.simulateError.set(true);
        this.isLoading.set(false);
      },
    });
  }

  selectService(service: ServiceItem): void {
    this.selectedService.set(service);
  }

  toggleSimulateError(): void {
    this.simulateError.update((v) => !v);
  }
}
