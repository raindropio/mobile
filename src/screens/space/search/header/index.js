import React, { useRef } from 'react'
import Header from 'co/navigation/header'

import { Wrap, Toolbar } from './style'
import Field from './field'
import Tabs from './tabs'
import Menu from './menu'

function SearchHeader(props) {
    const inputRef = useRef(null)

    return (
        <Wrap>
            <Toolbar>
                <Header.Back onPress={props.navigation.goBack} />
                <Field {...props} inputRef={inputRef} />
                <Menu {...props} inputRef={inputRef} />
            </Toolbar>

            <Tabs {...props} />
        </Wrap>
    )
}

export default SearchHeader