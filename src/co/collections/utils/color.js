import { store } from 'data'

export default function(_id) {
    const collections = store.getState().collections
    return (
        (collections.items[_id] && collections.items[_id].color) ? 
            collections.items[_id].color :
            collections.colors[_id]
    )
}