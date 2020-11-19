import React from 'react'
import t from 't'
import { connect } from 'react-redux'
import { makeStatus, makeBookmarksCount, getSearchEmpty } from 'data/selectors/bookmarks'
import { SectionView, SectionText } from 'co/style/section'

function BookmarksHeader({ searching, count, status }) {
    if (!searching)
        return null

    return (
        <SectionView>
            <SectionText>{status=='loaded' ? `${t.s('found')} ${count} ${t.s('bookmarks')}` : `${t.s('defaultCollection-0')} ${t.s('bookmarks')}…`}</SectionText>
        </SectionView>
    )
}

export default connect(
    ()=>{
        const getStatus = makeStatus()
        const getBookmarksCount = makeBookmarksCount()

        return (state, { spaceId })=>({
            status: getStatus(state, spaceId).main,
            searching: !getSearchEmpty(state, spaceId),
            count: getBookmarksCount(state, spaceId),
        })
    }
)(BookmarksHeader)