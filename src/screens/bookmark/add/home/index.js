import t from 't'
import React from 'react'
import PropTypes from 'prop-types'
import { ScrollForm, Form } from 'co/style/form'
import { Buttons, Cancel } from 'co/navigation/header'

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
				<Buttons left>
					<Cancel onPress={this.props.navigation.goBack} />
				</Buttons>
				
				<Form first>
					<URL {...this.props} />
				</Form>

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