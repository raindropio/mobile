import React from 'react'
import { Info, Message } from './style'
import Icon from 'co/icon'

export default ({ message, icon='information', children })=>(
    <Info>
        <Icon name={icon} variant='fill' color='info' />
        <Message>{message}</Message>
        {children}
    </Info>
)