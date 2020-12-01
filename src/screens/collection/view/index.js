import React from 'react'
import t from 't'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { makeCollection } from 'data/selectors/collections'
import { oneChangeView } from 'data/actions/collections'

import { Form, ScrollForm } from 'co/form'
import PickFlatList from 'co/list/flat/pick'
import { getOptions } from './options'

class CollectionView extends React.Component {
	static propTypes = {
		route:  PropTypes.shape({
            params: PropTypes.shape({
				_id:	PropTypes.any
			})
		})
	}

	static options = {
		title: t.s('view')
	}

	onSelect = (view)=>{
		this.props.oneChangeView(this.props._id, view)
		this.props.navigation.goBack()
	}

	render() {
		const { view } = this.props

		return (
			<ScrollForm>
				<Form>
					<PickFlatList 
						options={getOptions()}
						selected={view}
						onSelect={this.onSelect} />
				</Form>
			</ScrollForm>
		)
	}
}

export default connect(
	()=>{
		const getCollection = makeCollection()

		return (state, { route: { params={} } })=>{
			return getCollection(state, params._id)
		}
	},
	{ oneChangeView }
)(CollectionView)