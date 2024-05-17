import PropTypes from 'prop-types'

import { Wrap, Content } from './style'
import Header from './header'
import Load from './load'
import Bookmarks from './bookmarks'
import Menu from './menu'
import Tabs from './tabs'

function SearchScreen(props) {
    return (
        <Wrap>
            <Tabs {...props} />

            <Content>
                <Load {...props} />
                <Bookmarks {...props} />
                <Menu {...props} />
            </Content>
        </Wrap>
    )
}

SearchScreen.propTypes = {
    route: PropTypes.shape({
        params: PropTypes.shape({
            query:      PropTypes.string,
            wait:       PropTypes.bool,     //do not start searching yet
            spaceId:    PropTypes.number,
            autoFocus:  PropTypes.bool,
        })
    })
}

SearchScreen.options = ({
    title: '',
    headerTitle: Header,
    // animation: 'fade'
})

export default SearchScreen