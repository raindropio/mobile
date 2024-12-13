import { useEffect, useCallback, useState } from 'react'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'
import PreventClose from 'co/navigation/preventClose'
import t from 't'

import useSave from './types'
import Loading from './loading'

function Create({ type, values, transparent, navigation, cancel }) {
    const [status, items, error] = useSave(type, values)

    //what to do on saved
    const [closing, setClosing] = useState(false)

    const saved = useCallback(()=>{
        if (closing) return
        setClosing(true)
        setTimeout(navigation.goBack, 1500)
    }, [closing, navigation])

    //react to status change
    useEffect(()=>{
        switch(status) {
            case 'error':
            case 'errorSaving':
                Alert.alert(t.s('error'), error?.message)
                navigation.goBack()
            break

            case 'new':
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
    presentation: 'transparentModal',
    animation: 'fade',
    headerShown: false
}

export default CreateScreen