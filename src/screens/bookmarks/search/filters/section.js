import React from 'react'
import {
	View
} from 'react-native'

import {
	SectionView,
	SectionText
} from 'co/style/section'
import Separator from 'co/style/separator'

export default class Section extends React.PureComponent {
	render() {
		const {
			title
		} = this.props

		return (
			<View>
				<SectionView>
					<SectionText>{title}</SectionText>
				</SectionView>
				<Separator />
			</View>
		)
	}
}