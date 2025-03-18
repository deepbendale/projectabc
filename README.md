# Drone Map Control

A React-based web application for drone control and mapping visualization.

## Project Structure

```
droneMap/
├── src/
│   ├── components/
│   │   ├── map/
│   │   │   └── MapComponent.jsx      # Map visualization component
│   │   └── controls/
│   │       └── DroneControls.jsx     # Drone control interface
│   ├── services/
│   │   └── droneService.js           # Drone operations service layer
│   ├── utils/
│   │   └── mapUtils.js               # Map utility functions
│   ├── styles/                       # CSS and style-related files
│   ├── App.jsx                       # Main application component
│   ├── main.jsx                      # Application entry point
│   └── index.css                     # Global styles
├── public/                           # Static assets
└── package.json                      # Project dependencies and scripts
```

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Technology Stack

- React
- Tailwind CSS
- Vite
