import React from 'react'
import { ThemeProvider } from 'styled-components'

import {
	SectionView,
	SectionEmpty,
	SectionText,
	SectionButtonView
} from 'co/style/section'
import {
	ItemExpand,
	ItemExpandImage
} from '../item/style'
import TouchItem from 'co/common/touchItem'

const
	expand = require('assets/images/expand.png'),
	collapse = require('assets/images/collapse.png')

export default class Section extends React.PureComponent {
	render() {
		const {
			title,
			hidden,
			system,
			selected,
			selectable,
			onToggle,
			onItemTap
		} = this.props

		var content

		if (!system)
			content = (
				<ThemeProvider theme={{sectionActive: selected}}>
					<TouchItem onPress={selectable ? onItemTap : onToggle}>
						<SectionView>
							<SectionText>{title}</SectionText>
							{!selectable ? (<SectionButtonView>
								<ItemExpand><ItemExpandImage source={hidden ? expand : collapse} /></ItemExpand>
							</SectionButtonView>) : null}
						</SectionView>
					</TouchItem>
				</ThemeProvider>
			)

		return (
			<SectionEmpty>
				{content}
			</SectionEmpty>
		)
	}
}