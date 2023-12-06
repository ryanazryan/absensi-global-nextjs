import Axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
})

// Add a request interceptor to add the CSRF token to the headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Membaca token CSRF dari cookie
    const csrfToken = Cookies.get('XSRF-TOKEN')

    // Menambahkan token CSRF ke header permintaan
    config.headers['X-XSRF-TOKEN'] = csrfToken

    return config
  },
  (error) => {
    // Handle request errors here
    console.error('Axios request error:', error)
    return Promise.reject(error)
  }
)

// Add a response interceptor to handle successful responses
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses here if needed
    return response
  },
  (error) => {
    // Handle errors here
    console.error('Axios error:', error)
    // You can also throw the error to propagate it further if needed
    throw error
  }
)

export default axiosInstance
