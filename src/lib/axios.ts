import Axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

const axios = Axios.create({
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    baseURL: baseURL
})

export const csrf = () => axios.get(baseURL + '/sanctum/csrf-cookie')

export default axios
