import React from 'react'
import { withTheme } from 'styled-components/native'
import { Platform, ProgressBarAndroid } from 'react-native'
import { ProgressView } from "@react-native-community/progress-view"

export default withTheme(props=>Platform.OS=='android' ? (
    <ProgressBarAndroid 
        {...props}
        animating={true}
        color={props.theme.color.accent}
        trackTintColor={props.theme.color.border}
        styleAttr='Horizontal'
        indeterminate={false} />
) : (
    <ProgressView
        {...props}
        progressTintColor={props.theme.color.accent}
        trackTintColor={props.theme.color.border} />
))