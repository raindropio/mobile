import { useMemo, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { suggestFields } from 'data/actions/bookmarks'
import { makeSuggestedFields } from 'data/selectors/bookmarks'
import { makeCollectionPath } from 'data/selectors/collections'
import { isPro } from 'data/selectors/user'

import { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { Strip, Wrap, SuggestionTap, SuggestionContent, SuggestionText } from './suggestions.style'

const self = { self: true }

export function useLoadSuggestions({ item }) {
    const dispatch = useDispatch()
    const enabled = useSelector(state=>state.config.ai_suggestions)
    const pro = useSelector(state=>isPro(state))

    useEffect(()=>{
        if (enabled && pro)
            dispatch(suggestFields(item))
    }, [item._id, item.media, enabled, pro])
}

//Collections
function Collection({ id, onSelectCollection }) {
    const getCollectionPath = useMemo(()=>makeCollectionPath(), [])
    const path = useSelector(state=>getCollectionPath(state, id, self))
    const shortPath = useMemo(()=>path.map((p)=>p.title).slice(-2).join(' / '), [path])
    const { color } = useMemo(()=>path?.[path.length-1] || {}, [path])

    if (!shortPath)
        return null

    return (
        <SuggestionTap onPress={()=>onSelectCollection(id)}>
            <SuggestionContent accent={color}>
                <SuggestionText>{shortPath}</SuggestionText>
            </SuggestionContent>
        </SuggestionTap>
    )
}

export function Collections({ item, onChange }) {
    const getSuggestedFields = useMemo(()=>makeSuggestedFields(), [])
    const { collections=[] } = useSelector(state=>getSuggestedFields(state, item))
    
    const onSelectCollection = useCallback(id=>
        onChange({ collectionId: id }),
        [onChange]
    )

    const style = useAnimatedStyle(()=>({
        opacity: withTiming(collections.length ? 1 : 0)
    }), [collections.length])

    if (!collections.length)
        return null

    return (
        <Strip>
            <Wrap style={style}>
                {collections.map(id=>(
                    <Collection key={id} id={id} onSelectCollection={onSelectCollection} />
                ))}
            </Wrap>
        </Strip>
    )
}

//Tags
function Tag({ tag, onAddTag }) {
    return (
        <SuggestionTap onPress={()=>onAddTag(tag)}>
            <SuggestionContent>
                <SuggestionText>{tag}</SuggestionText>
            </SuggestionContent>
        </SuggestionTap>
    )
}

export function Tags({ item, onChange }) {
    const getSuggestedFields = useMemo(()=>makeSuggestedFields(), [])
    const { tags=[] } = useSelector(state=>getSuggestedFields(state, item))

    const onAddTag = useCallback(tag=>
        onChange({ tags: [...item.tags, tag] }),
        [onChange, item.tags]
    )

    const style = useAnimatedStyle(()=>({
        opacity: withTiming(tags.length ? 1 : 0)
    }), [tags.length])

    if (!tags.length)
        return null

    return (
        <Strip>
            <Wrap style={style}>
                {tags.map(tag=>(
                    <Tag key={tag} tag={tag} onAddTag={onAddTag} />
                ))}
            </Wrap>
        </Strip>
    )
}