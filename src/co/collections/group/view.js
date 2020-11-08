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
			hidden,
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
								{hidden ? (
									<Action onPress={onToggle}>
										<Icon 
											name='arrow-down-s'
											color={selected ? 'background.regular' : 'text.secondary'} />
									</Action>
								) : (<>
									<Action onPress={onAdd}>
										<Icon 
											name='add'
											color={selected ? 'background.regular' : 'text.secondary'} />
									</Action>

									<Action onPress={onMore}>
										<Icon 
											name='more'
											color={selected ? 'background.regular' : 'text.secondary'} />
									</Action>
								</>)}
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