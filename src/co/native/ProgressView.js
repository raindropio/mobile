import { withTheme } from 'styled-components/native'
import { ProgressView as NativeProgressView } from "@react-native-community/progress-view"

export const ProgressView = withTheme(props=>
    <NativeProgressView
        {...props}
        progressTintColor={props.theme.color.accent}
        trackTintColor={props.theme.color.border} />
)