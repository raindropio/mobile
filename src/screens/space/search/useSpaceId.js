import { useSelector } from 'react-redux'

export default function useSpaceId({ spaceId=0 }) {
    const incollection = useSelector(state=>state.config.raindrops_search_incollection)

    const id = incollection ? parseInt(spaceId)+'s' : '0s'

    return id
}