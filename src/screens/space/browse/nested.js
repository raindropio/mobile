import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { makeNested } from 'data/selectors/collections'

import { Strip, Wrap, CollectionTap, CollectionContent, CollectionText } from './nested.style'
import CollectionIcon from 'co/collections/item/icon'

export default function Nested({ spaceId, onCollectionPress }) {
    const getNested = useMemo(()=>makeNested(), [])
    const collections = useSelector(state=>getNested(state, spaceId))

    if (!collections.length)
        return null

    return (
        <Strip>
            <Wrap>
                {collections.map(({ _id, cover, title })=>(
                    <CollectionTap key={_id} onPress={()=>onCollectionPress(_id)}>
                        <CollectionContent>
                            <CollectionIcon 
                                collectionId={_id} 
                                src={cover?.[0]}
                                size={20} />

                            <CollectionText>{title}</CollectionText>
                        </CollectionContent>
                    </CollectionTap>
                ))}
            </Wrap>
        </Strip>
    )
}