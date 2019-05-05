import React from 'react'
import styled, { withTheme } from 'styled-components/native'
import { Platform, ProgressBarAndroid, ProgressViewIOS } from 'react-native'
import { themed } from 'co/style/colors'

export default withTheme(props=>Platform.OS=='android' ? (
    <ProgressBarAndroid 
        {...props}
        animating={true}
        progressTintColor={themed.tintColor(props)}
        trackTintColor={themed.invertedExtraLight(props)}
        styleAttr='Horizontal'
        indeterminate={false} />
) : (
    <ProgressViewIOS
        {...props}
        progressTintColor={themed.tintColor(props)}
        trackTintColor={themed.invertedExtraLight(props)} />
))