import { useMemo } from 'react'
import t from 't'
import { useSelector, useDispatch } from 'react-redux'
import { makeCollection } from 'data/selectors/collections'
import { status, query, count as getCount, getSearchEmpty, selectModeEnabled } from 'data/selectors/bookmarks'
import { selectAll } from 'data/actions/bookmarks'
import { SPACE_PER_PAGE } from 'data/constants/bookmarks'

import { getLabel as getSortLabel } from 'screens/collection/sort/options'
import { getIcon as getViewIcon } from 'screens/collection/view/options'
import { SectionView, SectionText } from 'co/style/section'
import Button from 'co/button'
import { Loading } from './style'

export default function BookmarksHeader({ spaceId, navigation }) {
    const dispatch = useDispatch()
    const getCollection = useMemo(()=>makeCollection(), [])

    const main = useSelector(state=>status(state, spaceId).main)
    const searching = useSelector(state=>!getSearchEmpty(state, spaceId))
    const foundCount = useSelector(state=>getCount(state, spaceId))
    const sort = useSelector(state=>query(state, spaceId).sort)
    const { view, count } = useSelector(state=>getCollection(state, spaceId))
    const selectMode = useSelector(state=>selectModeEnabled(state, spaceId))

    if (main == 'empty')
        return null

    let title

    if (searching){
        if (main == 'loaded')
            title = `${foundCount < SPACE_PER_PAGE ? foundCount : '∞'} ${t.s('bookmarks')} ${t.s('found').toLowerCase()}`
        else
            title = `${t.s('defaultCollection-0')} ${t.s('bookmarks')}…`
    } else
        title = `${count} ${t.s('bookmarks')}`

    return (
        <SectionView noBorder>
            {main == 'loading' ? 
                <Loading /> :
                <SectionText numberOfLines={1}>{title}</SectionText>
            }

            {!selectMode && (
                <>
                    <Button 
                        title={sort != 'sort' ? getSortLabel(sort) : undefined}
                        icon={sort == 'sort' ? 'arrow-up-down' : undefined}
                        color='text.secondary'
                        onPress={()=>navigation.navigate('collection/sort', { _id: spaceId })} />

                    <Button 
                        icon={getViewIcon(view)}
                        color='text.secondary'
                        onPress={()=>navigation.navigate('collection/view', { _id: spaceId })} />

                    <Button 
                        icon='checkbox-multiple'
                        color='text.secondary'
                        onPress={()=>dispatch(selectAll(spaceId))} />
                </>
            )}
        </SectionView>
    )
}