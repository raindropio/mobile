import React from 'react'
import { ThemeProvider } from 'styled-components'

import Icon from 'co/icon'
import {
	SectionView,
	SectionEmpty,
	SectionText,
	SectionButtonView
} from 'co/style/section'
import { Action } from '../item/style'
import { RectButton } from 'react-native-gesture-handler'

export default class Section extends React.PureComponent {
	render() {
		const {
			title,
			system,
			selected,
			selectable,
			onToggle,
			onItemTap,
			onMore,
			onAdd
		} = this.props

		var content

		if (!system)
			content = (
				<ThemeProvider theme={{sectionActive: selected}}>
					<RectButton onPress={selectable ? onItemTap : onToggle}>
						<SectionView>
							<SectionText>{title}</SectionText>

							<SectionButtonView>
								<Action onPress={onAdd}>
									<Icon name='add' />
								</Action>

								<Action onPress={onMore}>
									<Icon name='more' />
								</Action>
							</SectionButtonView>
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