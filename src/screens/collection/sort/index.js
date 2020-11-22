import React from 'react'
import t from 't'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { query, makeSorts } from 'data/selectors/bookmarks'
import { changeSort } from 'data/actions/bookmarks'

import { Form, ScrollForm } from 'co/style/form'
import PickFlatList from 'co/list/flat/pick'
import { getOptions } from './options'

class CollectionSort extends React.Component {
	static propTypes = {
		route:  PropTypes.shape({
            params: PropTypes.shape({
				_id:	PropTypes.number
			})
		})
	}

	static options = {
		title: t.s('sortBy')
	}

	onSelect = (selected)=>{
		this.props.changeSort(parseInt(this.props.route.params._id), selected)
		this.props.navigation.goBack()
	}

	render() {
		const { sorts, sort } = this.props

		return (
			<ScrollForm>
				<Form first>
					<PickFlatList 
						options={getOptions(sorts)}
						selected={sort}
						onSelect={this.onSelect} />
				</Form>
			</ScrollForm>
		)
	}
}

export default connect(
	()=>{
		const getSorts = makeSorts()

		return (state, { route: { params={} } })=>{
			return {
				sort:   query(state, parseInt(params._id)).sort,
				sorts:  getSorts(state, parseInt(params._id))
			}
		}
	},
	{ changeSort }
)(CollectionSort)