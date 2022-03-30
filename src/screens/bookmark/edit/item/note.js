import React, { useCallback } from 'react'
import t from 't'

import { DescriptionInput } from './note.style'

export default function BookmarkEditText({ item: { excerpt }, focus, status, onChange }) {
    const onChangeExcerpt = useCallback(excerpt=>{
        onChange({ excerpt })
    }, [onChange])

    return (
        <DescriptionInput 
            last 
            optional
            value={excerpt}
            multiline={true}
            blurOnSubmit={false}
            autoCorrect={false}
            spellCheck={false}
            maxHeight={168}
            enablesReturnKeyAutomatically={false}
            autoFocus={focus=='excerpt'}
            placeholder={t.s('description')}
            selectTextOnFocus={status=='new'}
            onChangeText={onChangeExcerpt} />
    )
}