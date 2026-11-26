export interface ServiceItem {
  id: string;
  name: string;
  duration: string;
  price: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  date: string;
  rating: number;
  comment: string;
  hasPhotos?: boolean;
}

export interface RatingBreakdown {
  stars5: number;
  stars4: number;
  stars3: number;
  stars2: number;
  stars1: number;
}

export interface Professional {
  id: string;
  name: string;
  profession: string;
  sector: string;
  experienceYears: number;
  verified: boolean;
  rating: number;
  reviewsCount: number;
  location: string;
  distance: string;
  about: string;
  specialties: string[];
  serviceAreas: string[];
  stats: {
    experience: string;
    completedJobs: number;
    schedule: string;
  };
  ratingBreakdown: RatingBreakdown;
  services: ServiceItem[];
  reviews: ReviewItem[];
}

export interface SearchProfessional {
  id: string;
  name: string;
  profession: string;
  sector: string;
  rating: number;
  reviewsCount: number;
  pricePerHour: number;
  location: string;
  distance: string;
  distanceKm: number;
  verified: boolean;
}

export type SortOption = 'valoracion' | 'precio' | 'cercania';

export interface SearchParams {
  query?: string;
  sector?: string;
  maxPrice?: number;
  minRating?: number;
  sortBy?: SortOption;
  page?: number;
  pageSize?: number;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
