import React from 'react'
import t from 't'
import { SectionView, SectionText } from 'co/style/section'

export default function SelectedSection({ selected }) {
    return (
        <SectionView>
            <SectionText>{selected.length} {t.s('selected')}</SectionText>
        </SectionView>
    )
}