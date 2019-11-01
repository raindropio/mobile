import t from 't'
import React from 'react'
import PropTypes from 'prop-types'
import Navigation from 'modules/navigation'
import color from 'co/collections/utils/color'
import { connect } from 'react-redux'
import * as collectionsActions from 'data/actions/collections'

class CollectionCollaboratorsScreen extends React.PureComponent {
    static propTypes = {
        _id:    PropTypes.number,
        onDone: PropTypes.func
    }

    static options({_id}) {
        return {
            style: 'form',
            tintColor: color(_id),
            
            topBar: {
                title: {
                    text: t.s('members')
                }
            }
        }
    }

    render() {
        return null
    }
}

export default connect(
	()=>({}),
	collectionsActions
)(CollectionCollaboratorsScreen)