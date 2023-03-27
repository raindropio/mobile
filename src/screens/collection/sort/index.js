import { Component } from 'react';
import t from 't'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { query, makeSorts } from 'data/selectors/bookmarks'
import { changeSort } from 'data/actions/bookmarks'

import { Info } from 'co/alert'
import { Form, ScrollForm } from 'co/form'
import PickFlatList from 'co/list/flat/pick'
import { getOptions } from './options'

class CollectionSort extends Component {
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
		const { sorts, sort } = this.props

		return (
			<ScrollForm>
				<Form>
					<PickFlatList 
						options={getOptions(sorts)}
						selected={sort}
						onSelect={this.onSelect} />
				</Form>

				{sort == 'sort' && (
					<Form>
						<Info
							message={t.s('dragToReorderMobileD')} />
					</Form>
				)}
			</ScrollForm>
		)
	}
}

export default connect(
	()=>{
		const getSorts = makeSorts()

		return (state, { route: { params={} } })=>{
			return {
				sort:   query(state, params._id).sort,
				sorts:  getSorts(state, params._id)
			}
		}
	},
	{ changeSort }
)(CollectionSort)