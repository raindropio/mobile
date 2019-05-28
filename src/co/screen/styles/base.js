import { Platform } from 'react-native'
import { themed, themeIsDark } from 'co/style/colors'
import { fontSize } from 'co/style/constants'

import fadeIn from '../animations/fadeIn'
import fadeOut from '../animations/fadeOut'

export default ()=>({
    statusBar: {
        style: (themeIsDark() ? 'light' : 'dark'),
        ...(
            (Platform.OS=='android' && Platform.Version >= 23) ? 
                {backgroundColor: themed.main()} : {}
        )
    },
    topBar: {
        //animate: Platform.OS=='ios',//glitchy on Android

        background: {
            color: themed.main(),
            translucent: false,
            blur: false
        },
        
        leftButtonColor: themed.tintColor(),
        rightButtonColor: themed.tintColor(),
        
        barStyle: themeIsDark() ? 'black' : 'default',
        borderColor: themed.invertedLight(),
        //borderHeight: 1,
        noBorder: true,
        elevation: 0,
        
        title: {
            color: themed.inverted(),
            fontSize: fontSize.topBar(),
            ...Platform.select({
                ios: {
                    fontFamily: 'HelveticaNeue-Medium'
                }
            })
        },

        largeTitle: {
            fontSize: 30,
            color: themed.inverted(),
            fontFamily: 'HelveticaNeue'
        },

        subtitle: {
            color: themed.invertedDark(),
            fontSize: 13,
        },
        backButton: {
            color: themed.tintColor(),
            icon: require('assets/images/backButton.png'),
            showTitle: false
        }
    },
    ...Platform.select({
        ios: {
            screenBackgroundColor: themed.main(),
        }
    }),
    layout: {
        ...Platform.select({
            ios: {
                backgroundColor: themed.main()
            },
            android: {
                componentBackgroundColor: themed.main() //performance improvement
            }
        })
    },
    overlay: {
        interceptTouchOutside: false
    },
    bottomTabs: {
        translucent: true, //iOS important, otherwise is drawen above content!!
        animate: false,
        barStyle: themeIsDark() ? 'black' : 'default',
        backgroundColor: themed.main(),
        titleDisplayMode: 'alwaysShow',
        elevation: 22,

        ...Platform.select({
            ios: {
                drawBehind: true
            }
        })
    },
    bottomTab: {
        selectedIconColor: themed.tintColor(),
        selectedTextColor: themed.tintColor(),

        iconColor: themed.invertedMedium(),
        textColor: themed.invertedMedium(),

        fontFamily: 'sans-serif-medium',
        fontSize: 13,
        selectedFontSize: 13
    },
    animations: {
        setRoot: {
            enabled: true,
            waitForRender: true,
            ...fadeIn
        },

        setStackRoot: {
            enabled: Platform.OS=='android',//works only on android
            waitForRender: true,
            ...fadeIn
        },

        ...Platform.select({
            android: {
                push: {
                    topBar: fadeIn,
                    content: {
                        ...fadeIn,
                        y: {
                            from: 20,
                            to: 0,
                            duration: 250,
                        }
                    }
                },

                pop: {
                    topBar: fadeOut,
                    content: {
                        ...fadeOut,
                        y: {
                            from: 0,
                            to: 20,
                            duration: 150,
                            interpolation: 'decelerate'
                        }
                    }
                },

                showModal: {
                    ...fadeIn,
                    y: {
                        from: 20,
                        to: 0,
                        duration: 250,
                    }
                },

                dismissModal: {
                    ...fadeOut,
                    y: {
                        from: 0,
                        to: 20,
                        duration: 150,
                    }
                }
            }
        })
    },
    popGesture: true,
    modalPresentationStyle: 'formSheet',
})