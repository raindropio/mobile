import React from 'react'
import t from 't'
import { SectionView, SectionText } from 'co/style/section'

export default function SelectedSection({ data, treeProps: { options={} } }) {
    if (!options.search)
        return null

    return (
        <SectionView>
            <SectionText>{t.s('found')} {data.length-(options.showCreateNew===false ? 0 : 1)} {t.s('collectionsCount')}</SectionText>
        </SectionView>
    )
}