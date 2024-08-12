# Carbooking App

Demo Link: https://carbooking-app.vercel.app/

## Getting Started

### Prerequisites

- Node.js and npm (v20 or higher)
- Docker (optional)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/abdulkader/carbooking-app.git
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your Google Maps API key:

```bash
VITE_GOOGLE_MAPS_API_KEY=YOUR_API_KEY
```
> `Note: Without this, application will work, but it will not be able to display the map properly and google maps api may not work.`

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173/` to view the application.

## Contributing

Contributions are welcome! If you find a bug or have a suggestion, please open an issue or submit a pull request.

## TODO

1. Since API is not available, currently the data is saved in the local storage.
2. You can clear the local storage to start fresh.


## Docker

To build and run the Docker image, use the following commands:

```bash
docker build -t carbooking-app:latest .
docker run -p 3000:80 -it --rm carbooking-app:latest
```

The application will be available at `http://localhost:3000/`.

### Docker for Development

To build and run the Docker image for development, use the following commands:

```bash
docker-compose up app
```

The application will be available at `http://localhost:5173/`.