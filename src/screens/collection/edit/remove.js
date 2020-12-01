import React from 'react'
import PropTypes from 'prop-types'
import t from 't'

import Goto from 'co/common/goto'

export default class CollectionRemove extends React.PureComponent {
	static propTypes = {
        _id: PropTypes.number
    }
	
	onRemove = ()=>
		this.props.navigation.replace('remove', { _id: this.props._id })
	
	render() {
        const { _id, last } = this.props

        if (_id > 0 || _id == -99)
            return (
                <Goto 
                    last={last}
                    label={_id == -99 ? t.s('emptyTrash') : t.s('removeCollectionForever')}
                    action=''
                    icon='delete-bin'
                    color='danger'
                    onPress={this.onRemove} />
            )

        return null
	}
}