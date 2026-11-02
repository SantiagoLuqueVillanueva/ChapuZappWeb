# Cómo trabajamos con Git

Reglas comunes del equipo para los tres repositorios de ChapuZapp (backend, web Angular y app Android).

## Ramas

| Rama | Para qué sirve |
|---|---|
| `main` | Versión entregable. Solo recibe cambios desde `develop` cuando hay una entrega. |
| `develop` | Integración. Aquí se juntan los cambios de todos. Es la rama por defecto. |
| `guti`, `santi`, `sanchez` | Rama de trabajo de cada miembro, con su nombre. Cada uno trabaja solo en la suya. |

Antes de abrir un pull request, actualiza tu rama con lo último de `develop` y resuelve los conflictos en tu rama:

```bash
git switch tu-rama
git pull origin develop
```

## Commits

No hay un formato fijo. Cada commit lleva una frase sencilla y clara que diga qué se ha hecho, para que cualquiera del equipo lo entienda sin abrir el código.

Ejemplos válidos:

- Añadido el formulario de login
- Corregido el error al guardar una cita
- Maquetada la pantalla de perfil del profesional

No valen mensajes vacíos o genéricos como "cambios", "arreglos" o "wip".

## Pull requests

- Siempre desde tu rama personal hacia `develop`.
- Hace falta al menos una aprobación antes de fusionar. Santi es el revisor principal.
- Al abrir el pull request se rellena la plantilla que aparece automáticamente.

## Protección de ramas

No se puede subir directamente a `main` ni a `develop`: todo entra mediante pull request.

## Relación con Jira

- Al empezar una historia se pasa a **En curso**.
- Se cierra cuando su pull request está fusionado en `develop`.