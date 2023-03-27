import { useEffect } from 'react';
import { Platform } from 'react-native'
import { useSelector } from 'react-redux'
import t from './index'

export default function TranslateComponent({ children }) {
    const lang = useSelector(state=>state.config.lang)

    useEffect(()=>{
        if (Platform.OS == 'android')
            t.setLocale(lang)
    }, [])

    return children
}