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
		return (
            <ButtonLink 
                danger 
                onPress={this.onRemove}>
                {t.s('removeCollectionForever')}
            </ButtonLink>
        )
	}
}