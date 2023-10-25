import { Platform } from 'react-native'

export default {
    fontSize: {
        h1: 21,
        head: Platform.select({
            ios: 17,
            android: 20,
            default: 17
        }),
        primary: 17,
        secondary: 16,
        tertiary: 15,
        quaternary: 14
    },
    padding: {
        micro: 4,
        small: 8,
        medium: 16,
        large: 24
    },
    height: {
        icon: 24,
        button: 38,
        item: 48
    }
}