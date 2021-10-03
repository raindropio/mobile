import React, { useCallback } from 'react'
import Button from 'co/button'
import useQuery from '../useQuery'

export default function SpaceSearchHeaderMenu({ route: { params }, navigation }) {
    const { query, wait, setQuery } = useQuery(params, navigation)
    const onPress = useCallback(()=>{
        setQuery(wait ? query : query.trim()+' ', !wait)
    }, [query, wait])

    if (!query) return null

    return (
        <Button 
            icon='equalizer'
            color={wait ? 'color.accent' : 'text.secondary'}
            variant={wait ? 'fill' : 'line'}
            onPress={onPress} />
    )
}