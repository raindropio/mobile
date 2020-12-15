import React, { useMemo } from 'react'
import { ThemeProvider } from 'styled-components'
import { Pressable } from 'co/native'

import { Wrap } from './style'
import { SectionView, SectionText } from 'co/style/section'
import Button from 'co/button'

export default function GroupView({ title, hidden, selected, selectable, onToggle, onItemPress, onMore, onAdd, drag, isDrag, status }) {
	const theme = useMemo(
		()=>({sectionActive: selected}),
		[selected]
	)

	return (
		<ThemeProvider theme={theme}>
			<Pressable 
				onPress={selectable ? onItemPress : onToggle}
				onLongPress={drag}>
				<Wrap isDrag={isDrag}>
					<SectionView>
						<SectionText>{title}</SectionText>

						{hidden && status!='empty' ? (
							<Button 
								icon='arrow-down-s'
								color={selected ? 'background.regular' : 'text.secondary'}
								onPress={onToggle} />
						) : (<>
							<Button 
								icon='add'
								color={status=='empty' ? 'accent' : (selected ? 'background.regular' : 'text.secondary')}
								onPress={onAdd} />

							{status!='empty' && (
								<Button 
									icon='more'
									color={selected ? 'background.regular' : 'text.secondary'}
									onPress={onMore} />
							)}
						</>)}
					</SectionView>
				</Wrap>
			</Pressable>
		</ThemeProvider>
	)
}