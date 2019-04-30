import { Platform } from 'react-native'
import styled from 'styled-components/native'
import { themeIsDark } from 'co/style/colors'

export default styled.SectionList.attrs(props=>({
	directionalLockEnabled: true,
	stickySectionHeadersEnabled: true,
	keyboardDismissMode: 'on-drag',
	keyboardShouldPersistTaps: 'always',
	removeClippedSubviews: Platform.OS == 'ios' ? true : false,
	indicatorStyle: themeIsDark(props) ? 'white' : 'default'
	//ItemSeparatorComponent
}))`
	flex: 1;
`