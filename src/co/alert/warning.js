import React from 'react'
import { Warning, Message } from './style'
import Icon from 'co/icon'

export default ({message})=>(
    <Warning>
        <Icon name='alert' variant='fill' color='warning' />
        <Message>{message}</Message>
    </Warning>
)