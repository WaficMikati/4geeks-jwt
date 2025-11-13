# Aplicación Full-Stack con Autenticación JWT

Una aplicación web full-stack con autenticación JWT, construida con React (Vite) en el frontend y Flask en el backend, usando PostgreSQL como base de datos.

## Stack Tecnológico

**Frontend:**
- React 18
- Vite 4
- React Router DOM 6

**Backend:**
- Flask (Python 3.13)
- Flask-SQLAlchemy
- Flask-JWT-Extended
- PostgreSQL

## Requisitos Previos

Antes de comenzar, asegúrate de tener lo siguiente instalado en tu máquina:

1. **Python 3.13** - [Descargar aquí](https://www.python.org/downloads/)
   - Verificar instalación: `python --version` o `python3 --version`

2. **Node.js 20.x o superior** - [Descargar aquí](https://nodejs.org/)
   - Verificar instalación: `node --version`
   - npm viene con Node.js: `npm --version`

3. **PostgreSQL** - [Descargar aquí](https://www.postgresql.org/download/)
   - Verificar instalación: `psql --version`
   - Asegúrate de que el servidor PostgreSQL esté en ejecución

4. **pipenv** - Gestor de dependencias de Python
   - Instalar: `pip install pipenv` o `pip3 install pipenv`
   - Verificar instalación: `pipenv --version`

## Configuración para Desarrollo Local

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

### 1. Clonar el Repositorio

```bash
git clone <url-de-tu-repositorio>
cd jwt
```

### 2. Configurar Variables de Entorno

Copia el archivo de ejemplo de variables de entorno y configúralo:

```bash
cp .env.example .env
```

Edita el archivo `.env` y actualiza las siguientes variables:

```bash
# Conexión a la base de datos (ajusta si tu PostgreSQL tiene credenciales diferentes)
DATABASE_URL=postgresql://postgres@localhost:5432/example

# Genera claves secretas seguras (¡IMPORTANTE: Cámbialas!)
FLASK_APP_KEY="tu-clave-secreta-aleatoria-aqui"
JWT_SECRET_KEY="tu-clave-jwt-secreta-aqui"
```

**Para generar claves secretas seguras**, ejecuta:
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 3. Configurar Base de Datos PostgreSQL

#### Opción A: Usando CLI de PostgreSQL

```bash
# Conectar a PostgreSQL (puede que necesites usar tu superusuario de PostgreSQL)
psql -U postgres

# Dentro de psql, crear la base de datos:
CREATE DATABASE example;

# Salir de psql
\q
```

#### Opción B: Usando el comando createdb

```bash
createdb example
```

### 4. Instalar Dependencias del Backend

```bash
# Instalar dependencias de Python usando pipenv
pipenv install

# Activar el entorno virtual
pipenv shell
```

### 5. Inicializar la Base de Datos

Ejecuta las migraciones de la base de datos para crear las tablas necesarias:

```bash
# Inicializar carpeta de migraciones (solo necesario la primera vez)
pipenv run init

# Crear archivos de migración
pipenv run migrate

# Aplicar migraciones a la base de datos
pipenv run upgrade
```

**Nota:** Si la carpeta migrations ya existe, omite el paso `init` y solo ejecuta:
```bash
pipenv run migrate
pipenv run upgrade
```

### 6. Instalar Dependencias del Frontend

Abre una nueva ventana de terminal (mantén la terminal del backend abierta) y ejecuta:

```bash
npm install
```

### 7. Iniciar los Servidores de Desarrollo

#### Terminal 1 - Backend (Flask):

```bash
# Asegúrate de estar en el shell de pipenv
pipenv shell

# Iniciar el servidor Flask (se ejecuta en http://127.0.0.1:3001)
pipenv run start
```

La API del backend estará disponible en: `http://127.0.0.1:3001`

#### Terminal 2 - Frontend (Vite):

```bash
# Iniciar el servidor de desarrollo de Vite (se ejecuta en http://localhost:3000)
npm run dev
```

El frontend estará disponible en: `http://localhost:3000`

### 8. Acceder a la Aplicación

Abre tu navegador y navega a:
```
http://localhost:3000
```

El frontend se conectará automáticamente a la API del backend que se ejecuta en el puerto 3001.

## Scripts Disponibles

### Backend (Python/Flask)

Todos los scripts del backend usan pipenv. Ejecútalos desde la raíz del proyecto:

```bash
pipenv run start          # Iniciar servidor de desarrollo Flask
pipenv run init           # Inicializar migraciones de base de datos
pipenv run migrate        # Generar nuevos archivos de migración
pipenv run upgrade        # Aplicar migraciones a la base de datos
pipenv run downgrade      # Revertir última migración
pipenv run insert-test-data  # Insertar datos de prueba (si el comando existe)
pipenv run reset_db       # Resetear migraciones de base de datos
```

### Frontend (Node/React)

```bash
npm run dev       # Iniciar servidor de desarrollo Vite
npm run start     # Alias para dev
npm run build     # Compilar para producción
npm run preview   # Previsualizar compilación de producción
npm run lint      # Ejecutar ESLint
```

## Estructura del Proyecto

```
jwt/
├── src/                      # Código fuente del backend
│   ├── api/
│   │   ├── models.py        # Modelos de base de datos
│   │   ├── routes.py        # Endpoints de la API
│   │   ├── admin.py         # Configuración de Flask admin
│   │   ├── commands.py      # Comandos CLI personalizados
│   │   └── utils.py         # Funciones utilitarias
│   ├── app.py               # Factory de aplicación Flask
│   └── wsgi.py              # Punto de entrada WSGI
├── src/                      # Código fuente del frontend (React)
│   └── (Componentes y páginas React)
├── migrations/               # Migraciones de base de datos
├── .devcontainer/           # Configuración del contenedor de desarrollo
├── .env                     # Variables de entorno (no rastreado)
├── .env.example             # Plantilla de variables de entorno
├── Pipfile                  # Dependencias de Python
├── package.json             # Dependencias de Node
└── vite.config.js           # Configuración de Vite
```

## Problemas Comunes y Solución de Problemas

### Problema: "role does not exist" al conectar a PostgreSQL

**Solución:** Asegúrate de que tu `DATABASE_URL` en `.env` coincida con tu nombre de usuario y nombre de base de datos de PostgreSQL. Actualízalo en consecuencia:

```bash
DATABASE_URL=postgresql://tu-usuario-postgres@localhost:5432/tu-nombre-de-bd
```

### Problema: Puerto 3000 o 3001 ya en uso

**Solución:** Mata el proceso que está usando el puerto:

```bash
# Encontrar el proceso
lsof -ti:3000  # o 3001

# Matarlo
kill -9 <id-del-proceso>
```

O cambia el puerto en los archivos de configuración.

### Problema: comando pipenv no encontrado

**Solución:** Instala pipenv:

```bash
pip install pipenv
# o
pip3 install pipenv
```

### Problema: Migraciones de base de datos fallando

**Solución:** Resetea las migraciones:

```bash
# Eliminar la carpeta migrations
rm -rf migrations/

# Re-inicializar
pipenv run init
pipenv run migrate
pipenv run upgrade
```

### Problema: Errores de módulo no encontrado en Python

**Solución:** Asegúrate de estar en el shell de pipenv:

```bash
pipenv shell
```

Luego intenta ejecutar tu comando nuevamente.

## Referencia de Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DATABASE_URL` | Cadena de conexión PostgreSQL | `postgresql://postgres@localhost:5432/example` |
| `FLASK_APP_KEY` | Clave secreta para sesiones de Flask | `clave-secreta-aleatoria` |
| `FLASK_APP` | Punto de entrada de la app Flask | `src/app.py` |
| `FLASK_DEBUG` | Habilitar modo debug de Flask | `1` |
| `DEBUG` | Bandera de debug general | `TRUE` |
| `JWT_SECRET_KEY` | Clave secreta para tokens JWT | `clave-jwt-secreta` |
| `VITE_BASENAME` | Ruta base para React Router | `/` |
| `VITE_BACKEND_URL` | URL de la API backend para el frontend | `http://127.0.0.1:3001` |

## Flujo de Trabajo de Desarrollo

1. **Hacer cambios en el código del backend** - Flask se recargará automáticamente
2. **Hacer cambios en el código del frontend** - Vite hará hot-reload
3. **Crear cambios en modelos de base de datos** - Ejecuta `pipenv run migrate` y `pipenv run upgrade`
4. **Probar tus cambios** - Accede a `http://localhost:3000`

## Recursos Adicionales

- [Documentación de Flask](https://flask.palletsprojects.com/)
- [Documentación de React](https://react.dev/)
- [Documentación de Vite](https://vitejs.dev/)
- [Documentación de Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/)
- [Documentación de Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/)

## Soporte

Si encuentras algún problema no cubierto en este README, por favor:
1. Revisa la sección de solución de problemas arriba
2. Revisa tus variables de entorno en `.env`
3. Asegúrate de que todos los requisitos previos estén instalados correctamente
4. Verifica que PostgreSQL esté en ejecución

## Licencia

ISC
