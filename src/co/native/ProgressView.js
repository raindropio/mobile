import { withTheme } from 'styled-components/native'
import { Platform, ProgressBarAndroid } from 'react-native'
import { ProgressView as NativeProgressView } from "@react-native-community/progress-view"

export const ProgressView = withTheme(props=>Platform.OS=='android' ? (
    <ProgressBarAndroid 
        {...props}
        animating={true}
        color={props.theme.color.accent}
        trackTintColor={props.theme.color.border}
        styleAttr='Horizontal'
        indeterminate={false} />
) : (
    <NativeProgressView
        {...props}
        progressTintColor={props.theme.color.accent}
        trackTintColor={props.theme.color.border} />
))