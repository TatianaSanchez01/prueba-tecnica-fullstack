# Prueba Técnica Fullstack - Gestión de Ingresos y Gastos

Este proyecto es una aplicación web fullstack diseñada para la gestión de movimientos financieros (ingresos y egresos), la administración de usuarios y la visualización de reportes detallados.

## 🚀 Funcionalidades

### 1. Autenticación y Seguridad

- **Autenticación con GitHub**: Implementada mediante [Better Auth](https://www.better-auth.com/).
- **Control de Acceso basado en Roles (RBAC)**:
  - **ADMIN**: Acceso total (Movimientos, Usuarios, Reportes).
  - **USER**: Acceso limitado exclusivamente a la gestión de movimientos.
- **Asignación Automática**: Por requisitos de la prueba, todos los nuevos usuarios registrados reciben automáticamente el rol `ADMIN`.

### 2. Gestión de Ingresos y Gastos

- Visualización de movimientos en una tabla interactiva (Concepto, Monto, Fecha, Usuario).
- Creación de nuevos movimientos (Solo administradores).
- Formulario validado con **React Hook Form** y **Zod**.

### 3. Gestión de Usuarios (Admin Only)

- Listado de usuarios registrados.
- Edición de perfiles (Nombre y Rol).

### 4. Reportes y Estadísticas

- Gráficos dinámicos de movimientos financieros utilizando **Recharts**.
- Visualización del saldo actual.
- **Exportación a CSV**: Descarga de reportes detallados para análisis externo.

### 5. Documentación de API

- Swagger UI integrado en `/api/docs` para explorar y probar los endpoints del backend.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**: [Next.js](https://nextjs.org/) (Page Router), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/).
- **Componentes UI**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI), [Lucide React](https://lucide.dev/).
- **Autenticación**: [Better Auth](https://www.better-auth.com/) con adaptador de Prisma.
- **Base de Datos**: [PostgreSQL](https://www.postgresql.org/) (Alojado en **Supabase**).
- **ORM**: [Prisma](https://www.prisma.io/).
- **Gráficos**: [Recharts](https://recharts.org/).
- **Validación**: [Zod](https://zod.dev/).

---

## 💻 Configuración Local

### Requisitos Previos

- Node.js (v18 o superior)
- Una base de Datos PostgreSQL (o cuenta en Supabase)
- Una cuenta de GitHub para configurar OAuth

### Pasos para la instalación

1. **Clonar el repositorio**:

   ```bash
   git clone <url-del-repositorio>
   cd prueba-tecnica-fullstack
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   Crea un archivo `.env` en la raíz del proyecto basándote en la siguiente estructura:

   ```env
   # Base de datos (Supabase recomendado)
   DATABASE_URL="postgresql://user:password@host:port/dbname?pgbouncer=true"
   DIRECT_URL="postgresql://user:password@host:port/dbname"

   # GitHub OAuth
   GITHUB_CLIENT_ID="tu_client_id"
   GITHUB_CLIENT_SECRET="tu_client_secret"

   # Better Auth
   BETTER_AUTH_SECRET="un_secreto_aleatorio_de_32_caracteres"
   NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
   ```

4. **Configurar la Base de Datos**:
   Genera el cliente de Prisma y sincroniza el esquema:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Ejecutar el proyecto**:
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## 🔑 Configuración de Autenticación con GitHub

Para que la autenticación funcione, debes crear una **OAuth App** en GitHub:

1. Ve a **Settings > Developer settings > OAuth Apps > New OAuth App**.
2. **Homepage URL**: `http://localhost:3000` (o tu URL de Vercel).
3. **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github` (Añade también la URL de Vercel si estás desplegando).
4. Copia el `Client ID` y el `Client Secret` en tu archivo `.env`.

---

## 🚀 Despliegue en Vercel

1. Sube tu código a un repositorio de GitHub.
2. Crea un nuevo proyecto en [Vercel](https://vercel.com/) e impórtalo.
3. Configura las **Environment Variables** en Vercel con los mismos valores de tu `.env`.
   - Asegúrate de actualizar `NEXT_PUBLIC_BETTER_AUTH_URL` con la URL de producción proporcionada por Vercel.
4. En la configuración del proyecto en Vercel, asegúrate de que el comando de instalación incluya la generación de Prisma:
   - **Install Command**: `npm install && npx prisma generate`
5. Vercel detectará automáticamente que es un proyecto de Next.js. ¡Despliega!

---

## 📁 Estructura del Proyecto

- `/pages`: Rutas y API endpoints.
- `/components`: Componentes reutilizables (Atoms, Molecules, Organisms).
- `/lib`: Configuraciones de Auth, Prisma y utilidades.
- `/prisma`: Esquema de la base de datos.
- `/__tests__`: Pruebas unitarias.

---

Desarrollado como parte de una prueba técnica para **Prevalentware**.
