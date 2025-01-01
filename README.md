# Kiosco Agrosavia 🌱☀️

![Versión](https://img.shields.io/badge/Versión-1.0-brightgreen)  
**Powered by ⚡ [Angular CLI](https://github.com/angular/angular-cli) version 18.0.5. ⚡**


## Features 

### Versión 1.0 (ACTUAL)
- **Multimedia:** Soporte para videos de YouTube, imágenes y archivos PDF.
- **Gestión centralizada:** Agregar, organizar y eliminar contenido desde la sección `/gestionar`.
- **Carrusel interactivo:** Contenido rotativo que muestra videos destacados.
- **Contenido adicional:** Los botones inferiores abren modales con contenido específico que no está en el carrusel.
- **Temas customizables:** Personalización de colores, con una configuración por defecto de verde agro, azul savia y blanco.
- **Backend robusto:** Implementado con **Prisma**, **Express.js** y **SQLite** para un manejo eficiente de datos.

### Versión Pasada
![Versión](https://img.shields.io/badge/Versión-0.0-blue)
- Piloto: Disponible **SOLO** para AgroTalento
- Tema: Colores verde agro, azul savia y blanco para el fondo.
- Gestión de videos en '/gestionar'
- Organizar orden de videos
- Todos los videos en el carrusel tienen referencia a los botones en la parte inferior.

## URLs importantes

1. **Base:** `'/'` - Página principal con la funcionalidad base del kiosco.
2. **Gestión:** `'/gestionar'` - Interfaz para administrar el contenido multimedia y los temas.


## Almacenamiento y Backend

- **Backend:** Ahora cuenta con un backend en [Kiosco Agrosavia Backend](https://github.com/Agrosavia/KioscoAgroTalentoBack) que incluye:
  - **Base de datos:** SQLite.
  - **ORM:** Prisma para manejo de entidades.
  - **Framework:** Express.js para rutas y APIs.


## Instalación y Uso

### Requisitos previos
- **Node.js**: v22.3.0 o superior.
- **Angular CLI**: v18.0.5.
- **Backend:** Clonar e iniciar el repositorio del backend ([instrucciones aquí](https://github.com/Agrosavia/KioscoAgroTalentoBack)).

### Instalación del frontend
```bash
# Seleccionar la versión correcta de Node.js
nvm use 22

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
ng serve
```

Se utilizan las sgtes tecnologías:

| Tecnología | Versión | Propósito | 
| ------ | ------ | ------- |
| Angular | v18.0.5 | General |
| FontAwesome | v6 | Iconos |
