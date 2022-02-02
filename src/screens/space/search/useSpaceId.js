import { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { isTablet } from 'modules/native'
import SpaceContext from '../context'

export default function useSpaceId({ spaceId=0 }) {
    const incollection = useSelector(state=>state.config.raindrops_search_incollection)

    const id = incollection ? parseInt(spaceId)+'s' : '0s'

    //update space context
    const { setSpaceId } = useContext(SpaceContext)
    useEffect(()=>{
        if (isTablet)
            setSpaceId(parseInt(id))
    }, [id])

    return id
}