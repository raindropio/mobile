import React from 'react'
import t from 't'
import { Error } from 'co/alert'
import { Wrap } from './style'

export default function BookmarkCreateError({ error }) {
    let message

    if (error)
        message = error.error && t.has('server'+error.error) ? t.s('server'+error.error) : error.message

    return (
        <Wrap>
            <Error
                message={message} />
        </Wrap>
    )
}