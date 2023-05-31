import { useCallback, useState } from 'react';
import t from 't'
import { ExcerptInput } from './excerpt.style'

export default function BookmarkEditExcerpt({ item: { excerpt }, focus, status, onChange }) {
    const [focused, setFocused] = useState(false)

    const onChangeExcerpt = useCallback(excerpt=>{
        onChange({ excerpt })
    }, [onChange])

    const onFocusExcerpt = useCallback(()=>setFocused(true), [setFocused])
    const onBlurExcerpt = useCallback(()=>setFocused(false), [setFocused])

    return (
        <ExcerptInput 
            last 
            optional
            selection={focused ? undefined : {start:0, end: 0}}
            value={excerpt}
            multiline={focused}
            blurOnSubmit={false}
            autoCorrect={false}
            spellCheck={false}
            maxHeight={168}
            enablesReturnKeyAutomatically={false}
            autoFocus={focus=='excerpt'}
            placeholder={t.s('description')}
            selectTextOnFocus={status=='new'}
            onChangeText={onChangeExcerpt}
            onFocus={onFocusExcerpt}
            onBlur={onBlurExcerpt} />
    )
}