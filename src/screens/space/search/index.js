import PropTypes from 'prop-types'

import { Wrap, Content } from './style'
import Header from './header'
import Load from './load'
import Bookmarks from './bookmarks'
import Menu from './menu'

function SearchScreen(props) {
    return (
        <Wrap>
            <Header {...props} />
            <Load {...props} />
            <Content>
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
    headerShown: false,
    stackAnimation: 'fade',
    statusBarTranslucent: false
})

export default SearchScreen