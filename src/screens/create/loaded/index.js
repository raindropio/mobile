import React, { useState } from 'react'
import { LayoutAnimation } from 'react-native'
import t from 't'
import Tint from 'co/collections/item/tint'
import Button from 'co/button'

import { Wrap, Header, Title, DoneIcon, DoneIconWrap } from './style'
import Path from './path'
import Actions from './actions'

export default function BookmarkCreateLoaded(props) {
    const { navigation, items } = props

    //intro
    const [ intro, setIntro ] = useState(true)
    React.useEffect(()=>{
        const timeout = setTimeout(() => {
            LayoutAnimation.easeInEaseOut()
            setIntro(false)
        }, 500)
        return ()=>
            clearTimeout(timeout)
    }, [])

    return (
        <Tint _id={items[0].collectionId}>
            {!intro && (<>
                <Header>
                    <Title>{t.s('saved')}</Title>
                    <Button 
                        icon='close-circle'
                        variant='fill'
                        color='text.tertiary'
                        size={28}
                        onPress={navigation.goBack} />
                </Header>

                <Wrap>
                    <Path {...props} />
                    <Actions {...props} />
                </Wrap>
            </>)}

            <DoneIconWrap floating={intro}>
                <DoneIcon speed={1.75} />
            </DoneIconWrap>
        </Tint>
    )
}