# Backend API

Backend API for DigitalHeroes project.

## Folder Structure

```
backend/
├── src/
│   ├── routes/          # API routes
│   ├── controllers/      # Route controllers
│   ├── models/          # Database models
│   ├── middleware/      # Custom middleware
│   ├── config/          # Configuration files
│   ├── utils/           # Utility functions
│   └── index.js         # Entry point
├── tests/               # Test files
├── package.json         # Dependencies
├── .env                 # Environment variables
└── README.md
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file with configuration

3. Start development server:
   ```bash
   npm run dev
   ```

4. Start production server:
   ```bash
   npm start
   ```

## API Endpoints

- `GET /api/health` - Check server status
