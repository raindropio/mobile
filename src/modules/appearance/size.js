import { Platform } from 'react-native'

export default {
    fontSize: {
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
    fontWeight: {
        semibold: Platform.select({
            ios: 'font-weight: 600',
            android: 'font-family: sans-serif-medium',
            default: 'font-weight: 600'
        })
    },
    padding: {
        small: 8,
        medium: 16,
        large: 24
    }
}