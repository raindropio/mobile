import { Platform } from 'react-native'

export default Platform.select({
    ios: [
        {id: 'internal', label: 'Preview'},
        {id: 'system', label: 'Safari'},
        {id: 'ios.chrome', label: 'Chrome'},
        {id: 'ios.firefox', label: 'Firefox'},
        {id: 'ios.firefox-focus', label: 'Firefox Focus'},
        {id: 'ios.opera', label: 'Opera'},
        {id: 'ios.edge', label: 'Edge'},
        {id: 'ios.dolphin', label: 'Dolphin'},
        {id: 'ios.brave', label: 'Brave'}
    ],

    android: [
        {id: 'internal', label: 'Preview'},
        {id: 'system', label: 'System default'}
    ]
})