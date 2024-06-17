import t from 't'
import PropTypes from 'prop-types'
import { ScrollForm, Form, FormSection } from 'co/form'

import URL from './url'
import Image from './image'
import File from './file'
import Extension from './extension'
import Collection from './collection'

function BookmarkAdd({ route: { params={} }, ...etc }) {	
	return (
		<ScrollForm>
			<URL {...params} {...etc} />

			<FormSection />
			<Form>
				<Collection {...params} {...etc} last />
			</Form>

			<Form>
				<Image {...params} {...etc} />
				<File {...params} {...etc} last />
			</Form>

			<Form>
				<Extension {...params} {...etc} last />
			</Form>
		</ScrollForm>
	)
}

BookmarkAdd.options = {
	title: t.s('newBookmark')
}

BookmarkAdd.propTypes = {
	route:  PropTypes.shape({
		params: PropTypes.shape({
			collectionId:	PropTypes.number
		})
	})
}

export default BookmarkAdd