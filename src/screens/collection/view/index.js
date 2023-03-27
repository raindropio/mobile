import { Component } from 'react';
import t from 't'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { makeCollection } from 'data/selectors/collections'
import { oneChangeView } from 'data/actions/collections'

import { Form, ScrollForm, FormSection } from 'co/form'
import { SectionText } from 'co/style/section'
import PickFlatList from 'co/list/flat/pick'

import { getOptions } from './options'
import Show from './show'

class CollectionView extends Component {
	static propTypes = {
		route:  PropTypes.shape({
            params: PropTypes.shape({
				_id:	PropTypes.any
			})
		})
	}

	static options = {
		title: t.s('appearance')
	}

	onSelect = (view)=>{
		this.props.oneChangeView(this.props._id, view)
	}

	render() {
		const { view, route: { params={} } } = this.props

		return (
			<ScrollForm>
				<FormSection><SectionText>{t.s('view')}</SectionText></FormSection>
				<Form>
					<PickFlatList 
						options={getOptions()}
						selected={view}
						onSelect={this.onSelect} />
				</Form>

				<Show {...params} />
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