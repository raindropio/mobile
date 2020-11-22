import React from 'react'
import t from 't'
import { connect } from 'react-redux'
import { makeCollection } from 'data/selectors/collections'
import { status, query, makeBookmarksCount, getSearchEmpty, selectModeEnabled } from 'data/selectors/bookmarks'
import { startSelectMode } from 'data/actions/bookmarks'

import { getLabel as getSortLabel } from 'screens/collection/sort/options'
import { getIcon as getViewIcon } from 'screens/collection/view/options'
import { SectionView, SectionText } from 'co/style/section'
import { ButtonsWrap, Button } from 'co/navigation/header'

class BookmarksHeader extends React.Component {
    onViewPress = ()=>
        this.props.navigation.navigate('collection', { screen: 'view', params: { _id: this.props.spaceId } })

    onSortPress = ()=>
        this.props.navigation.navigate('collection', { screen: 'sort', params: { _id: this.props.spaceId } })

    onSelectModePress = ()=>
        this.props.startSelectMode(this.props.spaceId)

    render() {
        const { searching, count, foundCount, status, sort, view, selectModeEnabled } = this.props
    
        let title

        if (searching){
            if (status == 'loaded')
                title = `${foundCount} ${t.s('bookmarks')} ${t.s('found').toLowerCase()}`
            else
                title = `${t.s('defaultCollection-0')} ${t.s('bookmarks')}…`
        } else
            title = `${count} ${t.s('bookmarks')}`

        return (
            <SectionView>
                <SectionText numberOfLines={1}>{title}</SectionText>

                {(!selectModeEnabled && status == 'loaded') && (
                    <ButtonsWrap>
                        <Button 
                            title={sort != 'sort' ? getSortLabel(sort) : undefined}
                            icon={sort == 'sort' ? 'arrow-up-down' : undefined}
                            color='text.secondary'
                            onPress={this.onSortPress} />

                        <Button 
                            icon={getViewIcon(view)}
                            color='text.secondary'
                            onPress={this.onViewPress} />

                        <Button 
                            icon='checkbox-multiple'
                            color='text.secondary'
                            onPress={this.onSelectModePress} />
                    </ButtonsWrap>
                )}
            </SectionView>
        )
    }
}

export default connect(
    ()=>{
        const getCollection = makeCollection()
        const getBookmarksCount = makeBookmarksCount()

        return (state, { spaceId })=>({
            status: status(state, spaceId).main,

            searching: !getSearchEmpty(state, spaceId),
            foundCount: getBookmarksCount(state, spaceId),

            sort: query(state, spaceId).sort,
            view: getCollection(state, spaceId).view,
            count: getCollection(state, spaceId).count,

            selectModeEnabled: selectModeEnabled(state, spaceId),
        })
    },
    { startSelectMode }
)(BookmarksHeader)