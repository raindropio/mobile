import t from 't'
import React from 'react'
import _ from 'lodash'
import color from 'co/collections/utils/color'
import { ScrollForm, Form, FormSection } from 'co/style/form'
import { SectionText } from 'co/style/section'

import URL from './url'
import Image from './image'

class BookmarkAdd extends React.Component {
	static defaultProps = {
		collectionId: -1
	}

	static options({collectionId}) {
		return {
			style: 'form',
			tintColor: color(collectionId),
			topBar: {
				title: {
					text: t.s('newBookmark')
				},
				largeTitle: {
					visible: true
				}
			}
		}
	}
	
	render() {
		return (
			<ScrollForm>
				<Form first>
					<URL {...this.props} />
				</Form>

				<FormSection><SectionText>{_.capitalize(t.s('or'))}</SectionText></FormSection>
				<Form>
					<Image {...this.props} last />
				</Form>
			</ScrollForm>
		)
	}
}

export default BookmarkAdd