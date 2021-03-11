import React from 'react'
import t from 't'
import Height from 'co/navigation/height'

import { Window, Scroll, Message, IconWrap } from './style'
import Icon from 'co/icon'

function CustomError({ route: { params={} } }) {
    const { error: { error, message } } = params

    return (
        <Window>
            <Height height={300} />

            <Scroll>
                <IconWrap>
                    <Icon 
                        name='error-warning'
                        variant='fill'
                        size={32}
                        color='danger' />
                </IconWrap>

                <Message>{error && t.has('server'+error) ? t.s('server'+error) : message}</Message>
            </Scroll>
        </Window>
    )
}

export default CustomError