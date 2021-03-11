import { useSelector } from 'react-redux'

export default function useCollectionId(params) {
    const { collectionId } = params

    const autoSaveToCollectionId = useSelector(state=>
        state.config.add_auto_save ?
            state.config.add_default_collection || state.config.last_collection :
            undefined
    )

    return collectionId || autoSaveToCollectionId
}