import React from 'react'
import t from 't'
import Icon from 'co/icon'
import { Error, Message } from './style'

export default ({message})=>(
    <Error>
        <Icon name='error-warning' variant='fill' color='danger' />
        <Message>{message || t.s('server')}</Message>
    </Error>
)