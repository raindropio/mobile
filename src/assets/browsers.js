import { Platform } from 'react-native'

export default Platform.select({
    ios: [
        {id: 'internal', label: 'Preview'},
        {id: 'system', label: 'Safari'},
        {id: 'ios.chrome', label: 'Chrome',                 prefix: 'googlechrome://'},
        {id: 'ios.firefox', label: 'Firefox',               prefix: 'firefox://open-url?url=https://'},
        {id: 'ios.firefox-focus', label: 'Firefox Focus',   prefix: 'firefox-focus://open-url?url=https://'},
        {id: 'ios.opera', label: 'Opera',                   prefix: 'opera://open-url?url=https://'},
        {id: 'ios.opera-touch', label: 'Opera Touch',       prefix: 'touch-https://'},
        {id: 'ios.edge', label: 'Edge',                     prefix: 'microsoft-edge-https://'},
        {id: 'ios.dolphin', label: 'Dolphin',               prefix: 'dolphin://'},
        {id: 'ios.brave', label: 'Brave',                   prefix: 'brave://open-url?url=https://'}
    ],

    android: [
        {id: 'internal', label: 'Preview'},
        {id: 'system', label: 'System default'}
    ]
})