import { useRef } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Wrap, Toolbar } from './style'
import Field from './field'
import Tabs from './tabs'
import Menu from './menu'

function SearchHeader() {
    const inputRef = useRef(null)
    const navigation = useNavigation()
    const route = useRoute()

    return (
        <Wrap>
            <Toolbar>
                <Field route={route} navigation={navigation} inputRef={inputRef} />
                <Menu route={route} navigation={navigation} inputRef={inputRef} />
            </Toolbar>

            <Tabs route={route} navigation={navigation} />
        </Wrap>
    )
}

export default SearchHeader