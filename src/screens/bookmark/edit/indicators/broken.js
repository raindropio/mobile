import React from 'react'
import t from 't'
import { Form } from 'co/form'
import { Warning } from 'co/alert'

export default function IndicatorBroken({ item: { broken } }) {
    if (!broken)
        return null

    return (
        <Form>
            <Warning 
                icon='ghost'
                message={t.s('broken')+' '+t.s('link').toLowerCase()+'!'} />
        </Form>
    )
}