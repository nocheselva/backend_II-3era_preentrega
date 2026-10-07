# Backend II - Pre-entrega 3: Autenticación con JWT y Cookies HttpOnly

Servidor backend desarrollado con Node.js, Express, MongoDB Atlas y Mongoose que implementa el registro de usuarios, hash seguro de contraseñas con `bcrypt`, autenticación mediante tokens JWT almacenados en cookies `HttpOnly` y protección de rutas con middleware.

---

## 🛠️ Tecnologías Utilizadas

- **Node.js** & **Express**
- **MongoDB Atlas** & **Mongoose**
- **jsonwebtoken** (JWT)
- **cookie-parser**
- **bcrypt**
- **dotenv**

---

## 📋 Tabla de Rutas

| Método | Path | Descripción | Cookie Requerida |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/sessions/register` | Registro de nuevos usuarios con contraseña hasheada | No |
| `POST` | `/api/sessions/login` | Autenticación de usuario. Devuelve cookie `HttpOnly` | No |
| `GET` | `/api/sessions/current` | Devuelve la información del usuario autenticado | Sí (`currentUser`) |
| `POST` | `/api/sessions/logout` | Cierra la sesión limpiando la cookie `currentUser` | No |

---

## 📝 Ejemplos de Request y Response

### 1. Registro (`POST /api/sessions/register`)
**Request Body:**
```json
{
  "first_name": "Ana",
  "last_name": "Gomez",
  "email": "ana.gomez@mail.com",
  "password": "Secreta123"
}
```
**Response (`201 Created`):**
```json
{
  "status": "success",
  "payload": {
    "id": "67a123456789...",
    "first_name": "Ana",
    "last_name": "Gomez",
    "email": "ana.gomez@mail.com",
    "role": "user"
  }
}
```

---

### 2. Login (`POST /api/sessions/login`)
**Request Body:**
```json
{
  "email": "ana.gomez@mail.com",
  "password": "Secreta123"
}
```
**Response (`200 OK` + Set-Cookie `currentUser`):**
```json
{
  "status": "success",
  "message": "Login correcto"
}
```

---

### 3. Usuario Actual (`GET /api/sessions/current`)
**Request Headers:** Contiene la cookie `currentUser`.  
**Response (`200 OK`):**
```json
{
  "status": "success",
  "payload": {
    "id": "67a123456789...",
    "email": "ana.gomez@mail.com",
    "role": "user"
  }
}
```

**Response sin Cookie (`401 Unauthorized`):**
```json
{
  "status": "error",
  "message": "No autenticado"
}
```

---

## 📸 Evidencias de Prueba

Las capturas de pantalla de las pruebas de Postman se encuentran alojadas en la carpeta `docs/`:
1. **Registro Exitoso (`201 Created`)**
2. **Login y generación de Cookie `HttpOnly` (`200 OK`)**
3. **Consulta de `/current` con autenticación activa (`200 OK`)**
4. **Consulta de `/current` rechazada sin Cookie (`401 Unauthorized`)**

---

## 🚀 Configuración Local

1. Clonar repositorio:
   ```bash
   git clone [https://github.com/nocheselva/backend_II-3era_preentrega.git](https://github.com/nocheselva/backend_II-3era_preentrega.git)
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Crear archivo `.env` basado en `.env.example` y configurar las credenciales.
4. Iniciar servidor:
   ```bash
   npm run dev
   ```