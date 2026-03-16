# 🐾 PetFinder - Plataforma Integral de Rescate y Adopción 🐾

Plataforma Full-Stack desarrollada para centralizar y agilizar el reporte de mascotas perdidas, encontradas y en adopción. El sistema permite a los usuarios publicar reportes geolocalizados, gestionar imágenes en la nube e interactuar mediante comentarios, todo bajo un sistema seguro de autenticación.

## Enlaces en Producción
- **Frontend (Live Demo):** https://pet-finder-fullstack.vercel.app/
- **Backend (API REST):** https://petfinder-fullstack.onrender.com/api

---

## Características Principales

- **Autenticación y Seguridad:** Registro e inicio de sesión utilizando JSON Web Tokens (JWT). Los tokens se almacenan y transmiten de forma segura mediante Cookies `HttpOnly` y configuraciones estrictas de CORS, protegiendo contra ataques XSS.
- **Geolocalización:** Integración de mapas interactivos para visualizar la zona exacta donde una mascota fue perdida o encontrada.
- **Gestión de Medios:** Subida de imágenes procesadas en el backend y almacenadas asíncronamente en la nube para un rendimiento óptimo.
- **Rendimiento Frontend:** Renderizado optimizado de formularios para evitar re-renderizados innecesarios en la interfaz.
- **Diseño Adaptable:** Interfaz fluida y responsiva que garantiza una experiencia de usuario perfecta tanto en escritorio como en dispositivos móviles, previniendo desbordamientos horizontales.

---

## Stack Tecnológico

El proyecto está construido bajo la arquitectura del ecosistema **MERN** y dividido en un entorno de Monorepo (Cliente / Servidor).

### Frontend (`/client`)
- **Core:** React.js
- **Estilos y UI:** Tailwind CSS
- **Enrutamiento:** React Router DOM (Manejo de rutas privadas y navegación fluida)
- **Manejo de Formularios y Estado:** React Hook Form
- **Peticiones HTTP:** Axios (Configurado con interceptores para envío automático de credenciales)
- **Mapas:** Leaflet, React-Leaflet
- **Notificaciones:** React Hot Toast
- **Animaciones:** Framer Motion

### Backend (`/server`)
- **Core:** Node.js, Express.js
- **Base de Datos:** MongoDB, Mongoose (Modelado de datos)
- **Validación de Esquemas:** Zod (Validación estricta de esquemas de datos en tiempo de ejecución)
- **Autenticación:** Bcryptjs (Hashing de contraseñas), JSON Web Token (JWT)
- **Manejo de Archivos:** Multer, Cloudinary
- **Middlewares y Utilidades:** Cookie-parser, Morgan, CORS

---

## Capturas de la Interfaz
| Home  | Vista Móvil (Responsive) |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/5482a6dc-a6c8-491f-8d9a-0108d943cd74" width="100%" alt="Detalle" /> | <img src="https://github.com/user-attachments/assets/ae69df3c-5d67-4d84-b2f7-e08d2425ee51" width="300" alt="Móvil" /> |
| Feed de Publicaciones |
|  <img src="https://github.com/user-attachments/assets/9689daa9-5616-479d-b124-52ff0951a570" width="100%" alt="Detalle" /> | <img src="https://github.com/user-attachments/assets/e1106155-0916-4f1d-803a-315ecf892e4e" width="300" alt="Móvil" /> |
| Detalle de Publicación |
| <img src="https://github.com/user-attachments/assets/22fe1894-1317-41c4-a19e-640528cd04b2" width="100%" alt="Detalle" /> | <img src="https://github.com/user-attachments/assets/972b95b7-a74d-48bc-8a4f-7a0714e0071b" width="300" alt="Móvil" /> |
| Perfil |
| <img src="https://github.com/user-attachments/assets/2b1ce5c1-78ca-4de1-bc63-cc81e3eb234d" width="100%" alt="Detalle" /> | <img src="https://github.com/user-attachments/assets/b71b6f8c-7998-4c25-b369-19b874fb63bf" width="300" alt="Móvil" /> |
| Crear Publicacion |
|  <img src="https://github.com/user-attachments/assets/6ae1dde0-01c0-413e-b216-05425ce93ae3" width="100%" alt="Detalle" /> | <img src="https://github.com/user-attachments/assets/9502c297-79f0-49b8-8709-fdf075f32e42" width="300" alt="Móvil" /> |
| Comentarios y Mapa |
|  <img src="https://github.com/user-attachments/assets/acc450da-0677-4d7b-9427-29d7e0dd63d1" width="100%" alt="Detalle" /> | <img src="https://github.com/user-attachments/assets/b6c16cd9-991e-4f3f-9d35-f2a7d7572f60" width="300" alt="Móvil" /> |
| Inicio de Sesion |
|  <img src="https://github.com/user-attachments/assets/ef9fde7f-8a63-4db8-bb12-3b1c5e5784cb" width="100%" alt="Detalle" /> | <img src="https://github.com/user-attachments/assets/a41e489a-0ada-4989-b257-55369da6b516" width="300" alt="Móvil" /> |

---

## Sobre el Desarrollador
### Joaquín Coaricona
Desarrollador Web Full-Stack Junior | Estudiante avanzado de Ing. en Sistemas (UTN)

Soy estudiante de 5.º año de Ingeniería en Sistemas de Información en la UTN, a dos materias de finalizar la carrera. Me enfoco en el desarrollo web Full-Stack con el ecosistema MERN. Actualmente busco mi primera experiencia profesional para participar en proyectos donde pueda seguir aprendiendo y aportar desde el desarrollo.
