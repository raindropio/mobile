import React, { useState } from 'react'
import { LayoutAnimation } from 'react-native'
import t from 't'
import Tint from 'co/collections/item/tint'
import Header from 'co/navigation/header'

import { Wrap, DoneIcon } from './style'
import Path from './path'
import Actions from './actions'

export default function BookmarkCreateLoaded(props) {
    const { navigation, type, items } = props

    //intro
    const [ intro, setIntro ] = useState(true)
    React.useEffect(()=>{
        const timeout = setTimeout(() => {
            LayoutAnimation.easeInEaseOut()
            setIntro(false)
        }, 750)
        return ()=>
            clearTimeout(timeout)
    }, [])

    return (
        <Tint _id={items[0].collectionId}>
            <Wrap>
                <Header.Buttons>
                    <Header.Button 
                        icon='close-circle'
                        variant='fill'
                        color='text.tertiary'
                        size={28}
                        onPress={navigation.goBack} />
                </Header.Buttons>

                {intro ? (
                    <DoneIcon speed={1.75} />
                ) : (<>
                    <Header.Title>
                        {t.s('saved')}
                    </Header.Title>

                    <Path {...props} />

                    <Actions {...props} />
                </>)}
            </Wrap>
        </Tint>
    )
}