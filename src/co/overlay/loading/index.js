import styled from 'styled-components'
import Spinner from 'react-native-loading-spinner-overlay'

export const Loading = styled(Spinner).attrs(({ visible=true })=>({
    animation: 'fade',
    visible,
    textStyle: {
        color: 'white'
    },
    overlayColor: 'rgba(0, 0, 0, 0.60)'
}))``