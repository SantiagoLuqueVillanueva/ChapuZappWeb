import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MOCK_PROFESSIONALS, Professional, ReviewItem, ServiceItem } from './professional.mock';

type ReviewFilter = 'todas' | 'con-fotos' | '5-estrellas' | 'recientes';

@Component({
  selector: 'app-professional-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './professional-detail.component.html',
})
export class ProfessionalDetailComponent {
  id = input<string>('');

  readonly activeTab = signal<'precios' | 'resenas' | 'sobre-mi'>('precios');
  readonly activeReviewFilter = signal<ReviewFilter>('todas');
  readonly selectedService = signal<ServiceItem | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly simulateError = signal<boolean>(false);
  readonly selectedDay = signal<number>(15);
  readonly selectedTime = signal<string>('17:00');

  readonly professional = computed<Professional | null>(() => {
    const profId = this.id();
    return MOCK_PROFESSIONALS[profId] ?? null;
  });

  readonly filteredReviews = computed<ReviewItem[]>(() => {
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
      case 'todas':
      default:
        return prof.reviews;
    }
  });

  selectService(service: ServiceItem): void {
    this.selectedService.set(service);
  }

  toggleSimulateError(): void {
    this.simulateError.update((v) => !v);
  }
}
