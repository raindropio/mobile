import React from 'react'
import { Warning, Message, IconWarning } from './style'

export default ({message})=>(
    <Warning>
        <IconWarning />
        <Message>{message}</Message>
    </Warning>
)