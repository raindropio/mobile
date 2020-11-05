import { Platform } from 'react-native'
import styled from 'styled-components/native'

export const SectionList = styled.SectionList.attrs(({ theme })=>({
	directionalLockEnabled: true,
	stickySectionHeadersEnabled: true,
	keyboardDismissMode: 'on-drag',
	keyboardShouldPersistTaps: 'always',
	removeClippedSubviews: Platform.OS == 'ios' ? true : false,
	indicatorStyle: theme.dark ? 'white' : 'default'
	//ItemSeparatorComponent
}))`
	flex: 1;
`