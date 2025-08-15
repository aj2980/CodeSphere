// Dynamic API base URL - uses current domain in production, localhost in development
const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
const baseUrl = isProduction 
  ? window.location.origin 
  : "http://localhost:3000";

export const api_base_url = `${baseUrl}/api`;