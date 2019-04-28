import React from 'react'
import t from 't'
import { Error, Message, IconError } from './style'

export default ({message})=>(
    <Error>
        <IconError />
        <Message>{message || t.s('server')}</Message>
    </Error>
)