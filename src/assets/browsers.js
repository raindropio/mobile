import { Platform } from 'react-native'

export default [
    {id: 'internal', label: 'Raindrop.io', icon: 'file-cloud'},

    ...[
        Platform.select({
            ios:        {id: 'safari', label: 'Safari', icon: 'safari'},
            android:    {id: 'chrome', label: 'Chrome', icon: 'chrome'},
            default:    {}
        })
    ],
    {id: 'system', label: 'System default', icon: Platform.select({ ios: 'apple', android: 'android' })},
]