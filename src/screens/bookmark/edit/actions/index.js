import React from 'react'
import { ThemeContext } from 'styled-components'

import { Form } from 'co/form'
import Cache from './cache'
import Copy from './copy'
import Remove from './remove'
import Select from './select'
import Share from './share'

export default function BookmarkEditActions(props) {
    const { isExtension } = React.useContext(ThemeContext)

    if (props.status == 'new' ||
        props.status == 'loading')
        return null

    return (
        <Form>
            {!isExtension && (
                <>
                    <Select {...props} />
                    <Share {...props} />
                    <Cache {...props} />
                </>
            )}

            <Copy {...props} />
            <Remove {...props} last />
        </Form>
    )
}