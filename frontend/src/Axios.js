import axios from 'axios'

// Use REACT_APP_API_URL when provided (for deployed/staging),
// otherwise default to the local backend during development.
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const instance = axios.create({
    baseURL,
})

export default instance
