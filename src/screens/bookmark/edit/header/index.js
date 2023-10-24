import t from 't'
import { useEffect } from 'react'

export default function BookmarkEditHeader({ status, item: { type }, navigation }) {
    useEffect(()=>{
        let title
        switch(status) {
            case 'idle':    title = ''; break
            case 'new':     title = t.s('newBookmark'); break
            case 'loading': title = ''; break
            default:        title = t.has(type) ? t.s(type) : t.s('bookmark'); break
        }

        navigation.setOptions({ title })
    }, [type, status])

    return null
}