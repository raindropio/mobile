import t from 't'
import { useEffect } from 'react'
import isThisMinute from 'date-fns/isThisMinute'
import parseISO from 'date-fns/parseISO'
import Header from 'co/navigation/header'
import { useTheme } from 'styled-components/native'

export default function BookmarkEditHeader({ status, item, navigation }) {
    const { isExtension } = useTheme()

    useEffect(()=>{
        let isNowSaved = false;
        try { isNowSaved = isThisMinute(parseISO(item.created), new Date()) } catch(e){console.log(e)}

        navigation.setOptions({
            title: status == 'new' ? 
                t.s('newBookmark') : 
                isNowSaved ? t.s('saved') : t.s('edit')
        })
    }, [status, item.created])

    if (isExtension)
        return (
            <Header.Buttons left>
                <Header.Back onPress={navigation.goBack} />
            </Header.Buttons>
        )

    return null
}