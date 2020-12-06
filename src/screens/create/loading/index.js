import React, { useEffect, useState, useCallback } from 'react'
import { LayoutAnimation } from 'react-native'
import t from 't'
import { ActivityIndicator } from 'co/native'
import PreventClose from 'co/navigation/preventClose'
import Button from 'co/button'
import Header from 'co/navigation/header'
import { Wrap } from './style'

export default function BookmarkCreateLoading({ navigation }) {
    const [ showCancel, setShowCancel ] = useState(false)
    
    //show cancel
    useEffect(()=>{
        const timeout = setTimeout(() => {
            LayoutAnimation.easeInEaseOut()
            setShowCancel(true)
        }, 2000)
        return ()=>clearTimeout(timeout)
    }, [])

    //close button
    const [ forceClose, setForceClose ] = useState(false)
    const close = useCallback(()=>setForceClose(true), [navigation])
    useEffect(()=>{
        if (forceClose)
            navigation.goBack()
    }, [forceClose])

    return (
        <Wrap>
            <ActivityIndicator size='large' />

            <Header.Buttons left />
            <Header.Buttons />

            {!forceClose && <PreventClose />}

            {showCancel && (
                <Button 
                    title={t.s('cancel')}
                    color='text.secondary'
                    onPress={close} />
            )}
        </Wrap>
    )
}