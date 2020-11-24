import React from 'react'
import t from 't'
import _ from 'lodash'
import { Loading } from 'co/overlay'

export default function SelectModeWorking({ working }) {
    return (
        <Loading textContent={
                ({
                    move: t.s('move'),
                    important: _.capitalize(t.s('to')) + ' ' + t.s('favorites').toLowerCase(),
                    importantRemove: t.s('remove')+' '+t.s('from')+' '+t.s('favorites').toLowerCase(),
                    screenshot: t.s('clickToMakeScreenshot'),
                    removeTags: t.s('remove')+' '+t.s('tags').toLowerCase(),
                    reparse: t.s('refresh')+' '+t.s('preview').toLowerCase(),
                    remove: t.s('remove')
                }[working] || t.s('loading')) + '…'
            } />
    )
}