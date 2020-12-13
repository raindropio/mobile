import React, { useState } from 'react'
import t from 't'
import { mediumFade } from 'co/style/animation'
import Tint from 'co/collections/item/tint'
import Button from 'co/button'

import { Wrap, Header, Title, DoneIcon } from './style'
import Path from './path'
import Actions from './actions'

export default function BookmarkCreateLoaded(props) {
    const { navigation, items } = props

    //intro
    const [ intro, setIntro ] = useState(true)
    React.useEffect(()=>{
        const timeout = setTimeout(() => {
            mediumFade()
            setIntro(false)
        }, 300)
        return ()=>
            clearTimeout(timeout)
    }, [])

    return (
        <Tint _id={items[0].collectionId}>
            <Header>
                <DoneIcon />

                {!intro ? (<Title>{t.s('saved')}</Title>) : <Title />}

                <Button 
                    icon='close-circle'
                    variant='fill'
                    color='text.tertiary'
                    size={28}
                    onPress={navigation.goBack} />
            </Header>

            {!intro && (
                <Wrap>
                    <Path {...props} />
                    <Actions {...props} />
                </Wrap>
            )}
        </Tint>
    )
}