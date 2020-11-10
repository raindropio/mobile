import React from 'react'
import PropTypes from 'prop-types'
import t from 't'

import { ButtonLink } from 'co/common/button'

export default class CollectionRemove extends React.PureComponent {
	static propTypes = {
        collection: PropTypes.object
    }
	
	onRemove = ()=>
		this.props.navigation.replace('remove', this.props.collection)
	
	render() {
        const { collection: { _id } } = this.props

        if (_id > 0 || _id == -99)
            return (
                <ButtonLink 
                    danger 
                    onPress={this.onRemove}>
                    {_id == -99 ? t.s('emptyTrash') : t.s('removeCollectionForever')}
                </ButtonLink>
            )

        return null
	}
}