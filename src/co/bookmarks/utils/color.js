import { store } from 'data'
import { bookmark } from 'data/selectors/bookmarks'
import collectionColor from 'co/collections/utils/color'

export default _id => {
    const { collectionId } = bookmark(store.getState(), _id)
    return collectionColor(collectionId)
}