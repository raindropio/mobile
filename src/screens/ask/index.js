import PropTypes from 'prop-types'

function Ask() {

}

Ask.options = {
    headerShown: false
}

Ask.propTypes = {
    route: PropTypes.shape({
        params: PropTypes.shape({
            raindropId: PropTypes.number //optional
        })
    })
}

export default Ask