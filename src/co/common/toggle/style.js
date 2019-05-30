import styled from 'styled-components'
import { Platform } from 'react-native'
import { themed } from 'co/style/colors'

export const Switch = styled.Switch.attrs(props=>({
    ...Platform.select({
        android: {
            trackColor: {
                //false: themed.invertedLight(props),
                true: themed.tintColor(props)+'50'
            },
            thumbColor: props.value ? themed.tintColor(props) : undefined
        },
        ios: {
            ios_backgroundColor: themed.invertedLight(props),
            trackColor: {
                false: 'transparent',
                true: themed.tintColor(props)
            },
            thumbColor: themed.main(props),
        }
    }),
}))``