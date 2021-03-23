import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import t from './index'

export default function TranslateComponent({ children }) {
    const lang = useSelector(state=>state.config.lang)

    useEffect(()=>{
        t.setLocale(lang)
    }, [])

    return children
}