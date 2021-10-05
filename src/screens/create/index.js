import React, { useEffect, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import PreventClose from 'co/navigation/preventClose'

import useSave from './types'
import Loading from './loading'

function Create({ type, values, transparent, navigation, cancel }) {
    const [status, items, error] = useSave(type, values)
    const [isNew, setIsNew] = useState(type == 'file')

    //what to do on saved
    const [closing, setClosing] = useState(false)

    const saved = useCallback(()=>{
        if (closing) return
        setClosing(true)

        //open edit screen for single (existing link or any file)
        if (items.length == 1 && (!isNew || type=='file'))
            navigation.replace('bookmark', { _id: items[0]._id })
        //otherwise just close screen with timeout (give time for show animation)
        else
            setTimeout(navigation.goBack, 1500)
    }, [items, isNew, closing, navigation])

    //react to status change
    useEffect(()=>{
        switch(status) {
            case 'error':
            case 'errorSaving':
                navigation.replace('overlay', {
                    screen: 'error',
                    params: { error }
                })
            break

            case 'new':
                setIsNew(true)
            break

            case 'loaded':
            case 'removed':
                saved()
            break
        }
    }, [status, error, saved, navigation])

    //cancel
    useEffect(()=>{
        if (cancel)
            navigation.goBack()
    }, [cancel])

    return (
        <>
            {!!((status == 'loading' || status == 'saving') && !cancel) && <PreventClose />}
            <Loading 
                status={status}
                isNew={isNew}
                transparent={transparent}
                navigation={navigation} />
        </>
    )
}

Create.propTypes = {
    type:       PropTypes.oneOf(['url', 'file']),
    values:     PropTypes.arrayOf(
        PropTypes.shape({
            link:           PropTypes.string,
            file:           PropTypes.shape({
                name:           PropTypes.string.isRequired,
                uri:            PropTypes.string.isRequired,
                type:           PropTypes.string.isRequired,
            }),

            collectionId:   PropTypes.number, 
            //+any other item params
        }),
    ).isRequired
}

function CreateScreen({ route: {params={}}, ...etc }) {
    return <Create {...etc} {...params} />
}

CreateScreen.options = {
    stackPresentation: 'transparentModal',
    stackAnimation: 'fade',
    detachPreviousScreen: false,
    headerShown: false,
    cardStyle: {
        backgroundColor: 'transparent'
    }
}

export default CreateScreen