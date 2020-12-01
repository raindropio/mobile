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
		collectionId:	PropTypes.number
	}

	static options = {
		title: t.s('newBookmark')
	}
	
	render() {
		return (
			<ScrollForm>
				<Header.Buttons left>
					<Header.Cancel onPress={this.props.navigation.goBack} />
				</Header.Buttons>
				<Header.Buttons />
				
				<URL {...this.props} />

				<Form>
					<Collection {...this.props} last />
				</Form>

				<Form>
					<Image {...this.props} />
					<File {...this.props} last />
				</Form>

				<Form>
					<Extension {...this.props} last />
				</Form>
			</ScrollForm>
		)
	}
}

export default BookmarkAdd