import styled from 'styled-components/native'
import { Platform } from 'react-native'
import { themed } from 'co/style/colors'

export default styled[Platform.OS=='android' ? 'ProgressBarAndroid' : 'ProgressViewIOS'].attrs(props=>({
    animating: true,
    progressTintColor: themed.tintColor(props),
    trackTintColor: themed.invertedExtraLight(props),
    styleAttr: 'Horizontal'
}))`
    height: 4px;
`