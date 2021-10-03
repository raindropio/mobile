import React from 'react'
import Header from 'co/navigation/header'

import { Wrap, Toolbar } from './style'
import Field from './field'
import Tabs from './tabs'
import Menu from './menu'

function SearchHeader(props) {
    return (
        <Wrap>
            <Toolbar>
                <Header.Back onPress={props.navigation.goBack} />
                <Field {...props} />
                <Menu {...props} />
            </Toolbar>

            <Tabs {...props} />
        </Wrap>
    )
}

export default SearchHeader