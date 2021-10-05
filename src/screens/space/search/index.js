import React from 'react'
import PropTypes from 'prop-types'
import { Fade } from 'co/navigation/transition'

import { Wrap } from './style'
import Header from './header'
import Load from './load'
import Bookmarks from './bookmarks'
import Menu from './menu'

function SearchScreen(props) {
    return (
        <Wrap>
            <Load {...props} />
            <Bookmarks {...props} />
            <Menu {...props} />
        </Wrap>
    )
}

SearchScreen.propTypes = {
    route:  PropTypes.shape({
        params: PropTypes.shape({
            query:      PropTypes.string,
            wait:       PropTypes.bool,     //do not start searching yet
            spaceId:    PropTypes.number,
            autoFocus:  PropTypes.bool,
        })
    })
}

SearchScreen.options = props=>({
    ...Fade,
    gestureDirection: 'horizontal',
    presentation: 'modal',
    header: ()=><Header {...props} />
})

export default SearchScreen