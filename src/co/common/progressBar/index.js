import React from 'react'
import { withTheme } from 'styled-components/native'
import { Platform, ProgressBarAndroid } from 'react-native'
import { ProgressView } from "@react-native-community/progress-view"
import { themed } from 'co/style/colors'

export default withTheme(props=>Platform.OS=='android' ? (
    <ProgressBarAndroid 
        {...props}
        animating={true}
        color={themed.tintColor(props)}
        trackTintColor={themed.invertedExtraLight(props)}
        styleAttr='Horizontal'
        indeterminate={false} />
) : (
    <ProgressView
        {...props}
        progressTintColor={themed.tintColor(props)}
        trackTintColor={themed.invertedExtraLight(props)} />
))