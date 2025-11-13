# JWT Authentication Full-Stack Application

A full-stack web application with JWT authentication, built with React (Vite) on the frontend and Flask on the backend, using PostgreSQL as the database.

## Tech Stack

**Frontend:**
- React 18
- Vite 4
- React Router DOM 6

**Backend:**
- Flask (Python 3.13)
- Flask-SQLAlchemy
- Flask-JWT-Extended
- PostgreSQL

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

1. **Python 3.13** - [Download here](https://www.python.org/downloads/)
   - Verify installation: `python --version` or `python3 --version`

2. **Node.js 20.x or higher** - [Download here](https://nodejs.org/)
   - Verify installation: `node --version`
   - npm comes with Node.js: `npm --version`

3. **PostgreSQL** - [Download here](https://www.postgresql.org/download/)
   - Verify installation: `psql --version`
   - Make sure PostgreSQL server is running

4. **pipenv** - Python dependency manager
   - Install: `pip install pipenv` or `pip3 install pipenv`
   - Verify installation: `pipenv --version`

## Local Development Setup

Follow these steps to get the project running on your local machine:

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd jwt
```

### 2. Set Up Environment Variables

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit the `.env` file and update the following variables:

```bash
# Database connection (adjust if your PostgreSQL has different credentials)
DATABASE_URL=postgresql://postgres@localhost:5432/example

# Generate secure secret keys (IMPORTANT: Change these!)
FLASK_APP_KEY="your-random-secret-key-here"
JWT_SECRET_KEY="your-random-jwt-secret-here"
```

**To generate secure secret keys**, run:
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 3. Set Up PostgreSQL Database

#### Option A: Using PostgreSQL CLI

```bash
# Connect to PostgreSQL (you may need to use your PostgreSQL superuser)
psql -U postgres

# Inside psql, create the database:
CREATE DATABASE example;

# Exit psql
\q
```

#### Option B: Using createdb command

```bash
createdb example
```

### 4. Install Backend Dependencies

```bash
# Install Python dependencies using pipenv
pipenv install

# Activate the virtual environment
pipenv shell
```

### 5. Initialize the Database

Run database migrations to create the necessary tables:

```bash
# Initialize migration folder (only needed first time)
pipenv run init

# Create migration files
pipenv run migrate

# Apply migrations to database
pipenv run upgrade
```

**Note:** If migrations folder already exists, skip the `init` step and just run:
```bash
pipenv run migrate
pipenv run upgrade
```

### 6. Install Frontend Dependencies

Open a new terminal window (keep the backend terminal open) and run:

```bash
npm install
```

### 7. Start the Development Servers

#### Terminal 1 - Backend (Flask):

```bash
# Make sure you're in the pipenv shell
pipenv shell

# Start the Flask server (runs on http://127.0.0.1:3001)
pipenv run start
```

The backend API will be available at: `http://127.0.0.1:3001`

#### Terminal 2 - Frontend (Vite):

```bash
# Start the Vite development server (runs on http://localhost:3000)
npm run dev
```

The frontend will be available at: `http://localhost:3000`

### 8. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

The frontend will automatically connect to the backend API running on port 3001.

## Available Scripts

### Backend (Python/Flask)

All backend scripts use pipenv. Run these from the project root:

```bash
pipenv run start          # Start Flask development server
pipenv run init           # Initialize database migrations
pipenv run migrate        # Generate new migration files
pipenv run upgrade        # Apply migrations to database
pipenv run downgrade      # Rollback last migration
pipenv run insert-test-data  # Insert test data (if command exists)
pipenv run reset_db       # Reset database migrations
```

### Frontend (Node/React)

```bash
npm run dev       # Start Vite development server
npm run start     # Alias for dev
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## Project Structure

```
jwt/
├── src/                      # Backend source code
│   ├── api/
│   │   ├── models.py        # Database models
│   │   ├── routes.py        # API endpoints
│   │   ├── admin.py         # Flask admin configuration
│   │   ├── commands.py      # Custom CLI commands
│   │   └── utils.py         # Utility functions
│   ├── app.py               # Flask application factory
│   └── wsgi.py              # WSGI entry point
├── src/                      # Frontend source code (React)
│   └── (React components and pages)
├── migrations/               # Database migrations
├── .devcontainer/           # Dev container configuration
├── .env                     # Environment variables (not tracked)
├── .env.example             # Environment variables template
├── Pipfile                  # Python dependencies
├── package.json             # Node dependencies
└── vite.config.js           # Vite configuration
```

## Common Issues and Troubleshooting

### Issue: "role does not exist" when connecting to PostgreSQL

**Solution:** Make sure your `DATABASE_URL` in `.env` matches your PostgreSQL username and database name. Update it accordingly:

```bash
DATABASE_URL=postgresql://your-postgres-username@localhost:5432/your-database-name
```

### Issue: Port 3000 or 3001 already in use

**Solution:** Kill the process using the port:

```bash
# Find the process
lsof -ti:3000  # or 3001

# Kill it
kill -9 <process-id>
```

Or change the port in the configuration files.

### Issue: pipenv command not found

**Solution:** Install pipenv:

```bash
pip install pipenv
# or
pip3 install pipenv
```

### Issue: Database migrations failing

**Solution:** Reset the migrations:

```bash
# Delete the migrations folder
rm -rf migrations/

# Re-initialize
pipenv run init
pipenv run migrate
pipenv run upgrade
```

### Issue: Module not found errors in Python

**Solution:** Make sure you're in the pipenv shell:

```bash
pipenv shell
```

Then try running your command again.

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres@localhost:5432/example` |
| `FLASK_APP_KEY` | Secret key for Flask sessions | `random-secret-key` |
| `FLASK_APP` | Flask app entry point | `src/app.py` |
| `FLASK_DEBUG` | Enable Flask debug mode | `1` |
| `DEBUG` | General debug flag | `TRUE` |
| `JWT_SECRET_KEY` | Secret key for JWT tokens | `random-jwt-secret` |
| `VITE_BASENAME` | Base path for React Router | `/` |
| `VITE_BACKEND_URL` | Backend API URL for frontend | `http://127.0.0.1:3001` |

## Development Workflow

1. **Make changes to backend code** - Flask will auto-reload
2. **Make changes to frontend code** - Vite will hot-reload
3. **Create database model changes** - Run `pipenv run migrate` and `pipenv run upgrade`
4. **Test your changes** - Access `http://localhost:3000`

## Additional Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Flask-SQLAlchemy Documentation](https://flask-sqlalchemy.palletsprojects.com/)
- [Flask-JWT-Extended Documentation](https://flask-jwt-extended.readthedocs.io/)

## Support

If you encounter any issues not covered in this README, please:
1. Check the troubleshooting section above
2. Review your environment variables in `.env`
3. Ensure all prerequisites are properly installed
4. Check that PostgreSQL is running

## License

ISC
