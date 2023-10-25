import t from 't'
import { useEffect } from 'react'

export default function BookmarkEditHeader({ status, navigation }) {
    useEffect(()=>{
        navigation.setOptions({ title: status == 'new' ? t.s('newBookmark') : t.s('bookmark') })
    }, [status])

    return null
}