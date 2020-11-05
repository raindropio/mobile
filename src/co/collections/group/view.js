import React from 'react'
import { ThemeProvider } from 'styled-components'

import {
	SectionView,
	SectionEmpty,
	SectionText,
	SectionButtonView
} from 'co/style/section'
import {
	Expand,
	ItemExpandImage
} from '../item/style'
import { RectButton } from 'react-native-gesture-handler'

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
					<RectButton onPress={selectable ? onItemTap : onToggle}>
						<SectionView>
							<SectionText>{title}</SectionText>
							{!selectable ? (<SectionButtonView>
								<Expand>
									<ItemExpandImage source={hidden ? expand : collapse} />
								</Expand>
							</SectionButtonView>) : null}
						</SectionView>
					</RectButton>
				</ThemeProvider>
			)

		return (
			<SectionEmpty>
				{content}
			</SectionEmpty>
		)
	}
}