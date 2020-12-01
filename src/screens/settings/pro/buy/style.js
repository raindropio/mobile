import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Wrap = styled(SafeAreaView).attrs({
    edges: ['left', 'right', 'bottom']
})`
	flex: 1;
	justify-content: center;
`

export const Periods = styled.View`
	
`