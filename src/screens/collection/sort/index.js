import React from 'react'
import t from 't'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { query, makeSorts } from 'data/selectors/bookmarks'
import { makeCollection } from 'data/selectors/collections'
import { changeSort } from 'data/actions/bookmarks'

import { Warning } from 'co/alert'
import { Form, ScrollForm } from 'co/form'
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
		this.props.changeSort(this.props.route.params._id, selected)
		this.props.navigation.goBack()
	}

	render() {
		const { sorts, sort, view } = this.props
		const showWarning = !!(sort == 'sort' && (view == 'grid' || view == 'masonry'))

		return (
			<ScrollForm>
				{showWarning && (
					<Form>
						<Warning
							message={`${t.s('view_grid')} ${t.s('und')} ${t.s('view_masonry').toLowerCase()} ${t.s('manual').toLowerCase()} ${t.s('sortMin').toLowerCase()} ${t.s('soon').toLowerCase()}`} />
					</Form>
				)}

				<Form>
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
		const getCollection = makeCollection()

		return (state, { route: { params={} } })=>{
			return {
				sort:   query(state, params._id).sort,
				sorts:  getSorts(state, params._id),
				view:	getCollection(state, params._id).view
			}
		}
	},
	{ changeSort }
)(CollectionSort)