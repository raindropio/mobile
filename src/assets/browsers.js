import { Platform } from 'react-native'
import t from 't'

export default Platform.select({
    ios: [
        {id: 'system', label: 'System default', icon: 'apps-2'},
        {id: 'internal', label: t.s('preview'), icon: 'eye'},
        {id: 'reader', label: 'Safari Reader View (when possible)', icon: 'article'},
    ],

    android: [
        {id: 'system', label: 'System default', icon: 'apps-2'},
        {id: 'internal', label: t.s('preview'), icon: 'eye'},
    ]
})