const API_URL = import.meta.env.PROD 
  ? 'https://your-production-api.com/api' 
  : 'http://localhost:5400/api';

export default API_URL; 