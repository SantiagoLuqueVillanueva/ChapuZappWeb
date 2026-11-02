# ChapuZapp Web

Web de **ChapuZapp**, la app para agendar citas con manitas de confianza cerca de ti.
Este repositorio contiene solo el **frontend** (Angular). El backend y la app Android están en repositorios aparte.

> Estado: en construcción (Sprint 1).

## Tecnologías

- Angular (componentes standalone y Angular Router)
- Tailwind CSS
- TypeScript
- ESLint y Prettier

## Requisitos

- Node.js 22
- Angular CLI 19 (`npm install -g @angular/cli@19`)
- Git

Instalar el Angular CLI (una sola vez):

```bash
npm install -g @angular/cli
```

## Cómo instalar y arrancar

```bash
git clone https://github.com/SantiagoLuqueVillanueva/ChapuZappWeb.git
cd ChapuZappWeb
npm install
ng serve
```

Abre http://localhost:4200 en el navegador.

## Estructura de carpetas

Todo el código está en `src/app/`:

| Carpeta | Para qué sirve |
|---|---|
| `core/` | Servicios únicos, interceptores y guards |
| `shared/` | Componentes, pipes y modelos reutilizables |
| `features/` | Una carpeta por área: auth, home, search, professional, appointments, messages, profile |
| `layout/` | Cabecera, pie y estructura común |

Los ficheros de entorno (`environment.ts`) guardan la URL base de la API.

## Cómo trabajamos

Las reglas de ramas, commits y pull requests están en [CONTRIBUTING.md](CONTRIBUTING.md).

## Equipo

Adrián Sánchez, Santiago Luque y Adrián Gutiérrez.