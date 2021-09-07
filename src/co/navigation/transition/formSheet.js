import { TransitionPresets } from '@react-navigation/stack'
import { Animated } from 'react-native'
const { multiply } = Animated

function cardStyleInterpolator({
    index,
    current,
    inverted,
    layouts: { screen }
}) {
    const translateY = multiply(
        current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [screen.height * 0.8, 0],
            extrapolate: 'clamp',
        }),
        inverted
    )
  
    const opacity = current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    })
  
    const overlayOpacity = current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.3],
        extrapolate: 'clamp',
    })
  
    return {
        cardStyle: {
            opacity,
            transform: [{ translateY }],
            ...(index ? {
                overflow: 'hidden',
                flex: 1,
                width: '100%',
                maxWidth: 500,
                marginTop: 40,
                marginBottom: 40,
                borderRadius: 5,
                alignSelf: 'center',
                justifySelf: 'center'
            } : {})
        },
        overlayStyle: { opacity: overlayOpacity },
    }
}

export const FormSheetTransition = {
    ...TransitionPresets.BottomSheetAndroid,
    cardStyleInterpolator
}