import Axios from 'axios';

const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

// Add a response interceptor to handle successful responses
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses here if needed
    return response;
  },
  (error) => {
    // Handle errors here
    console.error('Axios error:', error);
    // You can also throw the error to propagate it further if needed
    throw error;
  }
);

export default axiosInstance;
