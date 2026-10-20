import { useMemo } from 'react'
import t from 't'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { makeCollection } from 'data/selectors/collections'
import { oneChangeView } from 'data/actions/collections'

import { Form, ScrollForm, FormSection } from 'co/form'
import { SectionText } from 'co/style/section'
import PickFlatList from 'co/list/flat/pick'

import { getOptions } from './options'
import Show from './show'

function CollectionView({ route: { params={} } }) {
	const dispatch = useDispatch()

	const getCollection = useMemo(()=>makeCollection(), [])
	const { _id, view } = useSelector(state=>getCollection(state, params._id))

	const onSelect = view=>{
		dispatch(oneChangeView(_id, view))
	}

	return (
		<ScrollForm>
			<FormSection><SectionText>{t.s('view')}</SectionText></FormSection>
			<Form>
				<PickFlatList 
					options={getOptions()}
					selected={view}
					onSelect={onSelect} />
			</Form>

			<Show {...params} />
		</ScrollForm>
	)
}

CollectionView.propTypes = {
	route:  PropTypes.shape({
		params: PropTypes.shape({
			_id:	PropTypes.any
		})
	})
}

CollectionView.options = {
	title: t.s('appearance')
}

export default CollectionView