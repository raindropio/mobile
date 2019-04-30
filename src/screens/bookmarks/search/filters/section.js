import React from 'react'
import {
	SectionView,
	SectionText
} from 'co/style/section'

export default class Section extends React.PureComponent {
	render() {
		const {
			title
		} = this.props

		return (
			<SectionView>
				<SectionText>{title}</SectionText>
			</SectionView>
		)
	}
}