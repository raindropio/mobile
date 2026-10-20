import { useState } from 'react'
import t from 't'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { appendTagsSelected } from 'data/actions/bookmarks'

import TagPicker from 'co/tags/picker'
import Header from 'co/navigation/header'

function BookmarksTagSelected({ route: { params={} }, navigation }) {
	const dispatch = useDispatch()
	const [selected, setSelected] = useState([])
	const count = selected.length

	const onSubmit = ()=>{
		dispatch(appendTagsSelected(params.spaceId, selected))
		navigation.goBack()
	}

	return (
		<>
			<Header.Buttons a>
				<Header.Cancel onPress={navigation.goBack} />
			</Header.Buttons>

			<Header.Buttons count={count}>
				<Header.Button 
					title={t.s('add')}
					bold
					disabled={!count}
					onPress={onSubmit} />
			</Header.Buttons>

			<TagPicker
				selected={selected}
				onChange={setSelected}
				onSubmit={onSubmit} />
		</>
	)
}

BookmarksTagSelected.propTypes = {
	route:  PropTypes.shape({
		params: PropTypes.shape({
			spaceId: PropTypes.number
		})
	})
}

BookmarksTagSelected.options = {
	title: t.s('tags')
}

export default BookmarksTagSelected