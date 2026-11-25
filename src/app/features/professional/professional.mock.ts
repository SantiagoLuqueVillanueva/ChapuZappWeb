export interface ServiceItem {
  id: string;
  name: string;
  duration: string;
  price: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  initials: string;
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
  initials: string;
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
    responseTime: string;
    schedule: string;
  };
  ratingBreakdown: RatingBreakdown;
  services: ServiceItem[];
  reviews: ReviewItem[];
}

export const JAVIER_MORENO: Professional = {
  id: '1',
  name: 'Javier Moreno',
  initials: 'JM',
  profession: 'Fontanero',
  sector: 'Fontanería',
  experienceYears: 8,
  verified: true,
  rating: 4.9,
  reviewsCount: 128,
  location: 'Campanillas, Málaga',
  distance: 'a 0,4 km de ti',
  about:
    'Hola, soy Javier Moreno, fontanero profesional autónomo con más de 8 años de experiencia realizando reparaciones, instalaciones y reformas en Málaga y alrededores. Garantía por escrito en todos los trabajos, materiales homologados de primera calidad y presupuesto cerrado sin sorpresas.',
  specialties: [
    'Fontanería de urgencia',
    'Desatascos y tuberías',
    'Instalación y cambio de grifería',
    'Reparación de fugas y humedades',
    'Calentadores y termos eléctricos',
  ],
  serviceAreas: ['Campanillas', 'Teatinos', 'Málaga Centro', 'Churriana', 'Torremolinos'],
  stats: {
    experience: '8 años',
    completedJobs: 312,
    responseTime: '<1h',
    schedule: 'Lun - Sáb 08:00 - 20:00',
  },
  ratingBreakdown: {
    stars5: 105,
    stars4: 18,
    stars3: 3,
    stars2: 1,
    stars1: 1,
  },
  services: [
    { id: 's1', name: 'Cambio de grifo', duration: 'Instalación · 45-60 min', price: 45 },
    { id: 's2', name: 'Reparación de fuga', duration: 'Diagnóstico incluido', price: 55 },
    { id: 's3', name: 'Desatasco de lavabo', duration: 'Limpieza y revisión', price: 60 },
    {
      id: 's4',
      name: 'Instalación de termo',
      duration: 'Retirada del antiguo incluida',
      price: 90,
    },
  ],
  reviews: [
    {
      id: 'r1',
      author: 'Ana García',
      initials: 'AG',
      date: 'Octubre 2026',
      rating: 5,
      comment:
        'Muy puntual y limpio. Me explicó todo antes de empezar y el precio fue el acordado.',
    },
    {
      id: 'r2',
      author: 'Luis P.',
      initials: 'LP',
      date: 'Septiembre 2026',
      rating: 5,
      comment: 'Arregló la fuga en menos de una hora. Repetiría sin dudarlo.',
    },
    {
      id: 'r3',
      author: 'Carmen V.',
      initials: 'CV',
      date: 'Septiembre 2026',
      rating: 5,
      comment: 'Vino el mismo día que le escribí. Muy amable y dejó la cocina impecable.',
    },
    {
      id: 'r4',
      author: 'Raúl D.',
      initials: 'RD',
      date: 'Agosto 2026',
      rating: 5,
      comment: 'Instaló el termo nuevo y se llevó el viejo. Precio justo.',
    },
  ],
};

export const MOCK_PROFESSIONALS: Record<string, Professional> = {
  '1': JAVIER_MORENO,
  '5': JAVIER_MORENO,
};
