import { useMemo } from 'react'
import t from 't'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { query, makeSorts } from 'data/selectors/bookmarks'
import { changeSort } from 'data/actions/bookmarks'

import { Info } from 'co/alert'
import { Form, ScrollForm } from 'co/form'
import PickFlatList from 'co/list/flat/pick'
import { getOptions } from './options'

function CollectionSort({ route: { params={} }, navigation }) {
	const dispatch = useDispatch()

	const getSorts = useMemo(()=>makeSorts(), [])

	const sort = useSelector(state=>query(state, params._id).sort)
	const sorts = useSelector(state=>getSorts(state, params._id))

	const onSelect = selected=>{
		dispatch(changeSort(params._id, selected))
		navigation.goBack()
	}

	return (
		<ScrollForm>
			<Form>
				<PickFlatList 
					options={getOptions(sorts)}
					selected={sort}
					onSelect={onSelect} />
			</Form>

			{sort == 'sort' && (
				<Form>
					<Info
						message={t.s('dragToReorder')} />
				</Form>
			)}
		</ScrollForm>
	)
}

CollectionSort.propTypes = {
	route:  PropTypes.shape({
		params: PropTypes.shape({
			_id:	PropTypes.number
		})
	})
}

CollectionSort.options = {
	title: t.s('sortBy')
}

export default CollectionSort