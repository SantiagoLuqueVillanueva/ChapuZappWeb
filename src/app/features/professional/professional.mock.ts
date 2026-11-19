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
}

export interface Professional {
  id: string;
  name: string;
  initials: string;
  profession: string;
  experienceYears: number;
  verified: boolean;
  rating: number;
  reviewsCount: number;
  location: string;
  distance: string;
  stats: {
    experience: string;
    completedJobs: number;
    responseTime: string;
    schedule: string;
  };
  services: ServiceItem[];
  reviews: ReviewItem[];
}

export const MOCK_PROFESSIONALS: Record<string, Professional> = {
  '1': {
    id: '1',
    name: 'Javier Moreno',
    initials: 'JM',
    profession: 'Fontanero',
    experienceYears: 8,
    verified: true,
    rating: 4.9,
    reviewsCount: 128,
    location: 'Campanillas, Málaga',
    distance: 'a 0,4 km de ti',
    stats: {
      experience: '8 años',
      completedJobs: 312,
      responseTime: '<1h',
      schedule: 'Lun - Sáb 08:00 - 20:00',
    },
    services: [
      {
        id: 's1',
        name: 'Cambio de grifo',
        duration: 'Instalación · 45-60 min',
        price: 45,
      },
      {
        id: 's2',
        name: 'Reparación de fuga',
        duration: 'Diagnóstico incluido',
        price: 55,
      },
      {
        id: 's3',
        name: 'Desatasco de lavabo',
        duration: 'Limpieza y revisión',
        price: 60,
      },
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
    ],
  },
  '5': {
    id: '5',
    name: 'Javier Moreno',
    initials: 'JM',
    profession: 'Fontanero',
    experienceYears: 8,
    verified: true,
    rating: 4.9,
    reviewsCount: 128,
    location: 'Campanillas, Málaga',
    distance: 'a 0,4 km de ti',
    stats: {
      experience: '8 años',
      completedJobs: 312,
      responseTime: '<1h',
      schedule: 'Lun - Sáb 08:00 - 20:00',
    },
    services: [
      {
        id: 's1',
        name: 'Cambio de grifo',
        duration: 'Instalación · 45-60 min',
        price: 45,
      },
      {
        id: 's2',
        name: 'Reparación de fuga',
        duration: 'Diagnóstico incluido',
        price: 55,
      },
      {
        id: 's3',
        name: 'Desatasco de lavabo',
        duration: 'Limpieza y revisión',
        price: 60,
      },
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
    ],
  },
  '2': {
    id: '2',
    name: 'Laura Ramos',
    initials: 'LR',
    profession: 'Electricista',
    experienceYears: 5,
    verified: true,
    rating: 5.0,
    reviewsCount: 0,
    location: 'Teatinos, Málaga',
    distance: 'a 1,2 km de ti',
    stats: {
      experience: '5 años',
      completedJobs: 98,
      responseTime: '<30m',
      schedule: 'Lun - Vie 09:00 - 19:00',
    },
    services: [
      {
        id: 's21',
        name: 'Instalación de cuadro eléctrico',
        duration: 'Boletín incluido',
        price: 120,
      },
      {
        id: 's22',
        name: 'Cambio de enchufes y puntos de luz',
        duration: 'Hasta 4 puntos',
        price: 40,
      },
    ],
    reviews: [],
  },
};
