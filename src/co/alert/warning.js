import React from 'react'
import { Warning, Message } from './style'
import Icon from 'co/icon'

export default ({ message, icon='alert', children })=>(
    <Warning>
        <Icon name={icon} variant='fill' color='warning' />
        <Message>{message}</Message>
        {children}
    </Warning>
)