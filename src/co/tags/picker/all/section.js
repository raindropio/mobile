import React from 'react'
import t from 't'
import _ from 'lodash'
import { SectionView, SectionText } from 'co/style/section'

let _titles
function getTitles() {
    if (!_titles)
        _titles = {
            recent: t.s('recent'),
            collection: t.s('collection'),
            other: _.capitalize(t.s('other'))
        }
    return _titles
}

export default function AllSection({ _id }) {
    return (
        <SectionView>
            <SectionText>{getTitles()[_id]}</SectionText>
        </SectionView>
    )
}