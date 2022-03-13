import { API_ENDPOINT_URL } from 'data/constants/app'

export default function cacheUrl(id) {
    return `${API_ENDPOINT_URL}raindrop/${id}/cache`
}