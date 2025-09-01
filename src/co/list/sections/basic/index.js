import styled from 'styled-components/native'
import { options } from '../../flat/basic'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Base = styled.SectionList.attrs(options)`
	flex: 1;
	padding-bottom: 30px;
`

export default function List(props) {
	const insets = useSafeAreaInsets()
	
	return <Base {...props} contentContainerStyle={{
		paddingBottom: insets.bottom,
		paddingLeft: insets.left,
		paddingRight: insets.right
	}} />
}