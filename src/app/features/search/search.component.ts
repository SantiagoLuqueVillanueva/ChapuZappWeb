import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SEARCH_PROFESSIONALS, SearchProfessional } from './search.mock';

type SortOption = 'valoracion' | 'precio' | 'cercania';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly searchQuery = signal('');
  readonly selectedSector = signal('todos');
  readonly maxPrice = signal(0);
  readonly minRating = signal(0);
  readonly sortBy = signal<SortOption>('valoracion');
  readonly currentPage = signal(1);
  readonly pageSize = 6;

  readonly isLoading = signal(false);
  readonly hasError = signal(false);

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

  readonly allProfessionals = signal<SearchProfessional[]>(SEARCH_PROFESSIONALS);

  readonly filteredProfessionals = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const sector = this.selectedSector();
    const price = this.maxPrice();
    const rating = this.minRating();
    const sort = this.sortBy();

    const result = this.allProfessionals().filter((prof) => {
      if (query) {
        const matchesName = prof.name.toLowerCase().includes(query);
        const matchesProfession = prof.profession.toLowerCase().includes(query);
        const matchesSector = prof.sector.toLowerCase().includes(query);
        if (!matchesName && !matchesProfession && !matchesSector) {
          return false;
        }
      }

      if (sector !== 'todos' && prof.sector !== sector) {
        return false;
      }

      if (price > 0 && prof.pricePerHour > price) {
        return false;
      }

      if (rating > 0 && prof.rating < rating) {
        return false;
      }

      return true;
    });

    result.sort((a, b) => {
      if (sort === 'precio') {
        return a.pricePerHour - b.pricePerHour;
      }
      if (sort === 'cercania') {
        return a.distanceKm - b.distanceKm;
      }
      return b.rating - a.rating;
    });

    return result;
  });

  readonly totalResults = computed(() => this.filteredProfessionals().length);

  readonly totalPages = computed(() => {
    const total = this.totalResults();
    return total === 0 ? 1 : Math.ceil(total / this.pageSize);
  });

  readonly paginatedProfessionals = computed(() => {
    const page = Math.min(this.currentPage(), this.totalPages());
    const startIndex = (page - 1) * this.pageSize;
    return this.filteredProfessionals().slice(startIndex, startIndex + this.pageSize);
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['q'] !== undefined) {
        this.searchQuery.set(params['q']);
      }
      if (params['sector'] && this.sectors.includes(params['sector'])) {
        this.selectedSector.set(params['sector']);
      }
      if (params['precioMax']) {
        const p = Number(params['precioMax']);
        this.maxPrice.set(isNaN(p) ? 0 : p);
      }
      if (params['minRating']) {
        const r = Number(params['minRating']);
        this.minRating.set(isNaN(r) ? 0 : r);
      }
      if (params['sort'] && ['valoracion', 'precio', 'cercania'].includes(params['sort'])) {
        this.sortBy.set(params['sort'] as SortOption);
      }
      if (params['page']) {
        const pageNum = parseInt(params['page'], 10);
        this.currentPage.set(isNaN(pageNum) || pageNum < 1 ? 1 : pageNum);
      }
    });
  }

  onSearchSubmit(): void {
    this.currentPage.set(1);
    this.syncUrlParams();
  }

  onSearchInput(value: string): void {
    this.searchQuery.set(value);
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
    if (page >= 1 && page <= this.totalPages()) {
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
    this.hasError.set(false);
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 400);
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
