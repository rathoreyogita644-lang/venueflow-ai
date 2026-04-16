import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Google Maps Loader
const loader = new window.google.maps.Loader({
  apiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Get free key
  version: "weekly",
  libraries: ["visualization"]
});

loader.load().then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
});

// PWA Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
