import React from 'react'
import PropTypes from 'prop-types'
import t from 't'

import Goto from 'co/common/goto'

export default class CollectionRemove extends React.PureComponent {
	static propTypes = {
        collection: PropTypes.object
    }
	
	onRemove = ()=>
		this.props.navigation.replace('remove', this.props.collection)
	
	render() {
        const { collection: { _id }, last } = this.props

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