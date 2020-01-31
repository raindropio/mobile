import { API_ENDPOINT_URL } from '../../constants/app'

export default function(bookmarkID){
    return `${API_ENDPOINT_URL}raindrop/${bookmarkID}/cache`
}