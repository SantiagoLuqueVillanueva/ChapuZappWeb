import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import {
  PagedResult,
  Professional,
  SearchParams,
  SearchProfessional,
  SortOption,
} from '../../shared/models/professional.model';
import { MOCK_PROFESSIONALS_BY_ID, SEARCH_PROFESSIONALS_MOCK } from './professional.mock';

const DELAY_MS = 300;

@Injectable({ providedIn: 'root' })
export class ProfessionalService {
  search(params: SearchParams = {}): Observable<PagedResult<SearchProfessional>> {
    const query = (params.query ?? '').trim().toLowerCase();
    const sector = params.sector ?? 'todos';
    const maxPrice = params.maxPrice ?? 0;
    const minRating = params.minRating ?? 0;
    const sortBy: SortOption = params.sortBy ?? 'valoracion';
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 6;

    let result = SEARCH_PROFESSIONALS_MOCK.filter((prof) => {
      if (query) {
        const inName = prof.name.toLowerCase().includes(query);
        const inProfession = prof.profession.toLowerCase().includes(query);
        const inSector = prof.sector.toLowerCase().includes(query);
        if (!inName && !inProfession && !inSector) return false;
      }
      if (sector !== 'todos' && prof.sector !== sector) return false;
      if (maxPrice > 0 && prof.pricePerHour > maxPrice) return false;
      if (minRating > 0 && prof.rating < minRating) return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === 'precio') return a.pricePerHour - b.pricePerHour;
      if (sortBy === 'cercania') return a.distanceKm - b.distanceKm;
      return b.rating - a.rating;
    });

    const total = result.length;
    const totalPages = total === 0 ? 1 : Math.ceil(total / pageSize);
    const safePage = Math.min(Math.max(page, 1), totalPages);
    const start = (safePage - 1) * pageSize;
    const items = result.slice(start, start + pageSize);

    return of({ items, total, page: safePage, pageSize, totalPages }).pipe(delay(DELAY_MS));
  }

  getById(id: string): Observable<Professional> {
    const prof = MOCK_PROFESSIONALS_BY_ID[id];
    if (!prof) {
      return throwError(() => new Error(`Profesional con id "${id}" no encontrado`));
    }
    return of(prof).pipe(delay(DELAY_MS));
  }
}
