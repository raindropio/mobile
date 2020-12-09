import React, { useCallback } from 'react'
import { Press, Image } from './style'
import CollectionIcon from 'co/collections/item/icon'

export default function CollectionCoverItem({ png, onSelect }) {
    const onPress = useCallback(()=>{
        onSelect(png)
    }, [png])

    return (
        <Press onPress={onPress}>
            {png ? (
                <Image source={{ uri: png }} />
            ) : (
                <CollectionIcon /> //default folder icon
            )}
        </Press>
    )
}