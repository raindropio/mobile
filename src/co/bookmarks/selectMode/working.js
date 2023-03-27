import t from 't'
import _ from 'lodash'
import { Component as Loading } from 'screens/overlay/loading'

export default function SelectModeWorking({ working }) {
    return (
        <Loading message={
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