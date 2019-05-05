import { Platform } from 'react-native'
import styled from 'styled-components/native'
import { themeIsDark } from 'co/style/colors'
import { isExtension } from 'modules/native'

let _isExtension = false
isExtension().then(result=>_isExtension=result)

export default styled.SectionList.attrs(props=>({
	contentContainerStyle: !props.sections.length ? {flex: 1} : null,
	directionalLockEnabled: true,
	stickySectionHeadersEnabled: true,
	keyboardDismissMode: 'on-drag',
	keyboardShouldPersistTaps: 'always',
	removeClippedSubviews: (Platform.OS == 'ios' && _isExtension) ? true : false,
	indicatorStyle: themeIsDark(props) ? 'white' : 'default',
	nestedScrollEnabled: true //maybe fix momentum scroll android
	//ItemSeparatorComponent
}))`
	flex: 1;
`