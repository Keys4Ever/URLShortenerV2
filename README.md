# URLShortenerV2

Second version of my URL Shortener. This one will have a frontend built with React, and a backend powered by Node.js.

## Features

- Shorten long URLs into manageable links.
- Tags for the urls
- Frontend:
  - Built using React for a modern and responsive user interface.
  - Clean and intuitive design.
- Backend:
  - Developed with Node.js for robust and scalable API handling.
  - Includes URL validation and postgres database integration.
- Fully deployable on an Ubuntu server.

## Prerequisites

To run the project locally or deploy it, ensure you have the following installed:

- **Node.js** (v16 or higher recommended)
- **pnpm** (for package management)
- **Git**
- **Nginx** (for production deployment)

## Installation and Usage

### Clone the Repository
```bash
git clone https://github.com/yourusername/URLShortenerV2.git
cd URLShortenerV2
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the `Backend` directory.
   - Add the variables as in .env.example
4. Start the backend server:
   ```bash
   pnpm run start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Add the enviroment as in .env.example
   
4. Run the development server:
   ```bash
   pnpm run dev
   ```
   The application should now be available at `http://localhost:5173`.


## Roadmap
- [ ] Track analytics for shortened URLs (clicks per day, etc.).
- [ ] Enhance error handling on the frontend.
- [ ] Dockerize the project for easier deployment.

## License

This project is licensed under the MIT License.
