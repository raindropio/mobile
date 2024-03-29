import { useContext } from 'react';
import { ThemeContext } from 'styled-components/native'

import { Form } from 'co/form'
import Cache from './cache'
import Copy from './copy'
import Remove from './remove'
import Select from './select'
import Share from './share'

export default function BookmarkEditActions(props) {
    const { isExtension } = useContext(ThemeContext)

    if (props.status != 'loaded' &&
        props.status != 'removed')
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