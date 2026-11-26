import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessionalService } from '../../core/services/professional.service';
import {
  PagedResult,
  SearchProfessional,
  SortOption,
} from '../../shared/models/professional.model';
import { ProfessionalCardComponent } from '../../shared/components/professional-card/professional-card.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, ProfessionalCardComponent],
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly professionalService = inject(ProfessionalService);

  readonly searchQuery = signal('');
  readonly selectedSector = signal('todos');
  readonly maxPrice = signal(0);
  readonly minRating = signal(0);
  readonly sortBy = signal<SortOption>('valoracion');
  readonly currentPage = signal(1);
  readonly pageSize = 6;

  readonly isLoading = signal(false);
  readonly hasError = signal(false);

  readonly result = signal<PagedResult<SearchProfessional>>({
    items: [],
    total: 0,
    page: 1,
    pageSize: 6,
    totalPages: 1,
  });

  readonly sectors = [
    'todos',
    'Fontanería',
    'Electricidad',
    'Pintura',
    'Cerrajería',
    'Carpintería',
    'Climatización',
    'Reformas',
    'Jardinería',
  ];

  readonly popularTags = [
    'Cambiar grifo',
    'Desatasco',
    'Montar muebles',
    'Cambiar enchufe',
    'Pintar piso',
    'Arreglar persiana',
    'Cerrajero',
  ];

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['q'] !== undefined) this.searchQuery.set(params['q']);
      if (params['sector'] && this.sectors.includes(params['sector']))
        this.selectedSector.set(params['sector']);
      if (params['precioMax']) {
        const p = Number(params['precioMax']);
        this.maxPrice.set(isNaN(p) ? 0 : p);
      }
      if (params['minRating']) {
        const r = Number(params['minRating']);
        this.minRating.set(isNaN(r) ? 0 : r);
      }
      if (params['sort'] && ['valoracion', 'precio', 'cercania'].includes(params['sort']))
        this.sortBy.set(params['sort'] as SortOption);
      if (params['page']) {
        const pageNum = parseInt(params['page'], 10);
        this.currentPage.set(isNaN(pageNum) || pageNum < 1 ? 1 : pageNum);
      }
      this.fetchResults();
    });
  }

  private fetchResults(): void {
    this.isLoading.set(true);
    this.hasError.set(false);
    this.professionalService
      .search({
        query: this.searchQuery(),
        sector: this.selectedSector(),
        maxPrice: this.maxPrice(),
        minRating: this.minRating(),
        sortBy: this.sortBy(),
        page: this.currentPage(),
        pageSize: this.pageSize,
      })
      .subscribe({
        next: (data) => {
          this.result.set(data);
          this.isLoading.set(false);
        },
        error: () => {
          this.hasError.set(true);
          this.isLoading.set(false);
        },
      });
  }

  onSearchInput(value: string): void {
    this.searchQuery.set(value);
    this.currentPage.set(1);
    this.syncUrlParams();
  }

  onSearchSubmit(): void {
    this.currentPage.set(1);
    this.syncUrlParams();
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.currentPage.set(1);
    this.syncUrlParams();
  }

  setSector(sector: string): void {
    this.selectedSector.set(sector);
    this.currentPage.set(1);
    this.syncUrlParams();
  }

  setMaxPrice(price: number): void {
    this.maxPrice.set(price);
    this.currentPage.set(1);
    this.syncUrlParams();
  }

  setMinRating(rating: number): void {
    this.minRating.set(rating);
    this.currentPage.set(1);
    this.syncUrlParams();
  }

  setSortBy(sort: SortOption): void {
    this.sortBy.set(sort);
    this.currentPage.set(1);
    this.syncUrlParams();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.result().totalPages) {
      this.currentPage.set(page);
      this.syncUrlParams();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  applyPopularTag(tag: string): void {
    this.searchQuery.set(tag);
    this.currentPage.set(1);
    this.syncUrlParams();
  }

  resetFilters(): void {
    this.searchQuery.set('');
    this.selectedSector.set('todos');
    this.maxPrice.set(0);
    this.minRating.set(0);
    this.sortBy.set('valoracion');
    this.currentPage.set(1);
    this.hasError.set(false);
    this.syncUrlParams();
  }

  retry(): void {
    this.fetchResults();
  }

  private syncUrlParams(): void {
    const queryParams: Record<string, string | number | null> = {
      q: this.searchQuery().trim() || null,
      sector: this.selectedSector() !== 'todos' ? this.selectedSector() : null,
      precioMax: this.maxPrice() > 0 ? this.maxPrice() : null,
      minRating: this.minRating() > 0 ? this.minRating() : null,
      sort: this.sortBy() !== 'valoracion' ? this.sortBy() : null,
      page: this.currentPage() > 1 ? this.currentPage() : null,
    };

    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: '',
    });
  }
}
