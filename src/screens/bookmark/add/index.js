import t from 't'
import React from 'react'
import PropTypes from 'prop-types'
import { ScrollForm, Form } from 'co/form'
import Header from 'co/navigation/header'

import URL from './url'
import Image from './image'
import File from './file'
import Extension from './extension'
import Collection from './collection'

class BookmarkAdd extends React.Component {
	static propTypes = {
		route:  PropTypes.shape({
            params: PropTypes.shape({
				collectionId:	PropTypes.number
			})
		})
	}

	static options = {
		title: t.s('newBookmark')
	}
	
	render() {
		const { route: { params={} }, ...etc } = this.props

		return (
			<ScrollForm>
				<Header.Buttons left>
					<Header.Cancel onPress={etc.navigation.goBack} />
				</Header.Buttons>
				<Header.Buttons />
				
				<URL {...params} {...etc} />

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
}

export default BookmarkAdd