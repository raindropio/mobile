import React from 'react'
import { SectionView, SectionText } from 'co/style/section'

export default function Section({ title }) {
    return (
        <SectionView noBorder>
            <SectionText>{title}</SectionText>
        </SectionView>
    )
}