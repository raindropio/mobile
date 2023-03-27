import { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native'
import t from 't'
import { mediumFade } from 'co/style/animation'

import { ActivityIndicator } from 'co/native'
import Button from 'co/button'
import { Window, Element, Message } from './view.style'

function OverlayLoadingView({ message, indicator, onCancel }) {
    //fade in
    const opacity = useRef(new Animated.Value(0)).current
    useEffect(()=>{
        const anim = Animated.timing(opacity, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true
        })

        setTimeout(anim.start, 200)
        return anim.stop
    }, [])

    //cancel show
    const [showCancel, setShowCancel] = useState(false)
    useEffect(()=>{
        const cancelTimeout = setTimeout(() => {
            setShowCancel(true)
            mediumFade()
        }, 5000)

        return ()=>clearTimeout(cancelTimeout)
    }, [onCancel])

    let Indicator = indicator ? indicator : ActivityIndicator

    return (
        <Window>
            <Element style={{opacity}}>
                <Indicator />
                {!!message && <Message>{message}</Message>}
            </Element>

            {!!(onCancel && showCancel) && (
                <Element>
                    <Button
                        title={t.s('cancel')}
                        onPress={onCancel} />
                </Element>
            )}
        </Window>
    )
}

export default OverlayLoadingView