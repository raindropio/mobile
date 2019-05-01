import t from 't'
import React from 'react'
import color from 'co/collections/utils/color'
import { ScrollForm, Form } from 'co/style/form'
import Goto from 'co/common/goto'
import URL from './url'

class BookmarkAdd extends React.Component {
	static options({collectionId}) {
		return {
			style: 'form',
			tintColor: color(collectionId),
			topBar: {
				title: {
					text: t.s('newBookmark')
				}
			}
		}
	}
	
	render() {
		return (
			<ScrollForm>
				<URL {...this.props} />

				<Form>
					<Goto 
						last
						icon={require('assets/images/share.png')}
						label={t.s('upload')+' '+t.s('imaged')} />
				</Form>
			</ScrollForm>
		)
	}
}

export default BookmarkAdd