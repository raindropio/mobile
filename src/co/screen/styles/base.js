import { Platform } from 'react-native'
import { themed, themeIsDark } from 'co/style/colors'
import { fontSize } from 'co/style/constants'

import fadeIn from '../animations/fadeIn'
import fadeOut from '../animations/fadeOut'
import slideUp from '../animations/slideUp'
import slideDown from '../animations/slideDown'

export default ()=>({
    statusBar: {
        style: (themeIsDark() ? 'light' : 'dark'),
        ...(
            (Platform.OS=='android' && Platform.Version >= 23) ? 
                {backgroundColor: themed.main()} : {}
        )
    },
    topBar: {
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
            ...Platform.select({
                ios: {
                    fontFamily: 'HelveticaNeue'
                }
            })
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
    layout: {
        componentBackgroundColor: themed.main()
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
    navigationBar: (Platform.Version >= 27 ? {
        backgroundColor: themed.main()
    } : {}),
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
            ...Platform.select({
                ios: {
                    content: fadeIn
                },
                android: fadeIn
            })
        },

        setStackRoot: {
            enabled: Platform.OS=='android',//works only on android
            waitForRender: true,
            ...fadeIn
        },

        ...Platform.select({
            android: {
                push: {
                    waitForRender: false,
                    topBar: {
                        ...fadeIn,
                        ...slideUp
                    },
                    content: {
                        ...fadeIn,
                        //...slideUp
                    },
                    bottomTabs: {
                        ...fadeIn,
                        ...slideUp
                    }
                },

                pop: {
                    waitForRender: false,
                    topBar: {
                        ...fadeOut,
                        ...slideDown
                    },
                    content: {
                        ...fadeOut,
                        //...slideDown
                    },
                    bottomTabs: {
                        ...fadeOut,
                        ...slideDown
                    }
                },

                showModal: {
                    waitForRender: false,
                    ...fadeIn,
                    ...slideUp
                },

                dismissModal: {
                    waitForRender: false,
                    ...fadeOut,
                    ...slideDown
                }
            }
        })
    },
    popGesture: true,
    modalPresentationStyle: 'formSheet', //formSheet glitches keyboard in iPad (overscroll after screen appear, jump when change focus)
})