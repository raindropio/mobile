import { Platform } from 'react-native'
import styled from 'styled-components/native'
import { themeIsDark } from 'co/style/colors'
import { isExtension } from 'modules/native'

let _isExtension = false
isExtension().then(result=>_isExtension=result)

export const options = props=>({
	contentContainerStyle: !(props.data || props.sections).length ? {flex: 1} : null,
	directionalLockEnabled: true,
	stickySectionHeadersEnabled: true,
	keyboardDismissMode: 'on-drag',
	keyboardShouldPersistTaps: 'always',
	removeClippedSubviews: (Platform.OS == 'ios' && _isExtension) ? true : false,
	indicatorStyle: themeIsDark(props) ? 'white' : 'default',
	//ItemSeparatorComponent
})

export default styled.FlatList.attrs(options)`
	flex: 1;
`