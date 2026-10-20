import { useMemo, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { suggestFields } from 'data/actions/bookmarks'
import { makeSuggestedFields } from 'data/selectors/bookmarks'
import { makeCollectionPath } from 'data/selectors/collections'
import { isPro } from 'data/selectors/user'

import Collapsible from 'co/style/collapsible'
import { Strip, Wrap, SuggestionTap, SuggestionContent, SuggestionText } from './suggestions.style'

const self = { self: true }

export function useLoadSuggestions({ item }) {
    const dispatch = useDispatch()
    const enabled = useSelector(state=>state.config.ai_suggestions)
    const pro = useSelector(state=>isPro(state))

    //only refetch when identity/media changes, not on every draft edit
    const latestItem = useRef(item)
    useEffect(()=>{
        latestItem.current = item
    })
    useEffect(()=>{
        if (enabled && pro)
            dispatch(suggestFields(latestItem.current))
    }, [dispatch, item._id, item.media, enabled, pro])
}

//Collections
function Collection({ id, onSelectCollection }) {
    const getCollectionPath = useMemo(()=>makeCollectionPath(), [])
    const path = useSelector(state=>getCollectionPath(state, id, self))
    const shortPath = path.map((p)=>p.title).slice(-2).join(' / ')
    const { color } = path?.[path.length-1] || {}

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

    const onSelectCollection = id=>
        onChange({ collectionId: id })

    return (
        <Collapsible visible={collections.length > 0}>
            <Strip>
                <Wrap>
                    {collections.map(id=>(
                        <Collection key={id} id={id} onSelectCollection={onSelectCollection} />
                    ))}
                </Wrap>
            </Strip>
        </Collapsible>
    )
}

//Tags
function Tag({ tag, isNew, onAddTag }) {
    return (
        <SuggestionTap onPress={()=>onAddTag(tag)}>
            <SuggestionContent>
                <SuggestionText>{isNew?'+':''}{tag}</SuggestionText>
            </SuggestionContent>
        </SuggestionTap>
    )
}

export function Tags({ item, onChange }) {
    const getSuggestedFields = useMemo(()=>makeSuggestedFields(), [])
    const { tags=[], new_tags=[] } = useSelector(state=>getSuggestedFields(state, item))

    const onAddTag = tag=>
        onChange({ tags: [...item.tags, tag] })

    return (
        <Collapsible visible={(tags.length + new_tags.length) > 0}>
            <Strip>
                <Wrap>
                    {tags.map(tag=>(
                        <Tag key={tag} tag={tag} onAddTag={onAddTag} />
                    ))}
                    {new_tags.map(tag=>(
                        <Tag key={tag} tag={tag} isNew={true} onAddTag={onAddTag} />
                    ))}
                </Wrap>
            </Strip>
        </Collapsible>
    )
}