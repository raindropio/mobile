import { Platform } from 'react-native'
import t from 't'
import _ from 'lodash-es'

export default [
    {id: 'system', label: 'System default', icon: Platform.select({ ios: 'apple', android: 'android' })},
    {id: 'internal', label: `${_.capitalize(t.s('in'))} ${t.s('app').toLowerCase()}`, icon: 'cloudy-2'},
    ...[
        Platform.select({
            ios:        {id: 'safari', label: 'Safari View', icon: 'safari'},
            android:    {id: 'chrome', label: 'Chrome Custom Tabs', icon: 'chrome'},
            default:    {}
        })
    ]
]