import React, { useCallback, useMemo } from 'react'
import humanizeUrl from 'modules/format/url/humanize'

import { Title } from './title.style'

export default function BookmarkEditText({ item: { title, link }, focus, onChange }) {
    const onChangeTitle = useCallback(title=>{
        onChange({ title })
    }, [onChange])

    const titlePlaceholder = useMemo(()=>(
        humanizeUrl(link)
    ), [link])

    return (
        <Title 
            last
            heading
            value={title}
            multiline={true}
            placeholder={titlePlaceholder}
            returnKeyType='next'
            autoFocus={focus=='title'}
            onChangeText={onChangeTitle} />
    )
}