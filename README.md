

### `npm start`

 # Presentación del Proyecto: Concesionario de Coches
## 1. Objetivo del Proyecto
##### Desarrollar una plataforma web para gestionar un concesionario de vehículos, permitiendo:
 - Visualizar y filtrar coches.
 - Gestionar favoritos.
 - Realizar reservas.
 - Analizar datos con gráficos.
 - Administrar el inventario (CRUD).
## 2. Tecnologías Utilizadas
 #### Frontend:
- React.js + Vite
- React Router
- React-Bootstrap
- Chart.js / Recharts
- Context API (Gestión de estado)
#### Backend:
- API REST en Render (Node.js/Express)
- Base de datos (MongoDB/PostgreSQL)
- Otros:
- Git/GitHub (Control de versiones)
- Postman (Pruebas de API)
## 3. Requisitos Cumplidos
### Requisito
- Implementación
- Conexión a API
- Consumo de endpoints para obtener datos de coches.
- Zona de Favoritos
- Contexto para guardar favoritos temporalmente.
- Eventos de Usuario
- Hover, clics, formularios interactivos.
- Gráficos
- Gráficos de barras y pastel con datos dinámicos.
- Formulario de Subida
- Formulario para añadir coches, integrado con la API.
- Diseño Responsive
- Uso de Bootstrap para adaptación a móviles.

## 4. Funcionalidades Clave
 ### Catálogo Interactivo:
- Filtros por marca, precio, combustible.
- Ordenación por diferentes criterios.
- Gestión de Favoritos:
- Añadir/eliminar sin necesidad de login.
- Sistema de Reservas:
- Flujo de 3 pasos (Datos, Pago, Confirmación).
### Panel de Estadísticas:
- Visualización de datos con gráficos interactivos.
- Administración:
- Añadir nuevos vehículos mediante formulario.
## 5. Desafíos y Soluciones
- Desafío: Sincronización de datos en tiempo real.
- Solución: Uso de React Query para revalidar datos.
- Desafío: Validación de formularios complejos.
- Solución: Integración con Formik y Yup.
- Desafío: Manejo de estados globales.
- Solución: Context API para favoritos y reservas.
## 6. Próximas Mejoras
### Autenticación de Usuarios:
- Login/registro con JWT.
- Panel de Administración:
- Editar/eliminar coches existentes.
### Notificaciones en Tiempo Real:
- WebSockets para actualizaciones.
- Despliegue en Producción:
- Configurar CI/CD con GitHub Actions.
## 7. Demo en Vivo
- URL de la Aplicación: https://concesionario-react.vercel.app/
- Repositorio GitHub: https://github.com/EmilioPastor/concesionario-react





### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
