import React, { useCallback, useRef, useMemo } from 'react'
import t from 't'
import humanizeUrl from 'modules/format/url/humanize'

import { Wrap, DescriptionInput } from './text.style'
import { Input } from 'co/form'

export default function BookmarkEditText({ item: { title, excerpt, link }, focus, status, onChange }) {
    const _excerpt = useRef(null)

    const onChangeTitle = useCallback(title=>{
        onChange({ title })
    }, [onChange])

    const onChangeExcerpt = useCallback(excerpt=>{
        onChange({ excerpt })
    }, [onChange])

    const focusExcerpt = useCallback(()=>{
        _excerpt.current && _excerpt.current.focus()
    }, [onChange])

    const titlePlaceholder = useMemo(()=>(
        humanizeUrl(link)
    ), [link])

    return (
        <Wrap>
            <Input heading
                value={title}
                multiline={true}
                placeholder={titlePlaceholder}
                returnKeyType='next'
                autoFocus={focus=='title'}
                onChangeText={onChangeTitle}
                onSubmitEditing={focusExcerpt} />

            <DescriptionInput 
                last 
                optional
                ref={_excerpt}
                value={excerpt}
                multiline={true}
                blurOnSubmit={false}
                maxHeight={168}
                autoFocus={focus=='excerpt'}
                placeholder={t.s('enterDescription')}
                selectTextOnFocus={status=='new'}
                onChangeText={onChangeExcerpt} />
        </Wrap>
    )
}