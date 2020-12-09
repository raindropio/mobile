import { Platform } from 'react-native'

export default Platform.select({
    ios: [
        {id: 'internal', label: 'Preview', icon: 'eye'},
        {id: 'system', label: 'Safari', icon: 'safari'},
        {id: 'ios.chrome', label: 'Chrome',                 prefix: 'googlechrome://', icon: 'chrome'},
        {id: 'ios.firefox', label: 'Firefox',               prefix: 'firefox://open-url?url=https://', icon: 'firefox'},
        {id: 'ios.firefox-focus', label: 'Firefox Focus',   prefix: 'firefox-focus://open-url?url=https://', icon: 'firefox'},
        {id: 'ios.opera', label: 'Opera',                   prefix: 'opera://open-url?url=https://', icon: 'opera'},
        {id: 'ios.opera-touch', label: 'Opera Touch',       prefix: 'touch-https://', icon: 'opera'},
        {id: 'ios.edge', label: 'Edge',                     prefix: 'microsoft-edge-https://', icon: 'edge'},
        {id: 'ios.dolphin', label: 'Dolphin',               prefix: 'dolphin://'},
        {id: 'ios.brave', label: 'Brave',                   prefix: 'brave://open-url?url=https://'},
        {id: 'ios.duckduckgo', label: 'DuckDuckGo',         prefix: 'ddgLaunch://'},
        {id: 'ios.ophttp', label: '1Password',              prefix: 'ophttp://'},
        {id: 'ios.yandex', label: 'Yandex',                 prefix: 'yandexbrowser-open-url://'},
        {id: 'ios.cakeslice', label: 'Cake',                prefix: 'cakeslice://'},
        {id: 'ios.360', label: '360 Web',                   prefix: '360://'},
        {id: 'ios.icabmobile', label: 'iCab Mobile',        prefix: 'x-icabmobile://'},
        {id: 'ios.merc', label: 'Mercury Web',              prefix: 'merc://'},
        {id: 'ios.puffin', label: 'Puffin',                 prefix: 'puffin://'},
        {id: 'ios.mttbrowserhd', label: 'QQ Browser HD',    prefix: 'mttbrowserhd://url=https://'},
        {id: 'ios.ucbrowser', label: 'UC',                  prefix: 'ucbrowser://'},
    ],

    android: [
        {id: 'internal', label: 'Preview'},
        {id: 'system', label: 'System default'}
    ]
})