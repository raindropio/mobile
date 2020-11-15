import React from 'react'
import { ThemeProvider } from 'styled-components'
import { RectButton } from 'react-native-gesture-handler'

import { SectionView, SectionText } from 'co/style/section'
import { ButtonsWrap, Button } from 'co/navigation/header'

export default class Section extends React.PureComponent {
	render() {
		const {
			title,
			hidden,
			selected,
			selectable,
			onToggle,
			onItemTap,
			onMore,
			onAdd
		} = this.props

		return (
			<ThemeProvider theme={{sectionActive: selected}}>
				<RectButton onPress={selectable ? onItemTap : onToggle}>
					<SectionView>
						<SectionText>{title}</SectionText>

						<ButtonsWrap>
							{hidden ? (
								<Button 
									icon='arrow-down-s'
									color={selected ? 'background.regular' : 'text.secondary'}
									onPress={onToggle} />
							) : (<>
								<Button 
									icon='add'
									color={selected ? 'background.regular' : 'text.secondary'}
									onPress={onAdd} />

								<Button 
									icon='more'
									color={selected ? 'background.regular' : 'text.secondary'}
									onPress={onMore} />
							</>)}
						</ButtonsWrap>
					</SectionView>
				</RectButton>
			</ThemeProvider>
		)
	}
}