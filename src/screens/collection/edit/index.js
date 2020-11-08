import React from 'react'
import PropTypes from 'prop-types'
import t from 't'

import { ScrollForm } from 'co/style/form'
import View from './view'

export default class EditCollectio extends React.Component {
	static propTypes = {
        route:  PropTypes.shape({
            params: PropTypes.shape({
                _id:    PropTypes.number
            })
        })
    }

	static options = {
		title: t.s('collectionEdit')
	}
	
	render() {
		const { route: { params={} }, ...etc } = this.props

		return (
			<ScrollForm>
				<View 
					focus='title'
					{...etc}
					{...params} />
			</ScrollForm>
		)
	}
}