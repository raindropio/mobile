import React from 'react'
import t from 't'
import Icon from 'co/icon'
import { Error, Wrap, Message } from './style'

export default ({message, children})=>(
    <Error>
        <Wrap>
            <Icon name='error-warning' variant='fill' color='danger' />
            <Message>{message || t.s('server')}</Message>
        </Wrap>

        {children}
    </Error>
)