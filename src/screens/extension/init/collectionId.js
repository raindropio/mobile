import { useSelector } from 'react-redux'

export default function useCollectionId() {
    return useSelector(state=>
        state.config.add_auto_save ?
            state.config.add_default_collection || state.config.last_collection :
            undefined
    )
}