import { Platform } from 'react-native'
import t from 't'
import _ from 'lodash-es'

export default [
    {id: 'internal', label: `${_.capitalize(t.s('in'))} ${t.s('app').toLowerCase()}`, /*subLabel: `+ ${t.s('highlights').toLowerCase()}`,*/ icon: 'file-cloud'},

    ...[
        Platform.select({
            ios:        {id: 'safari', label: 'Safari', icon: 'safari'},
            android:    {id: 'chrome', label: 'Chrome', icon: 'chrome'},
            default:    {}
        })
    ],
    {id: 'system', label: 'System default', icon: Platform.select({ ios: 'apple', android: 'android' })},
]